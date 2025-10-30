import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET financial reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const includeUnofficial = searchParams.get('includeUnofficial') === 'true';
    const password = searchParams.get('password');

    // Check password if including unofficial expenses
    if (includeUnofficial && password !== process.env.UNOFFICIAL_EXPENSES_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized access to unofficial expenses' },
        { status: 401 }
      );
    }

    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate);
    }

    switch (reportType) {
      case 'profit-loss': {
        // Get income
        const income = await prisma.paymentReceived.findMany({
          where: {
            paymentDate: dateFilter,
            status: { in: ['Received', 'Cleared'] },
          },
        });

        // Get official expenses
        const officialExpenses = await prisma.paymentMade.findMany({
          where: {
            expenseDate: dateFilter,
            status: 'Paid',
          },
        });

        // Get unofficial expenses if requested
        let unofficialExpenses: any[] = [];
        if (includeUnofficial) {
          unofficialExpenses = await prisma.unofficialExpense.findMany({
            where: {
              expenseDate: dateFilter,
              status: 'Paid',
            },
          });
        }

        const totalIncome = income.reduce((sum, p) => sum + p.amountInInr, 0);
        const totalOfficialExpenses = officialExpenses.reduce((sum, e) => sum + e.amountInInr, 0);
        const totalUnofficialExpenses = unofficialExpenses.reduce((sum, e) => sum + e.amountInInr, 0);

        return NextResponse.json({
          reportType: 'Profit & Loss Statement',
          period: { startDate, endDate },
          income: {
            total: totalIncome,
            count: income.length,
          },
          expenses: {
            official: {
              total: totalOfficialExpenses,
              count: officialExpenses.length,
            },
            unofficial: includeUnofficial ? {
              total: totalUnofficialExpenses,
              count: unofficialExpenses.length,
            } : null,
          },
          profit: {
            official: totalIncome - totalOfficialExpenses,
            actual: includeUnofficial ? totalIncome - totalOfficialExpenses - totalUnofficialExpenses : null,
          },
        });
      }

      case 'expense-breakdown': {
        const expenses = await prisma.paymentMade.findMany({
          where: {
            expenseDate: dateFilter,
            status: 'Paid',
          },
        });

        // Group by category
        const breakdown: Record<string, { total: number; count: number }> = {};
        expenses.forEach(expense => {
          if (!breakdown[expense.expenseCategory]) {
            breakdown[expense.expenseCategory] = { total: 0, count: 0 };
          }
          breakdown[expense.expenseCategory].total += expense.amountInInr;
          breakdown[expense.expenseCategory].count += 1;
        });

        return NextResponse.json({
          reportType: 'Expense Breakdown',
          period: { startDate, endDate },
          breakdown,
          total: expenses.reduce((sum, e) => sum + e.amountInInr, 0),
        });
      }

      case 'cash-flow': {
        const income = await prisma.paymentReceived.findMany({
          where: {
            paymentDate: dateFilter,
            status: { in: ['Received', 'Cleared'] },
          },
          orderBy: { paymentDate: 'asc' },
        });

        const expenses = await prisma.paymentMade.findMany({
          where: {
            expenseDate: dateFilter,
            status: 'Paid',
          },
          orderBy: { expenseDate: 'asc' },
        });

        const totalCashIn = income.reduce((sum, p) => sum + p.amountInInr, 0);
        const totalCashOut = expenses.reduce((sum, e) => sum + e.amountInInr, 0);
        const netCashFlow = totalCashIn - totalCashOut;

        return NextResponse.json({
          reportType: 'Cash Flow Statement',
          period: { startDate, endDate },
          cashIn: {
            total: totalCashIn,
            count: income.length,
          },
          cashOut: {
            total: totalCashOut,
            count: expenses.length,
          },
          netCashFlow,
        });
      }

      case 'tax-report': {
        const expenses = await prisma.paymentMade.findMany({
          where: {
            expenseDate: dateFilter,
            status: 'Paid',
            taxDeductible: true,
          },
        });

        const totalTaxDeductible = expenses.reduce((sum, e) => sum + e.amountInInr, 0);
        const totalGST = expenses.reduce((sum, e) => sum + (e.gstAmount || 0), 0);
        const totalTDS = expenses.reduce((sum, e) => sum + (e.tdsAmount || 0), 0);

        return NextResponse.json({
          reportType: 'Tax Report',
          period: { startDate, endDate },
          taxDeductibleExpenses: {
            total: totalTaxDeductible,
            count: expenses.length,
          },
          gst: {
            total: totalGST,
          },
          tds: {
            total: totalTDS,
          },
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid report type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

# The Export Express - Admin Management System

A comprehensive Next.js-based admin management system for export businesses, featuring vendor management, client management, product catalog, order tracking, payment management, and website integration.

## 🚀 Features

### Core Modules
- **Vendor Management** - Track suppliers, products, pricing, and performance
- **Client Management** - CRM with pipeline stages, communication history, and order tracking
- **Product Catalog** - Manage products with categories, specifications, and pricing
- **Order Management** - Complete order lifecycle from creation to delivery
- **Payment Tracking** - Monitor payments received, expenses, and bank reconciliation
- **Website Management** - Sync products to website, manage blog posts, track leads and analytics
- **Notification System** - Real-time in-app notifications and toast messages

### Key Features
- 🔐 Secure admin authentication
- 📊 Real-time dashboard with alerts
- 🔔 Comprehensive notification system
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time data synchronization
- 📈 Analytics and reporting
- 🌐 Website content management

---

## 📋 Prerequisites

Before installing, ensure you have the following installed on your PC:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Code Editor** - VS Code recommended - [Download](https://code.visualstudio.com/)

---

## 🛠️ Installation Guide for New PC

### Step 1: Clone the Repository

```bash
# Open terminal/command prompt and navigate to your desired directory
cd C:\Users\YourUsername\Documents

# Clone the repository
git clone https://github.com/PearlShadowww/Theexportexpress-v2.git

# Navigate into the project directory
cd Theexportexpress-v2
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - Next.js 16.0.0
# - React 19.2.0
# - Prisma (database ORM)
# - Tailwind CSS 4
# - Lucide React (icons)
# - TypeScript
```

### Step 3: Database Setup

#### 3.1 Create MySQL Database

```sql
-- Open MySQL Workbench or command line
-- Create a new database
CREATE DATABASE export_express;

-- Create a user (optional, or use root)
CREATE USER 'export_admin'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON export_express.* TO 'export_admin'@'localhost';
FLUSH PRIVILEGES;
```

#### 3.2 Configure Database Connection

Create a `.env` file in the root directory:

```bash
# Copy the example env file (if exists) or create new
# Create .env file
```

Add the following to `.env`:

```env
# Database Connection
DATABASE_URL="mysql://export_admin:your_password@localhost:3306/export_express"

# Or if using root user:
# DATABASE_URL="mysql://root:your_root_password@localhost:3306/export_express"

# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development

# Admin Configuration
ADMIN_EMAIL=admin@exportexpress.com
ADMIN_PASSWORD=admin123

# Optional: For production
# NEXT_PUBLIC_SITE_URL=https://yourwebsite.com
```

#### 3.3 Run Database Migrations

```bash
# Initialize Prisma (if schema exists)
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# Or if you have SQL files in /database folder:
# Import them using MySQL Workbench or command line
# mysql -u export_admin -p export_express < database/schema.sql
```

### Step 4: Run the Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at: **http://localhost:3000**

### Step 5: Access Admin Panel

1. Open your browser and go to: **http://localhost:3000/admin/login**
2. Default credentials (change these after first login):
   - **Email**: `admin@exportexpress.com`
   - **Password**: `admin123`

---

## 📁 Project Structure

```
the-export-express/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── admin/               # Admin panel pages
│   │   │   ├── dashboard/       # Main dashboard
│   │   │   ├── vendors/         # Vendor management
│   │   │   ├── clients/         # Client management
│   │   │   ├── products/        # Product catalog
│   │   │   ├── orders/          # Order management
│   │   │   ├── payments/        # Payment tracking
│   │   │   ├── website/         # Website management
│   │   │   └── login/           # Admin login
│   │   ├── api/                 # API routes
│   │   └── page.tsx             # Homepage
│   ├── components/              # React components
│   │   ├── AdminNavigation.tsx  # Admin navbar
│   │   ├── DashboardAlerts.tsx  # Alert system
│   │   ├── NotificationCenter.tsx
│   │   ├── ToastNotifications.tsx
│   │   └── payments/            # Payment components
│   ├── contexts/                # React contexts
│   │   └── NotificationContext.tsx
│   └── styles/                  # Global styles
├── management-guides/           # Development guides
│   ├── MANAGEMENT_01_VENDORS.md
│   ├── MANAGEMENT_02_CLIENTS.md
│   ├── MANAGEMENT_03_PRODUCTS.md
│   ├── MANAGEMENT_04_ORDERS.md
│   ├── MANAGEMENT_05_PAYMENTS.md
│   ├── MANAGEMENT_06_WEBSITE.md
│   └── MANAGEMENT_07_ROADMAP.md
├── public/                      # Static files
├── database/                    # Database schemas (if any)
├── .env                         # Environment variables (create this)
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
└── README.md                    # This file
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Required
DATABASE_URL="mysql://user:password@localhost:3306/export_express"
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Upload (if using cloud storage)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_BUCKET_NAME=your-bucket
```

### Admin Credentials

Change default admin credentials after first login:
1. Go to Admin Settings
2. Update email and password
3. Store credentials securely

---

## 📚 Development Guides

Comprehensive development guides are available in the `/management-guides` folder:

1. **MANAGEMENT_01_VENDORS.md** - Vendor management implementation
2. **MANAGEMENT_02_CLIENTS.md** - Client CRM implementation
3. **MANAGEMENT_03_PRODUCTS.md** - Product catalog implementation
4. **MANAGEMENT_04_ORDERS.md** - Order management implementation
5. **MANAGEMENT_05_PAYMENTS.md** - Payment tracking implementation
6. **MANAGEMENT_06_WEBSITE.md** - Website integration implementation
7. **MANAGEMENT_07_ROADMAP.md** - 12-week development roadmap

---

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run database migrations

# Code Quality
npm run lint         # Run ESLint
```

---

## 🗄️ Database Schema

The system uses MySQL with the following main tables:

### Core Tables
- `users` - Admin users and authentication
- `vendors` - Supplier information
- `clients` - Customer information
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Order management
- `order_items` - Order line items
- `payments_received` - Incoming payments
- `payments_made` - Outgoing expenses
- `bank_accounts` - Bank account tracking

### Website Management Tables
- `blog_posts` - Blog content
- `website_leads` - Lead form submissions
- `media_library` - Uploaded files
- `website_analytics` - Traffic data
- `product_sync_status` - Product sync tracking
- `category_sync_status` - Category sync tracking
- `website_sync_log` - Sync history

Refer to `/management-guides/MANAGEMENT_06_WEBSITE.md` for complete schema.

---

## 🔐 Security

### Important Security Steps

1. **Change Default Credentials**
   - Update admin email and password immediately after first login

2. **Secure Environment Variables**
   - Never commit `.env` file to Git
   - Use strong passwords for database
   - Keep API keys secure

3. **Database Security**
   - Use strong database passwords
   - Limit database user permissions
   - Enable SSL for database connections in production

4. **Production Deployment**
   - Set `NODE_ENV=production`
   - Use HTTPS
   - Enable CORS restrictions
   - Implement rate limiting

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port 3000 Already in Use
```bash
# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

#### 2. Database Connection Error
- Check MySQL is running
- Verify DATABASE_URL in `.env`
- Ensure database exists
- Check user permissions

#### 3. Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate
```

#### 5. Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 📱 Mobile Access

The admin panel is responsive and can be accessed on mobile devices:
- Navigate to `http://YOUR_IP:3000/admin/login` from mobile browser
- Ensure both devices are on the same network

---

## 🔄 Updates and Maintenance

### Pulling Latest Changes

```bash
# Fetch latest changes from GitHub
git pull origin main

# Install any new dependencies
npm install

# Run any new migrations
npx prisma migrate dev

# Restart development server
npm run dev
```

### Backup Database

```bash
# Export database
mysqldump -u export_admin -p export_express > backup_$(date +%Y%m%d).sql

# Import database
mysql -u export_admin -p export_express < backup_20250130.sql
```

---

## 🚀 Production Deployment

### Building for Production

```bash
# Build the application
npm run build

# Test production build locally
npm start
```

### Deployment Options

1. **Vercel** (Recommended for Next.js)
   - Connect GitHub repository
   - Configure environment variables
   - Deploy automatically

2. **VPS/Dedicated Server**
   - Install Node.js and MySQL
   - Clone repository
   - Configure environment variables
   - Use PM2 for process management
   - Set up Nginx as reverse proxy

3. **Docker**
   - Create Dockerfile
   - Build and run container
   - Use docker-compose for multi-container setup

---

## 📞 Support

For issues, questions, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/PearlShadowww/Theexportexpress-v2/issues)
- **Documentation**: Check `/management-guides` folder
- **Email**: support@exportexpress.com

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Prisma](https://www.prisma.io/) - Database ORM
- [Lucide React](https://lucide.dev/) - Icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

## 📝 Changelog

### Version 0.1.0 (Current)
- ✅ Admin authentication system
- ✅ Dashboard with real-time alerts
- ✅ Notification system (in-app + toast)
- ✅ Vendor management module (ready for implementation)
- ✅ Client management module (ready for implementation)
- ✅ Product catalog module (ready for implementation)
- ✅ Order management module (ready for implementation)
- ✅ Payment tracking module (ready for implementation)
- ✅ Website management module (ready for implementation)
- ✅ Comprehensive development guides
- ✅ Removed hardcoded data from dashboard and navigation
- ✅ Clean website management placeholder

### Upcoming Features
- Database schema implementation
- API endpoint development
- Real data integration
- Product/category sync functionality
- Blog management system
- Lead tracking system
- Analytics integration

---

**Last Updated**: January 30, 2025

**Status**: Active Development

**Version**: 0.1.0

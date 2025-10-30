'use client';

import { CheckSquare, Square } from 'lucide-react';

interface VendorSelectionCheckboxProps {
  vendorId: number;
  isSelected: boolean;
  onToggle: (vendorId: number) => void;
}

export default function VendorSelectionCheckbox({
  vendorId,
  isSelected,
  onToggle,
}: VendorSelectionCheckboxProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(vendorId);
      }}
      className="p-1 hover:bg-gray-700 rounded transition-colors"
      title={isSelected ? 'Deselect vendor' : 'Select vendor'}
    >
      {isSelected ? (
        <CheckSquare className="w-5 h-5 text-emerald-400" />
      ) : (
        <Square className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}

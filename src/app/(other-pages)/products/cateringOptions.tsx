import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CateringOption {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

interface CateringOptionsProps {
  onSelectionChange: (total: number) => void;
  basePrice: number;
}

export function CateringOptions({ onSelectionChange, basePrice }: CateringOptionsProps) {
  const [options, setOptions] = useState<CateringOption[]>([
    { id: 'jerk-chicken', name: 'Jerk Chicken', price: 500, selected: false },
    { id: 'stew-chicken', name: 'Stew Chicken', price: 500, selected: false },
    { id: 'curry-chicken', name: 'Curry Chicken', price: 500, selected: false },
    { id: 'escovitch-fish', name: 'Escovitch Fish', price: 650, selected: false },
    { id: 'food-decoration', name: 'Food & Decoration Package', price: 1000, selected: false },
  ]);

  const handleOptionSelect = (id: string) => {
    const updatedOptions = options.map(option => {
      if (option.id === id) {
        return { ...option, selected: !option.selected };
      }
      return option;
    });
    setOptions(updatedOptions);

    const selectedOptions = updatedOptions.filter(opt => opt.selected);
    const total = selectedOptions.reduce((sum, opt) => sum + opt.price, basePrice);
    onSelectionChange(total);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Catering Options</h2>
      <div className="space-y-4">
        {options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              option.selected
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                <p className="text-sm text-gray-600">Additional ${option.price}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                option.selected ? 'border-green-500 bg-green-500' : 'border-gray-300'
              }`}>
                {option.selected && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900">
          Selected Options: {options.filter(opt => opt.selected).length}
        </p>
      </div>
    </div>
  );
} 
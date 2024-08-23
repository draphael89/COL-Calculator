import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '../contexts/AppContext'
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { Input } from './ui'

const IncomeInput: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [localIncome, setLocalIncome] = useState(state.income.toString());

  useEffect(() => {
    setLocalIncome(state.income.toString());
  }, [state.income]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalIncome(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      dispatch({ type: 'SET_INCOME', payload: numericValue });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalIncome(value);
    dispatch({ type: 'SET_INCOME', payload: parseFloat(value) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="income-input" className="block text-sm font-medium text-gray-700 mb-1">
            Annual Income ($)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="number"
              id="income-input"
              value={localIncome}
              onChange={handleIncomeChange}
              className="pl-10"
              placeholder="0.00"
              min="0"
              step="1000"
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="income-slider" className="block text-sm font-medium text-gray-700 mb-1">
          Adjust Income
        </label>
        <motion.input
          type="range"
          id="income-slider"
          value={state.income}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          min="0"
          max="500000"
          step="1000"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$0</span>
          <span>$250,000</span>
          <span>$500,000</span>
        </div>
      </div>
    </motion.div>
  )
}

export default IncomeInput
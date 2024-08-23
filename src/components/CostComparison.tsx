import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '../contexts/AppContext'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { Card } from './ui'

// Mock data for cost comparison
const costFactors = {
  'New York': { housing: 100, food: 100, transportation: 100, healthcare: 100, taxes: 100 },
  'Los Angeles': { housing: 80, food: 90, transportation: 85, healthcare: 95, taxes: 90 },
  'Chicago': { housing: 70, food: 85, transportation: 80, healthcare: 90, taxes: 85 },
  'Houston': { housing: 60, food: 80, transportation: 75, healthcare: 85, taxes: 80 },
  'Phoenix': { housing: 65, food: 75, transportation: 70, healthcare: 80, taxes: 75 },
};

const CostComparison: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { currentLocation, targetLocation, income, loading } = state;

  useEffect(() => {
    const calculateComparison = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    if (currentLocation && targetLocation && income > 0) {
      calculateComparison();
    }
  }, [currentLocation, targetLocation, income, dispatch]);

  if (!currentLocation || !targetLocation || income === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-primary-500"
        />
      </div>
    );
  }

  const currentCosts = costFactors[currentLocation as keyof typeof costFactors];
  const targetCosts = costFactors[targetLocation as keyof typeof costFactors];

  const calculateAdjustedIncome = () => {
    const totalCurrentCost = Object.values(currentCosts).reduce((a, b) => a + b, 0);
    const totalTargetCost = Object.values(targetCosts).reduce((a, b) => a + b, 0);
    return (income * totalTargetCost) / totalCurrentCost;
  };

  const adjustedIncome = calculateAdjustedIncome();
  const difference = adjustedIncome - income;

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Cost Comparison</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Comparing {currentLocation} to {targetLocation}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt className="text-sm font-medium text-gray-500">Adjusted Income</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              ${adjustedIncome.toFixed(2)}
              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difference > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {difference > 0 ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                ${Math.abs(difference).toFixed(2)}
              </span>
            </dd>
          </motion.div>
          {Object.entries(currentCosts).map(([category, currentValue], index) => {
            const targetValue = targetCosts[category as keyof typeof targetCosts];
            const difference = ((targetValue - currentValue) / currentValue) * 100;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="text-sm font-medium text-gray-500 capitalize">{category}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={difference > 0 ? 'text-red-600' : 'text-green-600'}>
                    {difference > 0 ? '+' : ''}{difference.toFixed(2)}%
                  </span>
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </Card>
  )
}

export default CostComparison
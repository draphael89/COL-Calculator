import React from 'react'
import { useAppContext } from '../contexts/AppContext'

// Mock data for cost comparison (same as in CostComparison component)
const costFactors = {
  'New York': { housing: 100, food: 100, transportation: 100, healthcare: 100, taxes: 100 },
  'Los Angeles': { housing: 80, food: 90, transportation: 85, healthcare: 95, taxes: 90 },
  'Chicago': { housing: 70, food: 85, transportation: 80, healthcare: 90, taxes: 85 },
  'Houston': { housing: 60, food: 80, transportation: 75, healthcare: 85, taxes: 80 },
  'Phoenix': { housing: 65, food: 75, transportation: 70, healthcare: 80, taxes: 75 },
};

const ResultChart: React.FC = () => {
  const { state } = useAppContext();
  const { currentLocation, targetLocation } = state;

  if (!currentLocation || !targetLocation) {
    return null;
  }

  const currentCosts = costFactors[currentLocation as keyof typeof costFactors];
  const targetCosts = costFactors[targetLocation as keyof typeof costFactors];

  const categories = Object.keys(currentCosts);
  const maxValue = Math.max(...Object.values(currentCosts), ...Object.values(targetCosts));

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Cost Comparison Chart</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Visual representation of cost differences</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="sm:px-6 py-5">
          {categories.map(category => (
            <div key={category} className="mb-4">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span className="capitalize">{category}</span>
                <span>{((targetCosts[category as keyof typeof targetCosts] - currentCosts[category as keyof typeof currentCosts]) / currentCosts[category as keyof typeof currentCosts] * 100).toFixed(2)}%</span>
              </div>
              <div className="flex h-4 overflow-hidden bg-gray-200 rounded">
                <div
                  className="bg-blue-500"
                  style={{ width: `${(currentCosts[category as keyof typeof currentCosts] / maxValue) * 100}%` }}
                ></div>
                <div
                  className="bg-green-500"
                  style={{ width: `${(targetCosts[category as keyof typeof targetCosts] / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-6 py-3 bg-gray-50 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 mr-2 rounded"></div>
            <span>{currentLocation}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 mr-2 rounded"></div>
            <span>{targetLocation}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultChart
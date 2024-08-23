import React, { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import LocationSelector from './components/LocationSelector'
import IncomeInput from './components/IncomeInput'
import HouseholdInput from './components/HouseholdInput'
import CostComparison from './components/CostComparison'
import ResultChart from './components/ResultChart'
import ErrorBoundary from './components/ErrorBoundary'
import { AppProvider, useAppContext } from './contexts/AppContext'
import { HomeIcon, CurrencyDollarIcon, UserGroupIcon, ChartBarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Card } from './components/ui'

const AppContent: React.FC = () => {
  const { state } = useAppContext();
  const { currentLocation, targetLocation, income } = state;
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const validateForm = useCallback(() => {
    if (!currentLocation) {
      return 'Please select your current location';
    }
    if (!targetLocation) {
      return 'Please select your target location';
    }
    if (income <= 0) {
      return 'Please enter a valid income';
    }
    return null;
  }, [currentLocation, targetLocation, income]);

  useEffect(() => {
    const validationError = validateForm();
    setError(validationError);
    setShowResults(validationError === null && currentLocation !== '' && targetLocation !== '' && income > 0);
  }, [currentLocation, targetLocation, income, validateForm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-200 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <Card className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-primary-800 mb-8"
          >
            Cost of Living Comparison
          </motion.h1>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 absolute top-2 right-2" />
            </motion.div>
          )}
          <div className="space-y-6">
            <Section icon={HomeIcon} title="Select Locations">
              <LocationSelector />
            </Section>
            <Section icon={CurrencyDollarIcon} title="Enter Household Income">
              <IncomeInput />
            </Section>
            <Section icon={UserGroupIcon} title="Household Size">
              <HouseholdInput />
            </Section>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Section icon={ChartBarIcon} title="Results">
                  <CostComparison />
                  <ResultChart />
                </Section>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

const Section: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <Icon className="h-6 w-6 mr-2 text-primary-600" />
      {title}
    </h2>
    {children}
  </motion.div>
)

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
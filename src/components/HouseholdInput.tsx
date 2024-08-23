import React from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '../contexts/AppContext'
import { UserIcon, UserPlusIcon } from '@heroicons/react/24/solid'

const HouseholdInput: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_ADULTS', payload: parseInt(e.target.value) });
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_CHILDREN', payload: parseInt(e.target.value) });
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
          <div className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5 text-gray-400" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <motion.label
                  key={`adult-${num}`}
                  className="inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    className="form-radio text-primary-600 focus:ring-primary-500"
                    name="adults"
                    value={num}
                    checked={state.adults === num}
                    onChange={handleAdultsChange}
                  />
                  <span className="ml-2 text-sm text-gray-700">{num}</span>
                </motion.label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
          <div className="flex items-center space-x-2">
            <UserPlusIcon className="h-5 w-5 text-gray-400" />
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((num) => (
                <motion.label
                  key={`child-${num}`}
                  className="inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    className="form-radio text-primary-600 focus:ring-primary-500"
                    name="children"
                    value={num}
                    checked={state.children === num}
                    onChange={handleChildrenChange}
                  />
                  <span className="ml-2 text-sm text-gray-700">{num}</span>
                </motion.label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HouseholdInput
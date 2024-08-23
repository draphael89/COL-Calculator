import React from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '../contexts/AppContext'
import { MapPinIcon } from '@heroicons/react/24/solid'

const LocationSelector: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleCurrentLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_CURRENT_LOCATION', payload: e.target.value });
  };

  const handleTargetLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_TARGET_LOCATION', payload: e.target.value });
  };

  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="current-location" className="block text-sm font-medium text-gray-700 mb-1">
            Current Location
          </label>
          <div className="relative">
            <select
              id="current-location"
              value={state.currentLocation}
              onChange={handleCurrentLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Select your current location"
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <MapPinIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3" aria-hidden="true" />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="target-location" className="block text-sm font-medium text-gray-700 mb-1">
            Target Location
          </label>
          <div className="relative">
            <select
              id="target-location"
              value={state.targetLocation}
              onChange={handleTargetLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Select your target location"
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <MapPinIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LocationSelector
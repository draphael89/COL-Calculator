import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of our state
interface AppState {
  currentLocation: string;
  targetLocation: string;
  income: number;
  adults: number;
  children: number;
  loading: boolean;
}

// Define the types of actions we can dispatch
type AppAction =
  | { type: 'SET_CURRENT_LOCATION'; payload: string }
  | { type: 'SET_TARGET_LOCATION'; payload: string }
  | { type: 'SET_INCOME'; payload: number }
  | { type: 'SET_ADULTS'; payload: number }
  | { type: 'SET_CHILDREN'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: AppState = {
  currentLocation: '',
  targetLocation: '',
  income: 0,
  adults: 1,
  children: 0,
  loading: false,
};

// Create the context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Reducer function to handle state updates
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'SET_TARGET_LOCATION':
      return { ...state, targetLocation: action.payload };
    case 'SET_INCOME':
      return { ...state, income: action.payload };
    case 'SET_ADULTS':
      return { ...state, adults: action.payload };
    case 'SET_CHILDREN':
      return { ...state, children: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Export the context separately
export { AppContext };
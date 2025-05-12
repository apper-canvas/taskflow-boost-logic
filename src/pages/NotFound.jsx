import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const AlertCircleIcon = getIcon('AlertCircle');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md w-full"
      >
        <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
          <AlertCircleIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-surface-800 dark:text-surface-100">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold mb-3 text-surface-700 dark:text-surface-200">
          Page not found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
      
      <div className="mt-12 text-sm text-surface-500 dark:text-surface-400">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </div>
    </div>
  );
}

export default NotFound;
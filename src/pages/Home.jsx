import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home({ darkMode, toggleDarkMode }) {
  const [boards, setBoards] = useState([
    { id: 1, title: 'Web Development Project', color: 'bg-blue-500' },
    { id: 2, title: 'Marketing Campaign', color: 'bg-green-500' },
    { id: 3, title: 'Product Launch', color: 'bg-purple-500' },
  ]);
  
  const [newBoardName, setNewBoardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-blue-500');
  const [showNewBoardInput, setShowNewBoardInput] = useState(false);
  
  const colors = [
    { id: 'blue', class: 'bg-blue-500' },
    { id: 'green', class: 'bg-green-500' },
    { id: 'red', class: 'bg-red-500' },
    { id: 'purple', class: 'bg-purple-500' },
    { id: 'orange', class: 'bg-orange-500' },
    { id: 'teal', class: 'bg-teal-500' },
  ];

  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const LayoutGridIcon = getIcon('LayoutGrid');
  const SearchIcon = getIcon('Search');
  const UserIcon = getIcon('User');
  const SettingsIcon = getIcon('Settings');
  
  const handleAddBoard = () => {
    if (newBoardName.trim() !== '') {
      const newBoard = {
        id: Date.now(),
        title: newBoardName,
        color: selectedColor,
      };
      
      setBoards([...boards, newBoard]);
      setNewBoardName('');
      setShowNewBoardInput(false);
      toast.success('New board created!');
    } else {
      toast.error('Board name cannot be empty');
    }
  };

  const headerMotion = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const boardsMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const boardItemMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 py-4 px-4 sm:px-6"
        variants={headerMotion}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="flex items-center mr-8">
              <LayoutGridIcon className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-xl font-bold text-surface-800 dark:text-white">TaskFlow</h1>
            </div>
            
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search boards..."
                className="pl-10 pr-4 py-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-surface-500" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                <MoonIcon className="h-5 w-5 text-surface-600" />
              }
            </button>
            
            <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
              <SettingsIcon className="h-5 w-5 text-surface-600 dark:text-surface-400" />
            </button>
            
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              <UserIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 container mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">My Boards</h2>
          
          <button 
            onClick={() => setShowNewBoardInput(true)}
            className="btn-primary flex items-center"
            aria-label="Create new board"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">New Board</span>
          </button>
        </div>

        {showNewBoardInput && (
          <motion.div 
            className="mb-8 p-6 card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4">
              <label htmlFor="boardName" className="label">Board Name</label>
              <input
                id="boardName"
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Enter board name"
                className="input"
                autoFocus
              />
            </div>
            
            <div className="mb-6">
              <p className="label">Board Color</p>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.class)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${color.class} ${
                      selectedColor === color.class ? 'ring-2 ring-offset-2 ring-primary' : ''
                    }`}
                    aria-label={`Select ${color.id} color`}
                  >
                    {selectedColor === color.class && (
                      <CheckIcon className="h-5 w-5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={handleAddBoard} className="btn-primary">
                Create Board
              </button>
              <button 
                onClick={() => setShowNewBoardInput(false)} 
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {!showNewBoardInput && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={boardsMotion}
            initial="initial"
            animate="animate"
          >
            {boards.map((board) => (
              <motion.div 
                key={board.id}
                className="group relative overflow-hidden card-neu h-48 flex flex-col transition-all duration-300 transform hover:-translate-y-1"
                variants={boardItemMotion}
              >
                <div className={`h-2 ${board.color} w-full`}></div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-medium mb-2">{board.title}</h3>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">JD</div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-medium">AM</div>
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-medium">+2</div>
                    </div>
                    
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      5 lists • 12 cards
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="btn-primary">
                    Open Board
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Main Feature Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-8">Active Board</h2>
          <MainFeature />
        </div>
      </div>
    </div>
  );
}

export default Home;
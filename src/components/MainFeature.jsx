import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature() {
  // Icon declarations
  const PlusIcon = getIcon('Plus');
  const EditIcon = getIcon('Edit2');
  const XIcon = getIcon('X');
  const CheckIcon = getIcon('Check');
  const TrashIcon = getIcon('Trash');
  const MoreVerticalIcon = getIcon('MoreVertical');
  const CalendarIcon = getIcon('Calendar');
  const TagIcon = getIcon('Tag');
  const UserIcon = getIcon('User');
  const GripIcon = getIcon('GripVertical');

  // State for board data
  const [lists, setLists] = useState([
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', title: 'Research API integration', description: 'Look into REST API options for the project', labels: ['Development', 'Research'], dueDate: '2023-04-12' },
        { id: 'card-2', title: 'Create wireframes', description: 'Design wireframes for the dashboard UI', labels: ['Design'], dueDate: '2023-04-10' },
      ]
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', title: 'Implement authentication', description: 'Build login and signup flows', labels: ['Development', 'High Priority'], dueDate: '2023-04-15' },
        { id: 'card-4', title: 'User testing prep', description: 'Prepare test scripts for user acceptance testing', labels: ['Research'], dueDate: '2023-04-18' },
      ]
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [
        { id: 'card-5', title: 'Initial project setup', description: 'Setup repository and project structure', labels: ['Development'], dueDate: '2023-04-05' },
      ]
    }
  ]);

  // State for the currently dragged card
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverList, setDragOverList] = useState(null);
  
  // State for new list and card creation
  const [newListTitle, setNewListTitle] = useState('');
  const [showNewListInput, setShowNewListInput] = useState(false);
  
  // State for new card creation
  const [newCardContent, setNewCardContent] = useState({ title: '', description: '', labels: [], dueDate: '' });
  const [addingCardToList, setAddingCardToList] = useState(null);
  
  // State for editing cards/lists
  const [editingListId, setEditingListId] = useState(null);
  const [editingListTitle, setEditingListTitle] = useState('');
  
  // Label options
  const labelOptions = [
    { id: 'development', text: 'Development', color: 'bg-blue-500' },
    { id: 'design', text: 'Design', color: 'bg-purple-500' },
    { id: 'research', text: 'Research', color: 'bg-green-500' },
    { id: 'bug', text: 'Bug', color: 'bg-red-500' },
    { id: 'high-priority', text: 'High Priority', color: 'bg-orange-500' },
    { id: 'enhancement', text: 'Enhancement', color: 'bg-teal-500' },
  ];

  // Drag and drop handlers
  const handleDragStart = (card, listId) => {
    setDraggedCard({ ...card, sourceListId: listId });
  };

  const handleDragOver = (e, listId) => {
    e.preventDefault();
    setDragOverList(listId);
  };

  const handleDrop = (e, targetListId) => {
    e.preventDefault();
    
    if (!draggedCard) return;
    
    // Remove card from source list
    const sourceList = lists.find(list => list.id === draggedCard.sourceListId);
    const updatedSourceCards = sourceList.cards.filter(card => card.id !== draggedCard.id);
    
    // Add card to target list
    const targetList = lists.find(list => list.id === targetListId);
    const updatedTargetCards = [...targetList.cards, { ...draggedCard, id: draggedCard.id }];
    
    // Update lists
    const updatedLists = lists.map(list => {
      if (list.id === draggedCard.sourceListId) {
        return { ...list, cards: updatedSourceCards };
      }
      if (list.id === targetListId) {
        return { ...list, cards: updatedTargetCards };
      }
      return list;
    });
    
    setLists(updatedLists);
    setDraggedCard(null);
    
    // Show notification
    if (draggedCard.sourceListId !== targetListId) {
      toast.success(`Moved '${draggedCard.title}' to ${targetList.title}`);
    }
  };

  // List handlers
  const handleAddList = () => {
    if (newListTitle.trim() === '') {
      toast.error('List title cannot be empty');
      return;
    }
    
    const newList = {
      id: `list-${Date.now()}`,
      title: newListTitle,
      cards: []
    };
    
    setLists([...lists, newList]);
    setNewListTitle('');
    setShowNewListInput(false);
    toast.success('New list added!');
  };
  
  const startEditingList = (list) => {
    setEditingListId(list.id);
    setEditingListTitle(list.title);
  };
  
  const saveListTitle = () => {
    if (editingListTitle.trim() === '') {
      toast.error('List title cannot be empty');
      return;
    }
    
    const updatedLists = lists.map(list => 
      list.id === editingListId ? { ...list, title: editingListTitle } : list
    );
    
    setLists(updatedLists);
    setEditingListId(null);
    toast.success('List updated!');
  };
  
  const deleteList = (listId) => {
    if (confirm('Are you sure you want to delete this list? All cards in this list will be deleted.')) {
      const updatedLists = lists.filter(list => list.id !== listId);
      setLists(updatedLists);
      toast.success('List deleted!');
    }
  };

  // Card handlers
  const startAddingCard = (listId) => {
    setAddingCardToList(listId);
    setNewCardContent({ title: '', description: '', labels: [], dueDate: '' });
  };
  
  const toggleCardLabel = (labelText) => {
    if (newCardContent.labels.includes(labelText)) {
      setNewCardContent({
        ...newCardContent,
        labels: newCardContent.labels.filter(label => label !== labelText)
      });
    } else {
      setNewCardContent({
        ...newCardContent,
        labels: [...newCardContent.labels, labelText]
      });
    }
  };
  
  const handleAddCard = () => {
    if (newCardContent.title.trim() === '') {
      toast.error('Card title cannot be empty');
      return;
    }
    
    const newCard = {
      id: `card-${Date.now()}`,
      ...newCardContent
    };
    
    const updatedLists = lists.map(list => {
      if (list.id === addingCardToList) {
        return {
          ...list,
          cards: [...list.cards, newCard]
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    setAddingCardToList(null);
    toast.success('New card added!');
  };
  
  const deleteCard = (cardId, listId) => {
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    toast.success('Card deleted!');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <div className="mb-12">
      <motion.div 
        className="overflow-x-auto pb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex space-x-4 min-w-max">
          {/* Lists */}
          {lists.map((list) => (
            <motion.div 
              key={list.id}
              className="w-80 flex-shrink-0 flex flex-col"
              variants={itemVariants}
              onDragOver={(e) => handleDragOver(e, list.id)}
              onDrop={(e) => handleDrop(e, list.id)}
            >
              {/* List Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                {editingListId === list.id ? (
                  <div className="flex items-center space-x-2 w-full">
                    <input
                      type="text"
                      value={editingListTitle}
                      onChange={(e) => setEditingListTitle(e.target.value)}
                      className="input py-1 text-sm"
                      autoFocus
                    />
                    <button onClick={saveListTitle} className="p-1 text-primary hover:text-primary-dark">
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => setEditingListId(null)} className="p-1 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300">
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-surface-800 dark:text-surface-100 flex items-center">
                      <span>{list.title}</span>
                      <span className="ml-2 text-sm text-surface-500 dark:text-surface-400">{list.cards.length}</span>
                    </h3>
                    <div className="flex items-center">
                      <button 
                        onClick={() => startEditingList(list)}
                        className="p-1 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteList(list.id)}
                        className="p-1 text-surface-500 hover:text-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* Cards Container */}
              <div className="flex-1 bg-surface-100 dark:bg-surface-800/60 rounded-xl p-2 min-h-[200px]">
                {/* Cards */}
                {list.cards.map((card) => (
                  <div
                    key={card.id}
                    className="card p-3 mb-2 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow duration-200"
                    draggable
                    onDragStart={() => handleDragStart(card, list.id)}
                    style={{
                      opacity: draggedCard && draggedCard.id === card.id ? 0.5 : 1,
                      backgroundColor: dragOverList === list.id && draggedCard && draggedCard.id === card.id 
                        ? 'var(--tw-surface-200)' 
                        : ''
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-surface-800 dark:text-surface-100 break-words mr-2">{card.title}</h4>
                      <button className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 p-1">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {card.description && (
                      <p className="text-sm text-surface-600 dark:text-surface-300 mb-3 line-clamp-2">{card.description}</p>
                    )}
                    
                    {card.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {card.labels.map((label, index) => {
                          const labelOption = labelOptions.find(opt => opt.text === label);
                          return (
                            <span 
                              key={index} 
                              className={`text-xs px-2 py-0.5 rounded-full text-white ${labelOption ? labelOption.color : 'bg-blue-500'}`}
                            >
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      {card.dueDate && (
                        <div className="flex items-center text-xs text-surface-500 dark:text-surface-400">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{new Date(card.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      <button
                        onClick={() => deleteCard(card.id, list.id)}
                        className="ml-auto text-surface-400 hover:text-red-500 p-1"
                        aria-label="Delete card"
                      >
                        <TrashIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Card Form */}
                {addingCardToList === list.id ? (
                  <div className="card p-3">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Card title"
                        value={newCardContent.title}
                        onChange={(e) => setNewCardContent({ ...newCardContent, title: e.target.value })}
                        className="input py-1 text-sm mb-2"
                        autoFocus
                      />
                      
                      <textarea
                        placeholder="Description (optional)"
                        value={newCardContent.description}
                        onChange={(e) => setNewCardContent({ ...newCardContent, description: e.target.value })}
                        className="input py-1 text-sm resize-none"
                        rows={2}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <TagIcon className="h-4 w-4 text-surface-500 mr-2" />
                        <span className="text-xs font-medium text-surface-600 dark:text-surface-300">Labels</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {labelOptions.map((label) => (
                          <button
                            key={label.id}
                            onClick={() => toggleCardLabel(label.text)}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              newCardContent.labels.includes(label.text)
                                ? `${label.color} text-white`
                                : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                            }`}
                          >
                            {label.text}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <CalendarIcon className="h-4 w-4 text-surface-500 mr-2" />
                        <span className="text-xs font-medium text-surface-600 dark:text-surface-300">Due Date</span>
                      </div>
                      
                      <input
                        type="date"
                        value={newCardContent.dueDate}
                        onChange={(e) => setNewCardContent({ ...newCardContent, dueDate: e.target.value })}
                        className="input py-1 text-sm"
                      />
                    </div>
                    
                    <div className="flex mt-3">
                      <button onClick={handleAddCard} className="btn-primary text-sm py-1">
                        Add Card
                      </button>
                      <button 
                        onClick={() => setAddingCardToList(null)} 
                        className="ml-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => startAddingCard(list.id)}
                    className="w-full text-left text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 p-2 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700/50 flex items-center text-sm font-medium"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add a card
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Add List Form */}
          <motion.div className="w-80 flex-shrink-0" variants={itemVariants}>
            {showNewListInput ? (
              <div className="bg-white dark:bg-surface-800 rounded-xl p-3 shadow-card">
                <input
                  type="text"
                  placeholder="Enter list title"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  className="input mb-3"
                  autoFocus
                />
                
                <div className="flex">
                  <button onClick={handleAddList} className="btn-primary text-sm">
                    Add List
                  </button>
                  <button 
                    onClick={() => setShowNewListInput(false)} 
                    className="ml-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowNewListInput(true)}
                className="w-full bg-surface-100/80 dark:bg-surface-800/30 hover:bg-surface-200 dark:hover:bg-surface-700/50 rounded-xl p-3 text-left text-surface-600 dark:text-surface-300 hover:text-surface-800 dark:hover:text-surface-100 font-medium flex items-center h-10"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add another list
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Guide */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200">
        <h3 className="font-semibold mb-2">How to use this board:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Drag and drop cards between lists to update their status</li>
          <li>Add new lists to customize your workflow</li>
          <li>Create cards with detailed information including labels and due dates</li>
          <li>Edit list titles by clicking the edit icon</li>
        </ul>
      </div>
    </div>
  );
}

export default MainFeature;
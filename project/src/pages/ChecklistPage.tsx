import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Item {
  id: string;
  name: string;
  packed: boolean;
}

interface Category {
  id: string;
  name: string;
  items: Item[];
  isOpen: boolean;
}

const ChecklistPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editingItem, setEditingItem] = useState<{categoryId: string, itemId: string} | null>(null);
  const [editItemName, setEditItemName] = useState('');

  // Load saved checklist from localStorage
  useEffect(() => {
    const savedChecklist = localStorage.getItem('packingChecklist');
    if (savedChecklist) {
      setCategories(JSON.parse(savedChecklist));
    } else {
      // Set default categories for new users
      const defaultCategories: Category[] = [
        {
          id: 'cat-' + Math.random().toString(36).substr(2, 9),
          name: 'Clothes',
          items: [
            { id: 'item-' + Math.random().toString(36).substr(2, 9), name: 'T-shirts', packed: false },
            { id: 'item-' + Math.random().toString(36).substr(2, 9), name: 'Pants', packed: false },
            { id: 'item-' + Math.random().toString(36).substr(2, 9), name: 'Socks', packed: false },
          ],
          isOpen: true,
        },
        {
          id: 'cat-' + Math.random().toString(36).substr(2, 9),
          name: 'Toiletries',
          items: [
            { id: 'item-' + Math.random().toString(36).substr(2, 9), name: 'Toothbrush', packed: false },
            { id: 'item-' + Math.random().toString(36).substr(2, 9), name: 'Toothpaste', packed: false },
          ],
          isOpen: true,
        },
        {
          id: 'cat-' + Math.random().toString(36).substr(2, 9),
          name: 'Electronics',
          items: [
            { id: 'item-' + Math.random().toString(36).substr(2, 9), name: 'Phone charger', packed: false },
            { id: 'item-' + Math.random().toString(36).substr(2, 9), name: 'Laptop', packed: false },
          ],
          isOpen: true,
        },
      ];
      setCategories(defaultCategories);
      localStorage.setItem('packingChecklist', JSON.stringify(defaultCategories));
    }
  }, []);

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('packingChecklist', JSON.stringify(categories));
    }
  }, [categories]);

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: 'cat-' + Math.random().toString(36).substr(2, 9),
      name: newCategoryName,
      items: [],
      isOpen: true,
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  const addItem = () => {
    if (!newItemName.trim() || !selectedCategory) return;
    
    const newItem: Item = {
      id: 'item-' + Math.random().toString(36).substr(2, 9),
      name: newItemName,
      packed: false,
    };
    
    setCategories(categories.map(category => 
      category.id === selectedCategory 
        ? { ...category, items: [...category.items, newItem] }
        : category
    ));
    
    setNewItemName('');
  };

  const toggleItemPacked = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            items: category.items.map(item => 
              item.id === itemId 
                ? { ...item, packed: !item.packed }
                : item
            )
          }
        : category
    ));
  };

  const startEditingCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setEditingCategory(categoryId);
      setEditCategoryName(category.name);
    }
  };

  const saveEditingCategory = () => {
    if (!editingCategory || !editCategoryName.trim()) return;
    
    setCategories(categories.map(category => 
      category.id === editingCategory 
        ? { ...category, name: editCategoryName }
        : category
    ));
    
    setEditingCategory(null);
    setEditCategoryName('');
  };

  const startEditingItem = (categoryId: string, itemId: string) => {
    const category = categories.find(c => c.id === categoryId);
    const item = category?.items.find(i => i.id === itemId);
    
    if (item) {
      setEditingItem({ categoryId, itemId });
      setEditItemName(item.name);
    }
  };

  const saveEditingItem = () => {
    if (!editingItem || !editItemName.trim()) return;
    
    setCategories(categories.map(category => 
      category.id === editingItem.categoryId 
        ? {
            ...category,
            items: category.items.map(item => 
              item.id === editingItem.itemId 
                ? { ...item, name: editItemName }
                : item
            )
          }
        : category
    ));
    
    setEditingItem(null);
    setEditItemName('');
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, items: category.items.filter(item => item.id !== itemId) }
        : category
    ));
  };

  const toggleCategoryOpen = (categoryId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, isOpen: !category.isOpen }
        : category
    ));
  };

  const getTotalItems = () => {
    return categories.reduce((total, category) => total + category.items.length, 0);
  };

  const getPackedItems = () => {
    return categories.reduce((total, category) => 
      total + category.items.filter(item => item.packed).length, 0
    );
  };

  const getCompletionPercentage = () => {
    const total = getTotalItems();
    if (total === 0) return 0;
    return Math.round((getPackedItems() / total) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)]"
    >
      <section className="mb-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Packing Checklist</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {isAuthenticated 
              ? `Welcome, ${user?.name}! Organize your items and never forget anything.`
              : 'Organize your items and never forget anything.'}
          </p>
        </motion.div>

        {/* Progress Bar */}
        {getTotalItems() > 0 && (
          <motion.div 
            className="mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Packing Progress</div>
              <div className="text-sm font-medium">
                {getPackedItems()} of {getTotalItems()} items packed
              </div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getCompletionPercentage()}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 text-center text-sm font-medium">
              {getCompletionPercentage()}% complete
            </div>
          </motion.div>
        )}

        {/* Add new category */}
        <motion.div 
          className="mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-4">Add New Category</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="input"
                placeholder="Category name"
              />
              <motion.button
                onClick={addCategory}
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!newCategoryName.trim()}
              >
                <Plus size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Add new item */}
        <motion.div 
          className="mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-4">Add New Item</h3>
            <div className="space-y-4">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="input"
                  placeholder="Item name"
                  disabled={!selectedCategory}
                />
                <motion.button
                  onClick={addItem}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newItemName.trim() || !selectedCategory}
                >
                  <Plus size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories List */}
        <div className="max-w-xl mx-auto space-y-6">
          {categories.length === 0 ? (
            <motion.div 
              className="text-center py-12 text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="mb-4">No categories yet. Add one to get started!</p>
              <PlusCircle size={32} className="mx-auto opacity-50" />
            </motion.div>
          ) : (
            <AnimatePresence>
              {categories.map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="card overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    {editingCategory === category.id ? (
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="input"
                          autoFocus
                        />
                        <motion.button
                          onClick={saveEditingCategory}
                          className="btn btn-primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Save size={18} />
                        </motion.button>
                        <motion.button
                          onClick={() => setEditingCategory(null)}
                          className="btn btn-outline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X size={18} />
                        </motion.button>
                      </div>
                    ) : (
                      <>
                        <div 
                          className="flex items-center space-x-2 cursor-pointer flex-1"
                          onClick={() => toggleCategoryOpen(category.id)}
                        >
                          <motion.div
                            animate={{ rotate: category.isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} />
                          </motion.div>
                          <h3 className="text-lg font-medium">{category.name}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({category.items.filter(item => item.packed).length}/{category.items.length})
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => startEditingCategory(category.id)}
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            onClick={() => deleteCategory(category.id)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {category.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.items.length === 0 ? (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                            No items yet. Add some!
                          </div>
                        ) : (
                          <ul>
                            {category.items.map((item, itemIndex) => (
                              <motion.li
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, delay: itemIndex * 0.03 }}
                                className="checklist-item"
                              >
                                {editingItem && editingItem.categoryId === category.id && editingItem.itemId === item.id ? (
                                  <div className="flex-1 flex space-x-2">
                                    <input
                                      type="text"
                                      value={editItemName}
                                      onChange={(e) => setEditItemName(e.target.value)}
                                      className="input"
                                      autoFocus
                                    />
                                    <motion.button
                                      onClick={saveEditingItem}
                                      className="btn btn-primary"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Save size={18} />
                                    </motion.button>
                                    <motion.button
                                      onClick={() => setEditingItem(null)}
                                      className="btn btn-outline"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <X size={18} />
                                    </motion.button>
                                  </div>
                                ) : (
                                  <>
                                    <motion.div 
                                      className="flex items-center space-x-3 flex-1"
                                      whileHover={{ x: 2 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={item.packed}
                                        onChange={() => toggleItemPacked(category.id, item.id)}
                                        className="checklist-item-checkbox"
                                      />
                                      <span className={item.packed ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
                                        {item.name}
                                      </span>
                                    </motion.div>
                                    <div className="flex space-x-2">
                                      <motion.button
                                        onClick={() => startEditingItem(category.id, item.id)}
                                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <Edit size={16} />
                                      </motion.button>
                                      <motion.button
                                        onClick={() => deleteItem(category.id, item.id)}
                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <Trash2 size={16} />
                                      </motion.button>
                                    </div>
                                  </>
                                )}
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default ChecklistPage;
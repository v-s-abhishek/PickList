import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PackageCheck, CheckCircle, List, Save } from 'lucide-react';

const HomePage: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      icon: <List size={24} />,
      title: 'Organized Categories',
      description: 'Keep your items neatly organized in customizable categories.',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Interactive Checklists',
      description: 'Check off items as you pack them to ensure nothing is forgotten.',
    },
    {
      icon: <Save size={24} />,
      title: 'Local Storage',
      description: 'Your lists are saved in your browser so you never lose your progress.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-[calc(100vh-5rem)]"
    >
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Never Forget a Thing
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Create your perfect packing list with our interactive checklist app. 
                Organize items by category, check off as you pack, and travel stress-free.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/checklist" className="btn btn-primary">
                  Start Packing
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Create Account
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-8 -left-8 w-64 h-64 bg-blue-400/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute bottom-12 right-12 w-48 h-48 bg-purple-400/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply filter blur-xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 270, 180, 90, 0]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 card p-8 border border-gray-200 dark:border-gray-800">
                  <div className="flex mb-6 text-blue-600">
                    <PackageCheck size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Packing for: Beach Vacation</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="checklist-item-checkbox" checked readOnly />
                      <span className="line-through">Sunscreen</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="checklist-item-checkbox" checked readOnly />
                      <span className="line-through">Swimsuit</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="checklist-item-checkbox" />
                      <span>Beach towel</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="checklist-item-checkbox" />
                      <span>Sunglasses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="checklist-item-checkbox" />
                      <span>Hat</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    5 items · 2 packed
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features That Make Packing Easy</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our app helps you pack efficiently with these powerful features
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="card p-8 flex flex-col items-center text-center"
                variants={item}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/checklist" className="btn btn-primary">
              Try It Now
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
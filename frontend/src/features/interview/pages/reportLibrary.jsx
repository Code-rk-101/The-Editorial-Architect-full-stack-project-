import React, { useState } from 'react';
import { motion as Motion , AnimatePresence } from 'framer-motion';
import { 
  FiSearch,
  FiFilter,
  FiChevronDown,
} from 'react-icons/fi';
import NavBar from '../components/nav';
import Footer from '../components/footer';
import { UseInterview } from '../hooks/useInterview';
import ReportBar from '../components/reportBar';
import { useEffect } from 'react';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};


export default function ReportsLibrary() 
{
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'archived'
    const [searchQuery, setSearchQuery] = useState('');
    const { reports,getAllInterview } = UseInterview();
  useEffect(() => {
        getAllInterview();
    }, []);

    

  // Filter logic
  const filteredReports = reports.filter(report => 
  {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

// //   const activeCount = initialReports.filter(r => !r.isArchived).length;
  const archivedCount = 1;

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-800 font-sans flex flex-col">
      
      {/* Top Navigation */}
        <NavBar/>

        <main className="flex-1 max-w-250 w-full mx-auto px-4 md:px-8 py-10 flex flex-col mb-0">
        
        {/* Page Header & Tabs */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Reports Library</h1>
            <p className="text-slate-500 text-sm">Review, manage, and track your tailored resume strategies.</p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-slate-200/50 rounded-xl w-max border border-slate-200">
            <button 
              onClick={() => setActiveTab('active')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'active' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Active <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'active' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}`}>{reports.length}</span>
            </button>
            <button 
              onClick={() => setActiveTab('archived')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'archived' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Archived <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'archived' ? 'bg-slate-100 text-slate-800' : 'bg-slate-200 text-slate-500'}`}>{archivedCount}</span>
            </button>
          </div>
        </div>

        {/* Toolbar (Search & Filter) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
          <div className="flex-1 flex items-center bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-50 transition-all shadow-sm">
            <FiSearch className="text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search by role or company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
            />
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
              <FiFilter /> Filter
            </button>
            {/* <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
              Sort by: Date <FiChevronDown />
            </button> */}
          </div>
        </div>

        {/* Reports List */}
        <div className="flex-1 w-full">
          {filteredReports.length === 0 ? (
             <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">No reports found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
             </div>
          ) : (
            <Motion.div 
              variants={containerVariants} 
              initial="hidden" 
              animate="show" 
              className="space-y-5"
            >
              <AnimatePresence mode='popLayout'>
                {filteredReports.map((report) => (
                  <ReportBar key={report._id} report={report} itemVariants={itemVariants}/>
                ))}
              </AnimatePresence>
            </Motion.div>
          )}
        </div>
        </main>
        <Footer/>
    </div>
  );
}
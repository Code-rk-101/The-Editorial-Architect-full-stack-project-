import { motion as Motion } from "framer-motion"
import { FiArchive, FiBriefcase, FiCalendar, FiClock, FiEye, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import { UseInterview } from "../hooks/useInterview";

const ScoreCircle = ({ score }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const strokeColor = score >= 80 ? '#4f46e5' : score >= 60 ? '#8b5cf6' : '#4F4A4A';

  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
        {/* Background Circle */}
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="6" />
        {/* Progress Circle */}
        <Motion.circle 
          cx="32" cy="32" r={radius} fill="none" 
          stroke={strokeColor} strokeWidth="6" 
          strokeLinecap="round"
          strokeDasharray={circumference} 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-slate-800 leading-none">{score}</span>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Match</span>
      </div>
    </div>
  );
};


export default function ReportBar({ report, itemVariants }) 
{

    const { removeInterviewReportById } = UseInterview();
    const navigate = useNavigate();
    return (
        <Motion.div 
            key={report._id} 
            layout
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group"
            >
                {/* ${true ? '' : 'border-slate-200 hover:border-indigo-200'} */}
            
            <ScoreCircle score={report.matchScore} />
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                        {report.title}
                    </h4>
                    {/* {report.status === 'Draft' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                        DRAFT
                        </span>
                    )} */}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                    <FiCalendar className="text-slate-400" /> {report.date}
                </div>
                <div className="flex items-center gap-1.5">
                    <FiClock className="text-slate-400" /> {report.time}
                </div>
                </div>
            </div>

            {/* Action Buttons (Visible on hover on desktop, always on mobile) */}
            <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <button 
                onClick={()=>navigate(`/report/${report._id}`)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors">
                <FiEye /> View
                </button>
                
                {/* {true ? (
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors tooltip-trigger" title="Archive">
                    <FiArchive />
                    </button>
                ) : (
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors tooltip-trigger" title="Restore">
                    <FiRefreshCw />
                    </button>
                )} */}
                
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"
                onClick={()=>{removeInterviewReportById(report._id)}}
                >
                <FiTrash2 />
                </button>
            </div>

        </Motion.div>
    )
}
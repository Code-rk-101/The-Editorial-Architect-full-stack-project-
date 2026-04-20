import { motion as Motion } from "framer-motion";
import { FiCheckCircle, FiTarget } from "react-icons/fi";
import { useOutletContext } from "react-router";
import { UseInterview } from "../hooks/useInterview";

const PreparationPlan = ()=>
{
    const {prepPlan,itemVariants} = useOutletContext();
    
    
    return (
        <section>
            <h3 className="text-2xl font-serif font-bold mb-6 border-b border-slate-200 pb-2">7-Day Preparation Plan</h3>
            
            <div className="pb-1 h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-lg ml-5">
                
            {prepPlan.map((plan) => (
                <div key={plan.day} className="pb-5">
                    <Motion.div variants={itemVariants} className="relative pl-8 ml-5 border-l">
                        <div className="absolute -left-5 top-0 bg-white border border-slate-200 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-slate-500 shadow-sm">
                            {plan.day}
                        </div>
                        
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                            <h4 className="font-bold mb-3">{plan.focus}</h4>
                            
                            <ul className="grid lg:grid-cols-2 md:grid-cols-1 gap-3">
                            {plan.task.map((task, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <FiCheckCircle className="text-indigo-400 mt-1 shrink-0" />
                                <span>{task}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </Motion.div>
                </div>
            ))}
            
            {/* Final step */}
                <Motion.div variants={itemVariants} className="relative pl-8 ml-5 border-l">
                    <div className="absolute -left-5 top-0 bg-indigo-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                        <FiTarget />
                    </div>
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                        <h4 className="font-bold text-indigo-900 mb-2">Final Review & Confidence</h4>
                        <p className="text-sm text-indigo-800/80">Review major project details from your resume, prepare 3-4 strategic questions for the interviewer, and ensure technical environments are ready.</p>
                    </div>
                </Motion.div>
            </div>
            
        </section>
    );
};

export default PreparationPlan;
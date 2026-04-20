import { motion as Motion } from "framer-motion";
import { useOutletContext } from "react-router";
import { UseInterview } from "../hooks/useInterview";

export default function BehavioralQuestions() {
  const { behavioralInsights, itemVariants } = useOutletContext();



  return (
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 border-b border-slate-200 pb-2">
        Behavioral Insights
      </h3>
      <div className="space-y-6 h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-lg pb-1">
        {behavioralInsights.map((b, index) => (
          <Motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
          >
            <h4 className="text-lg font-bold mb-4">{b.question}</h4>
            <div className="border-l-2 border-indigo-300 pl-4 mb-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Psychological Intention
              </p>
              <p className="text-sm text-slate-600 italic">{b.intention}</p>
            </div>
            <div className="border border-slate-100 rounded-lg p-5 bg-slate-50/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                How to Answer :{" "}
              </p>
              <p className="text-sm text-slate-700">{b.answer}</p>
            </div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
}

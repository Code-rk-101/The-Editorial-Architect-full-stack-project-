import { motion as Motion } from "framer-motion";
import { useOutletContext } from "react-router";
import { UseInterview } from "../hooks/useInterview";

const TechnicalQuestion = () => {
  const { technicalQuestions, itemVariants } = useOutletContext();

  return (
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 border-b border-slate-200 pb-2 relative">
        Technical Questions
      </h3>
      <div className="space-y-6 h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-lg pb-1 ">
        {technicalQuestions.map((q, index) => (
          <Motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex gap-6"
          >
            <div className="text-4xl font-bold text-indigo-100">
              {index + 1}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-4 text-slate-800">
                {q.question}
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Intention
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {q.intention}
                  </p>
                </div>
                <div className="bg-indigo-50/30 p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">
                    Expected Answer
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {q.answer}
                  </p>
                </div>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalQuestion;

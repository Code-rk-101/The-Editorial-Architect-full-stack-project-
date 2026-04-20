import React, { useEffect, useState } from "react";
import { motion as Motion, animate } from "framer-motion";
import {
  FiFileText,
  FiCode,
  FiUserCheck,
  FiCalendar,
  FiDownload,
  FiArchive,
  FiTarget,
  FiLoader,
} from "react-icons/fi";
import NavBar from "../components/nav";
import { UseInterview } from "../hooks/useInterview";
import Footer from "../components/footer";
import { Link, Outlet, useParams, useLocation } from "react-router";
import { FaTruckLoading } from "react-icons/fa";
import {
  BsArrowDownCircle,
  BsArrowDownLeftCircle,
  BsDownload,
} from "react-icons/bs";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function ResultPage() {
  const { getReportById, report, getResumePdf, loading } = UseInterview();
  const { interviewId } = useParams();
  const location = useLocation();

  const isTechnical =
    location.pathname.includes("/technical") ||
    location.pathname.endsWith(interviewId) ||
    location.pathname.endsWith(`${interviewId}/`);
  const isBehavioral = location.pathname.includes("/behavioral");
  const isPreparation = location.pathname.includes("/preparation");

  // Initialize page state
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, []);

  const technicalQuestions = report?.technicalQuestions || [];
  const behavioralInsights = report?.behavioralQuestions || [];
  const prepPlan = report?.preparationPlan || [];
  const score = report?.matchScore || 0;
  const skills = report?.skillGaps || [];

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.2,
      onUpdate: (value) => setDisplayScore(Math.round(value)),
    });
    return () => controls?.stop?.();
  }, [score]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-800 font-sans">
      {/* Top Navigation */}
      <NavBar />

      {/* Main Container - Added flex-col for mobile, md:flex-row for desktop */}
      <div className="max-w-full mx-auto flex flex-col md:flex-row pt-8 px-4 md:px-8 mb-5 gap-5 relative">
        {/* Right Sidebar (Analytics & Advice) -> Moved to order-1 on mobile, order-3 on desktop */}
        <aside className="w-full md:w-[20%] md:min-w-60 shrink flex flex-col gap-6 order-1 md:order-3 ">
          {/* --- Top Row on Mobile, Stacked on Desktop --- */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-6">
            {/* Match Precision Card */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden transition-all hover:shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 pointer-events-none"></div>

              <h3 className="text-sm font-bold text-slate-800 tracking-wide mb-6 w-full text-center">
                Match Precision
              </h3>

              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-40 h-40">
                  {/* Background Track */}
                  <svg
                    className="w-full h-full transform -rotate-90 drop-shadow-sm"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                    />
                    {/* Animated Fill */}
                    <Motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#blue-gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="264"
                      initial={{ strokeDashoffset: 264 }}
                      animate={{ strokeDashoffset: 264 - 264 * (score / 100) }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                    />
                    {/* Define Gradient */}
                    <defs>
                      <linearGradient
                        id="blue-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#1E88E5"
                        />
                        <stop
                          offset="100%"
                          stopColor="#1e3a8a"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-slate-800 tracking-tight">
                      {displayScore}%
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mt-1 bg-blue-50 px-2 py-0.5 rounded-full">
                      {score >= 75
                        ? "Strong"
                        : score >= 50
                          ? "Moderate"
                          : "Weak"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Gap Analysis Card */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide mb-6 flex justify-between items-center">
                Skill Gap Analysis
                <span
                  className="text-xs bg-slate-50 border border-slate-200 w-5 h-5 rounded-full flex items-center justify-center text-slate-400 cursor-help hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  title="Shows your proficiency versus role requirements"
                >
                  ?
                </span>
              </h3>

              <div className="space-y-4">
                {skills.map((skill, idx) => {
                  const badgeStyle =
                    skill.severity == "high"
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : skill.severity == "medium"
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-100";

                  const barStyle =
                    skill.severity == "high"
                      ? "bg-gradient-to-r from-red-400 to-red-500"
                      : skill.severity == "medium"
                        ? "bg-gradient-to-r from-amber-400 to-amber-500"
                        : "bg-gradient-to-r from-emerald-400 to-emerald-500";

                  return (
                    <div
                      key={idx}
                      className="group cursor-default"
                    >
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                          {skill.skill}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded uppercase text-[9px] font-bold tracking-wider ${badgeStyle}`}
                        >
                          {skill.severity}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <Motion.div
                          className={`h-full rounded-full ${barStyle}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.3 + idx * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Editorial Advice Card */}
          <div className="bg-linear-to-br from-indigo-50/80 to-blue-50/50 border border-indigo-100 p-3 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-indigo-100 p-1.5 rounded-md">
                <FiTarget className="text-indigo-600 w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">
                Editorial Advice
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Your architectural depth is exceptional, but ensure you emphasize{" "}
              <span className="text-indigo-700 font-semibold">
                "collaboration"
              </span>{" "}
              as much as "technicality" during behavioral rounds.
            </p>
          </div>
        </aside>

        {/* Left Sidebar (Navigation) -> Moved to order-2 on mobile, order-1 on desktop */}
        <aside className="w-full md:w-45 shrink-0 flex md:flex-col flex-row justify-between h-auto md:h-100% order-2 md:order-1">
          <div className="flex-1 min-w-0">
            <div className="hidden md:block mb-6">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <FiFileText className="text-indigo-600" /> Resume Analysis
              </h2>
              <p className="text-xs text-slate-500 ml-6">
                {report?.title?.toString().toUpperCase() || "Loading..."}
              </p>
            </div>

            {/* Changed flex-col to flex-row for mobile horizontal scrolling nav */}
            <nav className="flex flex-row md:flex-col gap-2 space-y-0 md:space-y-2 text-sm text-slate-600 overflow-x-auto pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Link
            to={`/report/${interviewId}/technical`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
              isTechnical 
                ? "bg-indigo-50/80 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50" 
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <FiCode className={isTechnical ? "text-indigo-600" : "text-slate-400"} /> 
            Technical Analysis
          </Link>

          <Link
            to={`/report/${interviewId}/behavioral`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
              isBehavioral 
                ? "bg-indigo-50/80 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50" 
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <FiUserCheck className={isBehavioral ? "text-indigo-600" : "text-slate-400"} /> 
            Behavioral Insights
          </Link>

          <Link
            to={`/report/${interviewId}/preparation`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
              isPreparation 
                ? "bg-indigo-50/80 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50" 
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <FiCalendar className={isPreparation ? "text-indigo-600" : "text-slate-400"} /> 
            Preparation Plan
          </Link>

          {/* Mobile Export Button (Inside Nav for horizontal scroll flow) */}
          <button
            className="flex md:hidden items-center justify-center gap-2 px-5 py-3 ml-2 text-indigo-600 bg-white border border-indigo-100 hover:bg-indigo-50 shadow-sm rounded-xl whitespace-nowrap transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={() => getResumePdf(interviewId)}
            disabled={loading}
            title="Get a tailored resume file"
          >
            {loading ? (
              <FiLoader className="animate-spin w-4 h-4" />
            ) : (
              <BsArrowDownCircle className="w-4 h-4 group-hover:animate-bounce" />
            )}
            {loading ? "Generating..." : "Export"}
          </button>
            </nav>
          </div>

          <div className="hidden md:flex flex-col gap-2 mt-auto pt-6 border-t border-slate-100/60">
        <button
          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 rounded-xl transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={() => getResumePdf(interviewId)}
          disabled={loading}
          title="Get a tailored resume file"
        >
          {loading ? (
            <FiLoader className="animate-spin w-4 h-4" />
          ) : (
            <BsArrowDownCircle className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          )}
          {loading ? "Generating PDF..." : "Export Resume"}
        </button>
      </div>
        </aside>

        {/* Main Content Area -> Order-3 on mobile, order-2 on desktop */}
        <main className="flex-1 min-h-0 w-full max-w-full order-3 md:order-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className=" w-full "
          >
            <Outlet
              context={{
                technicalQuestions,
                behavioralInsights,
                prepPlan,
                itemVariants,
              }}
            />
          </Motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

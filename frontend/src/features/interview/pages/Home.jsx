import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { UseInterview } from "../hooks/useInterview.js";
import { motion as Motion } from "framer-motion";
import { FaBriefcase, FaUserTie, FaLock } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FiUploadCloud, FiFileText, FiEye, FiTrendingUp } from "react-icons/fi";
import NavBar from "../components/nav.jsx";
import { useAuth } from "../../auth/hooks/useAuth.js";
import Footer from "../components/footer.jsx";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Home() {
  const navigate = useNavigate();
  const { generateReport } = UseInterview();
  const { user } = useAuth();
  const jobDescriptionRef = useRef();
  const selfDescriptionRef = useRef();
  const [file, setFile] = useState(null);
  const [res, setRes] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    if (!user) {
      return navigate("/auth");
    }
    const jobDescription = jobDescriptionRef.current.value;
    const selfDescription = selfDescriptionRef.current.value;

    const interviewId = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile: file,
    });
    if (interviewId.errors || typeof interviewId !== "string") {
      console.log(
        "Report Generation Error:",
        interviewId?.errors || interviewId,
      );
      setRes(
        interviewId?.errors || {
          jobDescription: "An error occurred during generation.",
        },
      );
      return;
    } else {
      navigate(`/report/${interviewId}/technical`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // const LandingSkeleton = () => (
  //   <div className="w-full animate-pulse flex flex-col items-center pb-24">
  //     {/* Hero Skeleton */}
  //     <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center w-full">
  //       <div className="w-40 h-7 bg-[#E2E8F0]/60 rounded-full mb-8"></div>
  //       <div className="w-full max-w-2xl h-16 bg-[#E2E8F0]/60 rounded-xl mb-4 text-center"></div>
  //       <div className="w-3/4 max-w-lg h-16 bg-[#E2E8F0]/60 rounded-xl mb-6"></div>
  //       <div className="w-full max-w-xl h-20 bg-[#E2E8F0]/60 rounded-xl mb-16"></div>

  //       {/* Form Skeleton */}
  //       <div className="w-full bg-[#F3F4F8] p-4 md:p-8 rounded-4xl border border-white/50 shadow-sm">
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
  //           <div className="bg-white/60 p-5 rounded-2xl h-[216px]"></div>
  //           <div className="bg-white/60 p-5 rounded-2xl h-[216px]"></div>
  //           <div className="bg-[#F8F9FB] border-2 border-dashed border-[#D1D5DB] rounded-2xl h-[216px]"></div>
  //         </div>
  //         <div className="mt-8 flex flex-col items-center">
  //           <div className="w-56 h-14 bg-[#E2E8F0]/60 rounded-xl"></div>
  //           <div className="w-64 h-4 bg-[#E2E8F0]/40 rounded-md mt-4"></div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Process Skeleton */}
  //     <div className="w-full py-24 bg-white">
  //       <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
  //         <div className="w-80 h-10 bg-[#E2E8F0]/60 rounded-xl mb-4"></div>
  //         <div className="w-12 h-px bg-gray-200 mb-16"></div>
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
  //           {[1, 2, 3].map((i) => (
  //             <div key={i} className="flex flex-col items-center">
  //               <div className="w-14 h-14 bg-[#E2E8F0]/60 rounded-2xl mb-6"></div>
  //               <div className="w-48 h-6 bg-[#E2E8F0]/60 rounded-md mb-3"></div>
  //               <div className="w-full max-w-xs h-16 bg-[#E2E8F0]/40 rounded-md"></div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>

  //     {/* Features Skeleton */}
  //     <div className="w-full py-20 pt-25 bg-[#F8F9FB]">
  //       <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
  //         <div className="bg-white p-10 md:p-12 rounded-3xl h-[320px] shadow-sm"></div>
  //         <div className="bg-[#4A5A75]/20 p-10 md:p-12 rounded-3xl h-[320px]"></div>
  //       </div>
  //     </div>

  //     {/* Trust Skeleton */}
  //     <div className="w-full py-10 bg-[#F8F9FB]">
  //       <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
  //         <div className="bg-gray-200/40 p-8 rounded-3xl h-[200px]"></div>
  //         <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl h-[200px] shadow-sm"></div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A1A2E] font-sans selection:bg-[#E0D4FF] selection:text-[#1A1A2E] relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-125 bg-linear-to-b from-[#E0D4FF]/30 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Navbar (Always visible) */}
      <NavBar />

      {/* {loading ? (
        <LandingSkeleton />
      ) : (
        <> */}
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl flex flex-col items-center"
        >
          <Motion.span
            variants={fadeUp}
            className="bg-[#F0E6FF] text-[#7B5EAD] px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-8"
          >
            Precision Analysis
          </Motion.span>

          <Motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-[#1A1A2E] mb-6"
          >
            Refine Your Professional <br />
            <span className="italic text-[#6B85E4]">Narrative.</span>
          </Motion.h1>

          <Motion.p
            variants={fadeUp}
            className="text-[#6B7280] md:text-lg max-w-xl leading-relaxed mb-16"
          >
            Elevate your candidacy with an editorial eye. Our analyzer dissects
            industry expectations to align your experience with your next great
            ambition.
          </Motion.p>
        </Motion.div>

        {/* Form / Input Area */}

        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full bg-[#F3F4F8] p-4 md:p-8 rounded-4xl border border-white/50 shadow-sm"
        >
          <form onSubmit={handleGenerateReport}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Job Description */}
              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">
                  <FaBriefcase className="text-[#6B85E4]" /> Job Description
                </div>
                <textarea
                  ref={jobDescriptionRef}
                  placeholder="Paste the target role description here..."
                  required
                  className="w-full h-32 md:h-40 resize-none outline-none text-sm placeholder:text-gray-400 bg-transparent"
                />
                <p className="text-red-500 text-xs mt-2">
                  {res.jobDescription?.[0]}
                </p>
              </div>

              {/* Self Description */}
              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">
                  <FaUserTie className="text-[#6B85E4]" /> Self Description
                </div>
                <textarea
                  ref={selfDescriptionRef}
                  placeholder="Describe your unique value proposition or pitch..."
                  required
                  className="w-full h-32 md:h-40 resize-none outline-none text-sm placeholder:text-gray-400 bg-transparent"
                />
                <p className="text-red-500 text-xs mt-2">
                  {res.selfDescription?.[0]}
                </p>
              </div>

              {/* Resume Upload */}
              <div className="bg-[#F8F9FB] border-2 border-dashed border-[#D1D5DB] rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden transition-colors hover:bg-[#F0E6FF]/30">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                />
                <div className="flex items-center gap-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4 w-full justify-start absolute top-5 left-5">
                  <FiFileText className="text-[#6B85E4]" /> Resume
                </div>
                <div
                  className={`mt-8 flex flex-col items-center text-center transition-transform ${isDragging ? "scale-110" : ""}`}
                >
                  <FiUploadCloud className="text-3xl text-[#6B85E4] mb-3" />
                  <span className="text-sm font-semibold text-[#1A1A2E]">
                    {file ? file.name : "Drop file or click"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PDF (Max 5MB)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <Motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-linear-to-r from-[#DCE4FF] to-[#E0D4FF] text-[#1A1A2E] font-semibold py-4 px-10 rounded-xl flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                Analyze Resume <BsStars className="text-[#7B5EAD]" />
              </Motion.button>
              <p className="text-xs text-gray-400 italic mt-4">
                Processing utilizes advanced linguistic modeling for
                professional alignment.
              </p>
            </div>
          </form>
        </Motion.div>
      </main>

      {/* Process Section */}
      <section
        id="features"
        className="py-24 bg-white"
      >
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-6 text-center"
        >
          <Motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-4xl mb-4"
          >
            The Architectural Process
          </Motion.h2>
          <Motion.div
            variants={fadeUp}
            className="w-12 h-px bg-gray-300 mx-auto mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FiFileText,
                color: "bg-[#DCE4FF]",
                title: "1. Upload & Input",
                desc: "Share your resume and the target job description to establish the foundation.",
              },
              {
                icon: FiEye,
                color: "bg-[#F0E6FF]",
                title: "2. Editorial Analysis",
                desc: "Our AI-driven 'Editorial Eye' dissects linguistic alignment and industry tone.",
              },
              {
                icon: FiTrendingUp,
                color: "bg-[#D1F2EB]",
                title: "3. Refine & Succeed",
                desc: "Receive a tailored report to polish your professional narrative for impact.",
              },
            ].map((step, idx) => (
              <Motion.div
                key={idx}
                variants={fadeUp}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-xl text-[#3D4F6B] mb-6`}
                >
                  <step.icon />
                </div>
                <h3 className="font-serif font-bold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </section>

      {/* Features & Stats Section */}
      <section className="py-20 pt-25 bg-[#F8F9FB]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-12 rounded-3xl shadow-sm flex flex-col justify-center"
          >
            <div>
              <p className="font-serif text-xl italic text-[#1A1A2E] leading-relaxed mb-6">
                "The difference between a technician and a leader is in the
                narrative. This tool helps bridge that gap effortlessly."
              </p>
              <div className="text-xs font-bold tracking-widest uppercase text-gray-500">
                Julianna Vane, Senior Career Strategist
              </div>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#4A5A75] text-white p-10 md:p-12 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center"
          >
            <div className="font-serif text-7xl md:text-8xl mb-2">85%</div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#DCE4FF] mb-6">
              Success Increase
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Users who refined their narrative saw a significant lift in
              interview invitations.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Trust & Testimonial Section */}
      {/* <section className="py-10 bg-[#F8F9FB]">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-200/50 p-8 rounded-3xl"
              >
                <FaLock className="text-[#6B85E4] text-2xl mb-6" />
                <h4 className="font-serif text-xl font-semibold mb-3">
                  Private by Design
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your professional data is encrypted and never shared. We curate,
                  we don't store.
                </p>
              </Motion.div>

              
            </div>
          </section>*/}

      {/* Footer */}
      <Footer />
      {/* </>
      )} */}
    </div>
  );
}

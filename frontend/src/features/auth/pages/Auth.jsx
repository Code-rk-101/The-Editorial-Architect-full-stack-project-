import { Link, useNavigate } from "react-router";
import React, { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";

export default function Auth () 
{

  const [isLogin, setIsLogin] = useState(true);
  const {handleLogin , handleRegister} = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const signinEmailRef = useRef();
  const signinPasswordRef = useRef();
  const userNameRef = useRef();

  // Design System Tokens derived from DESIGN.md
  const theme = {
    surface: "bg-[#f9f9fb]",
    surfaceContainerLow: "bg-[#f2f4f6]",
    surfaceContainerLowest: "bg-[#ffffff]",
    onSurface: "text-[#2e3336]",
    primaryFixed: "#c6d7fe",
    secondaryFixed: "#ebdcff",
    ambientShadow: "shadow-[0_20px_40px_-10px_rgba(78,95,128,0.06)]",
  };

  // Framer Motion Variants for smooth transitions
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const formStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const handleOnSubmit = async (e)=>
  {
    e.preventDefault();


    if(isLogin)
    {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const response = await handleLogin({ email, password });
      
      if (response===null) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        navigate('/');
      }
    }
    else 
    {
      const signinEmail = signinEmailRef.current.value;
      const signinPassword = signinPasswordRef.current.value;
      const username = userNameRef.current.value;
      
      const response = await handleRegister({username,email:signinEmail,password:signinPassword});
      if (response===null) {
        signinEmailRef.current.value = "";
        signinPasswordRef.current.value = "";
        userNameRef.current.value = "";
        navigate('/');
      }
    }
  }
    
  return (
    <div className={`min-h-screen ${theme.surface} ${theme.onSurface} font-sans flex relative overflow-hidden selection:bg-[#c6d7fe] selection:text-[#2e3336]`}>
      
      {/* --- Background: The "Aura" Gradient & Asymmetry --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Motion.div 
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[80%] rounded-full blur-[120px] opacity-40"
          style={{ background: `linear-gradient(135deg, ${theme.primaryFixed}, ${theme.secondaryFixed})` }}
        />
        <Motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] right-[5%] w-[50%] h-[60%] rounded-full blur-[100px] opacity-30"
          style={{ background: `linear-gradient(135deg, ${theme.secondaryFixed}, transparent)` }}
        />
      </div>

      {/* --- Layout Container: The Offset Principle --- */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 relative z-10 min-h-screen">
        
        {/* Left Side: Editorial Typography & Whitespace */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center mb-12 lg:mb-0 lg:pr-12">
          {/* <a href="/" className="inline-flex items-center gap-2 text-sm text-[#2e3336]/60 hover:text-[#2e3336] transition-colors mb-16 lg:mb-32">
            <FiArrowLeft /> Return to Publication
          </a> */}
          
          <h1 className="font-serif text-3xl lg:text-5xl font-normal leading-tight tracking-[-0.02em] mb-8">
            The Editorial <br />
            <span className="italic text-[#8faaf7]">Architect.</span>
          </h1>
          
          <div className="border-l-2 border-[#c6d7fe] pl-6 py-2">
            <p className="font-serif text-lg lg:text-xl italic text-[#2e3336]/80 leading-relaxed">
              "Curating professional identity through the lens of soft minimalism. Your next chapter begins here."
            </p>
          </div>
        </div>

        {/* Right Side: The Authentication "Card" */}
        {/* Rule: No 1px lines. Use tonal shift and ambient shadow. Radius 'xl'. */}
        <div className="w-full lg:w-6/12 xl:w-5/12 ease-in-out">
          <div className={`${theme.surfaceContainerLowest} rounded-xl p-8 lg:p-14 ${theme.ambientShadow} relative overflow-hidden ease-in-out`}>
            
            <AnimatePresence mode="wait" >
              {isLogin ? (
                // ------------------ LOGIN FORM ------------------
                <Motion.div 
                  key="login"
                  variants={formStagger}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <Motion.div variants={fadeUp} className="mb-10">
                    <h2 className="font-serif text-3xl tracking-[-0.02em] mb-2">Resume the narrative.</h2>
                    <p className="text-sm text-[#2e3336]/60">Access your curated professional portfolio.</p>
                  </Motion.div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {/* Standard Input: Bottom-border only, 40% opacity bg */}
                    <Motion.div variants={fadeUp}>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2e3336]/70 mb-2">Email</label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e3336]/40" />
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          className="w-full bg-[#f2f4f6]/40 border-b-2 border-[#e2e8f0] rounded-t-md py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#c6d7fe] transition-colors"
                          ref={emailRef}
                        />
                      </div>
                    </Motion.div>

                    <Motion.div variants={fadeUp}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#2e3336]/70">Password</label>
                        <a href="#" className="text-xs font-semibold text-[#8faaf7] hover:text-[#2e3336] transition-colors">Forgot?</a>
                      </div>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e3336]/40" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-[#f2f4f6]/40 border-b-2 border-[#e2e8f0] rounded-t-md py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#c6d7fe] transition-colors"
                          ref={passwordRef}
                        />
                      </div>
                    </Motion.div>

                    <Motion.div variants={fadeUp} className="pt-4">
                      {/* Primary Button: Aura Gradient, radius 'md' */}
                      <button className="w-full bg-linear-to-br from-[#c6d7fe] to-[#ebdcff] text-[#2e3336] rounded-md py-3.5 text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
                      onClick={handleOnSubmit}>
                        Log In
                      </button>
                    </Motion.div>
                  </form>
                </Motion.div>
              ) : (
                // ------------------ SIGN UP FORM ------------------
                <Motion.div 
                  key="signup"
                  variants={formStagger}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <Motion.div variants={fadeUp} className="mb-10">
                    <h2 className="font-serif text-3xl tracking-[-0.02em] mb-2">Draft your story.</h2>
                    <p className="text-sm text-[#2e3336]/60">Join the atelier and refine your professional identity.</p>
                  </Motion.div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <Motion.div variants={fadeUp}>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2e3336]/70 mb-2">Full Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e3336]/40" />
                        <input
                          type="text"
                          // value={''}
                          placeholder="Name"
                          className="w-full bg-[#f2f4f6]/40 border-b-2 border-[#e2e8f0] rounded-t-md py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#c6d7fe] transition-colors"
                          ref={userNameRef}
                        />
                      </div>
                    </Motion.div>

                    <Motion.div variants={fadeUp}>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2e3336]/70 mb-2">Email</label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e3336]/40" />
                        <input
                          type="email"
                          placeholder="name@gmail.com"
                          className="w-full bg-[#f2f4f6]/40 border-b-2 border-[#e2e8f0] rounded-t-md py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#c6d7fe] transition-colors"
                          ref={signinEmailRef}
                        />
                      </div>
                    </Motion.div>

                    <Motion.div variants={fadeUp}>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2e3336]/70 mb-2">Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e3336]/40" />
                        <input
                          type="password"
                          placeholder="Create a strong password"
                          className="w-full bg-[#f2f4f6]/40 border-b-2 border-[#e2e8f0] rounded-t-md py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#c6d7fe] transition-colors"
                          ref={signinPasswordRef}
                        />
                      </div>
                    </Motion.div>

                    <Motion.div variants={fadeUp} className="pt-4">
                      {/* Primary Button: Aura Gradient, radius 'md' */}
                      <button className="w-full bg-linear-to-br from-[#c6d7fe] to-[#ebdcff] text-[#2e3336] rounded-md py-3.5 text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
                      onClick={handleOnSubmit}>
                        Create Profile
                      </button>
                    </Motion.div>
                  </form>
                </Motion.div>
              )}
            </AnimatePresence>

            {/* --- Shared Footer (Social & Toggle) --- */}
            <Motion.div variants={fadeUp} className="mt-8">
              {/* <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-[#f2f4f6] flex-1" />
                <span className="text-[10px] text-[#2e3336]/40 font-bold uppercase tracking-widest">Or continue with</span>
                <div className="h-px bg-[#f2f4f6] flex-1" />
              </div> */}

              {/* Secondary Buttons: Ghost style, surface_container_low bg, no borders */}
              {/* <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button className={`flex-1 flex items-center justify-center gap-2 ${theme.surfaceContainerLow} hover:bg-[#e2e8f0] rounded-md py-3 text-sm font-semibold transition-colors`}>
                  <FcGoogle className="text-lg" /> Google
                </button>
                <button className={`flex-1 flex items-center justify-center gap-2 ${theme.surfaceContainerLow} hover:bg-[#e2e8f0] rounded-md py-3 text-sm font-semibold transition-colors`}>
                  <FaLinkedinIn className="text-lg text-[#0A66C2]" /> LinkedIn
                </button>
              </div> */}

              <div className="text-center">
                <p className="text-sm text-[#2e3336]/60">
                  {isLogin ? "Don't have an account? " : "Already curated a profile? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-bold text-[#2e3336] hover:text-[#8faaf7] transition-colors ml-1"
                  >
                    {isLogin ? "Sign In." : "Log In."}
                  </button>
                </p>
              </div>
            </Motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
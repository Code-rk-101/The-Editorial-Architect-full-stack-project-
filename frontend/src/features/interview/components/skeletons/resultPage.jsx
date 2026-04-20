import React from "react";
import NavBar from "../nav";
import Footer from "../footer";

export default function ResultPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] text-slate-800 font-sans">
      {/* Top Navigation - Assumed to load independently or stay static */}
      <NavBar />

      {/* Main Container */}
      <div className="max-w-full mx-auto flex flex-col md:flex-row pt-8 px-4 md:px-8 mb-5 gap-5 relative animate-pulse">
        
        {/* Right Sidebar (Analytics & Advice Skeleton) -> order-1 on mobile, order-3 on desktop */}
        <aside className="w-full md:w-[20%] md:min-w-60 shrink flex flex-col gap-6 order-1 md:order-3">
          <div className="flex flex-col sm:flex-row md:flex-col gap-6">
            
            {/* Match Precision Card Skeleton */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="w-24 h-4 bg-slate-200 rounded mb-6"></div>
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-40 h-40 bg-slate-100 rounded-full flex flex-col items-center justify-center border-8 border-slate-200">
                  <div className="w-16 h-8 bg-slate-200 rounded mb-2"></div>
                  <div className="w-12 h-3 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Skill Gap Analysis Card Skeleton */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="w-32 h-4 bg-slate-200 rounded mb-6"></div>
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-full">
                    <div className="flex justify-between items-end mb-2">
                      <div className="w-20 h-3 bg-slate-200 rounded"></div>
                      <div className="w-10 h-3 bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-200 w-2/3 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editorial Advice Card Skeleton */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-slate-200 rounded-md"></div>
              <div className="w-24 h-4 bg-slate-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-200 rounded"></div>
              <div className="w-5/6 h-3 bg-slate-200 rounded"></div>
              <div className="w-4/6 h-3 bg-slate-200 rounded"></div>
            </div>
          </div>
        </aside>

        {/* Left Sidebar (Navigation Skeleton) -> order-2 on mobile, order-1 on desktop */}
        <aside className="w-full md:w-45 shrink-0 flex md:flex-col flex-row justify-between h-auto md:h-100% order-2 md:order-1">
          <div className="flex-1 min-w-0">
            {/* Header Skeleton */}
            <div className="hidden md:block mb-6">
              <div className="w-32 h-4 bg-slate-200 rounded mb-2"></div>
              <div className="w-24 h-3 bg-slate-200 rounded ml-6"></div>
            </div>

            {/* Nav Links Skeleton */}
            <nav className="flex flex-row md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="min-w-35 md:min-w-0 h-12 bg-slate-200/70 rounded-lg flex items-center px-3 gap-3"
                >
                  <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                  <div className="w-20 h-3 bg-slate-300 rounded"></div>
                </div>
              ))}
              {/* Mobile Export Button Skeleton */}
              <div className="md:hidden min-w-30 h-12 bg-slate-200/50 rounded-lg"></div>
            </nav>
          </div>

          {/* Desktop Export Button Skeleton */}
          <div className="hidden md:block pb-4 md:pb-0 mt-4">
             <div className="w-32 h-10 bg-slate-200/50 rounded-lg"></div>
          </div>
        </aside>

        {/* Main Content Area Skeleton (Replaces Outlet) -> order-3 on mobile, order-2 on desktop */}
        <main className="flex-1 min-h-0 w-full max-w-full order-3 md:order-2">
          <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-150">
             {/* Header of main content */}
             <div className="w-1/3 h-6 bg-slate-200 rounded mb-6"></div>
             {/* Paragraphs/Cards inside main content */}
             <div className="space-y-4">
               <div className="w-full h-24 bg-slate-100 rounded-xl"></div>
               <div className="w-full h-24 bg-slate-100 rounded-xl"></div>
               <div className="w-full h-24 bg-slate-100 rounded-xl"></div>
             </div>
          </div>
        </main>
        
      </div>
      <Footer />
    </div>
  );
}
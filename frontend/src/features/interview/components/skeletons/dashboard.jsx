import React from "react";
import NavBar from "../nav";
import Footer from "../footer";

export function ReportBarSkeleton() {
  return (
    <div className=" bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center gap-5 animate-pulse">
      {/* Score Circle Skeleton */}
      <div className="w-16 h-16 rounded-full bg-slate-200 shrink-0 border-4 border-slate-100"></div>

      {/* Title & Meta Details Skeleton */}
      <div className="flex-1 min-w-0 py-1 space-y-3">
        <div className="w-3/4 sm:w-1/2 h-5 bg-slate-200 rounded"></div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="w-20 h-3 bg-slate-100 rounded"></div>
          <div className="w-20 h-3 bg-slate-100 rounded"></div>
        </div>
      </div>

      {/* Action Buttons Skeleton (Follows same responsive visibility) */}
      <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <div className="w-20 h-9 bg-slate-100 rounded-lg hidden sm:block"></div>
        <div className="w-9 h-9 bg-slate-100 rounded-lg hidden sm:block"></div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] text-[#1A1A2E] font-sans">
      {/* Top Navigation */}
      <NavBar />

      <main className="flex-1 max-w-300 w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        
        {/* Hero Profile Banner Skeleton */}
        <div className="bg-white/60 rounded-2xl p-8 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 w-full animate-pulse shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-slate-200 border-4 border-white shadow-sm"></div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-48 h-8 bg-slate-200 rounded-md"></div>
                <div className="w-4 h-4 bg-slate-200 rounded-sm"></div>
              </div>
              <div className="w-32 h-5 bg-slate-200 rounded mx-auto md:mx-0"></div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="w-36 h-4 bg-slate-200 rounded"></div>
                <div className="w-24 h-4 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Stats Boxes */}
          <div className="flex gap-4">
            <div className="bg-slate-50 px-6 py-4 rounded-xl border border-white flex flex-col items-center justify-center min-w-30">
              <div className="w-10 h-8 bg-slate-200 rounded mb-2"></div>
              <div className="w-16 h-2 bg-slate-200 rounded"></div>
            </div>
            <div className="bg-slate-50 px-6 py-4 rounded-xl border border-white flex flex-col items-center justify-center min-w-30">
              <div className="w-14 h-8 bg-slate-200 rounded mb-2"></div>
              <div className="w-16 h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          
          {/* Left Sidebar Skeleton */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 md:h-80 md:w-full animate-pulse">
              <div className="w-12 h-6 bg-slate-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="w-full h-3.5 bg-slate-100 rounded"></div>
                <div className="w-11/12 h-3.5 bg-slate-100 rounded"></div>
                <div className="w-full h-3.5 bg-slate-100 rounded"></div>
                <div className="w-4/5 h-3.5 bg-slate-100 rounded"></div>
                <div className="w-5/6 h-3.5 bg-slate-100 rounded"></div>
                <div className="w-full h-3.5 bg-slate-100 rounded"></div>
              </div>
            </div>
          </aside>

          {/* Main Content (Recent Reports) Skeleton */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6 animate-pulse">
              <div className="w-40 h-8 bg-slate-200 rounded"></div>
              <div className="w-24 h-4 bg-slate-200 rounded"></div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <ReportBarSkeleton key={i} />
              ))}
            </div>
          </section>
          
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
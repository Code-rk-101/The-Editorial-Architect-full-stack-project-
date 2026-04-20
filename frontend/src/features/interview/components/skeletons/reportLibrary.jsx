import React from 'react';
import NavBar from '../nav';
import Footer from '../footer';

export default function ReportsLibrarySkeleton() {
  // Array to map out a few mock report bars for the loading state
  const skeletonItems = [1, 2, 3, 4];

  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] flex flex-col">
      {/* Assuming NavBar handles its own rendering or is static */}
      <NavBar />

      <main className="flex-1 max-w-250 w-full mx-auto px-4 md:px-8 py-10 flex flex-col mb-0 animate-pulse">
        
        {/* Page Header & Tabs Skeleton */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Title Skeleton */}
            <div className="h-9 w-48 bg-slate-200 rounded-md mb-3"></div>
            {/* Subtitle Skeleton */}
            <div className="h-4 w-72 bg-slate-200 rounded-md"></div>
          </div>

          {/* Tabs Skeleton */}
          <div className="h-11 w-56 bg-slate-200 rounded-xl"></div>
        </div>

        {/* Toolbar (Search & Filter) Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
          {/* Search Input Skeleton */}
          <div className="flex-1 h-[46px] bg-white rounded-xl border border-slate-200 shadow-sm flex items-center px-4">
             <div className="h-5 w-5 bg-slate-200 rounded-full mr-3"></div>
             <div className="h-4 w-1/3 bg-slate-200 rounded-md"></div>
          </div>
          
          {/* Filter Button Skeleton */}
          <div className="flex gap-3">
            <div className="h-[46px] w-24 bg-white rounded-xl border border-slate-200 shadow-sm"></div>
          </div>
        </div>

        {/* Reports List Skeleton */}
        <div className="flex-1 w-full space-y-5">
          {skeletonItems.map((item) => (
            <div 
              key={item} 
              className="w-full h-24 bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* Icon/Avatar Placeholder */}
                <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                <div className="space-y-2">
                   {/* Report Title Placeholder */}
                  <div className="h-5 w-40 sm:w-64 bg-slate-200 rounded-md"></div>
                   {/* Report Subtext Placeholder */}
                  <div className="h-3 w-24 sm:w-32 bg-slate-200 rounded-md"></div>
                </div>
              </div>
              
              {/* Right Side Action/Date Placeholder */}
              <div className="hidden sm:block h-8 w-24 bg-slate-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
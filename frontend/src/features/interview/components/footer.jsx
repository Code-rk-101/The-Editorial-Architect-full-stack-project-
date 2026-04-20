import { useAuth } from "../../auth/hooks/useAuth";



function FooterSkeleton() {
  return (
    <footer className="bg-[#F8F9FB] border-t border-gray-200 py-10 animate-pulse">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Name Skeleton */}
        <div className="h-6 w-48 bg-slate-200 rounded-md"></div>
        
        {/* Links Skeleton */}
        <div className="flex gap-6">
          <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
          <div className="h-4 w-28 bg-slate-200 rounded-md"></div>
          <div className="h-4 w-16 bg-slate-200 rounded-md"></div>
        </div>
        
        {/* Copyright Skeleton */}
        <div className="h-3 w-64 sm:w-80 bg-slate-200 rounded-md"></div>
        
      </div>
    </footer>
  );
}

export default function Footer ()
{
  const {loading} = useAuth();
    return loading ?(
        <FooterSkeleton/>
    ):(
        <footer className="bg-[#F8F9FB] border-t border-gray-200 py-10 ">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="font-serif font-semibold text-lg text-[#1A1A2E]">
                The Editorial Architect
              </div>
              <div className="flex gap-6 text-sm text-gray-500">
                <a
                  href="#"
                  className="hover:text-[#1A1A2E] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-[#1A1A2E] transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-[#1A1A2E] transition-colors"
                >
                  Contact
                </a>
              </div>
              <div className="text-xs text-gray-400">
                © 2026 The Editorial Architect. Crafted for Professional Identity.
              </div>
            </div>
        </footer>
    )
}
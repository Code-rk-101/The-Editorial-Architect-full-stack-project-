import { motion as Motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router";
import { FaUser, FaBars, FaXmark } from "react-icons/fa6";
import { useAuth } from "../../auth/hooks/useAuth";
import { UseInterview } from "../hooks/useInterview";
import { useState, useRef, useEffect } from "react";

const NavLink = ({ to, onClick, children, isActive, mobile }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`group relative text-sm font-medium transition-all duration-300 ${
      mobile
        ? `block w-full px-5 py-3.5 rounded-xl ${
            isActive
              ? "bg-[#DCE4FF]/40 text-[#1A1A2E] shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`
        : `px-1 ${isActive ? "text-[#1A1A2E]" : "text-slate-500 hover:text-[#1A1A2E]"}`
    }`}
  >
    {children}
    {!mobile && (
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-[#1A1A2E] transition-all duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    )}
  </Link>
);

const NavBarSkeleton = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#F8F9FB]/90 backdrop-blur-md">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 w-full mx-auto">
        {/* Mobile Toggle & Brand Skeleton */}
        <div className="flex items-center gap-4 flex-1">
          <div className="md:hidden h-6 w-6 bg-slate-200/60 rounded animate-pulse"></div>
          <div className="h-6 w-48 bg-slate-200/60 rounded-md animate-pulse"></div>
        </div>

        {/* Desktop Links Skeleton */}
        <div className="hidden md:flex items-center gap-8 justify-center w-full mr-[13%]">
          <div className="h-4 w-12 bg-slate-200/60 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-slate-200/60 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-slate-200/60 rounded animate-pulse"></div>
        </div>

        {/* Avatar Skeleton */}
        <div className="flex justify-end flex-1">
          <div className="h-10 w-10 bg-slate-200/60 rounded-full animate-pulse"></div>
        </div>
      </nav>
      {/* Subtle border to separate from content below */}
      <div className="h-px w-full bg-slate-100 absolute bottom-0 left-0"></div>
    </div>
  );
};

export default function NavBar() {
  const { user, loading, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = async () => {
    setIsProfileOpen(false);
    await handleLogout();
    navigate("/auth");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    ...(user
      ? [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Reports", path: "/allReports" },
        ]
      : []),
  ];

  return loading ? (
    <NavBarSkeleton />
  ) : (
    <>
      {/* Sticky Wrapper ensures mobile dropdown flows nicely under it */}
      <header className="sticky top-0 z-50 w-full">
        <div className="absolute inset-0 bg-[#F8F9FB]/90 backdrop-blur-md border-b border-slate-100 z-20"></div>
        
        <nav className="relative flex items-center justify-between px-6 py-4 md:px-12 w-full mx-auto z-30">
          {/* 1. Left Section: Brand & Mobile Toggle */}
          <div className="flex items-center gap-4 flex-1">
            <button
              className="md:hidden text-[#1A1A2E] hover:text-slate-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
            </button>
            <div className="font-serif text-lg md:text-2xl font-semibold tracking-tight text-[#1A1A2E] whitespace-nowrap">
              The Editorial Architect
            </div>
          </div>

          {/* 2. Center Section: Desktop Links */}
          <div className="hidden md:flex items-center gap-8 justify-center w-full mr-[13%]">
            {menuItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <NavLink key={item.name} to={item.path} isActive={isActive}>
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* 3. Right Section: User Actions */}
          <div className="flex justify-end flex-1">
            {!user ? (
              <Motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#DCE4FF] text-[#1A1A2E] px-6 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-[#c8d4ff]"
                onClick={() => navigate("/auth")}
              >
                LOGIN
              </Motion.button>
            ) : (
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer"
                ref={dropdownRef}
              >
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#DCE4FF] text-[#1A1A2E] rounded-full p-1 shadow-sm border border-[#DCE4FF]/50"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  {user.profilePicture ? (

                  <div className="size-10 h-10 w-10 rounded-full overflow-hidden">

                    <img

                      src={`${user.profilePicture}`

                      }

                      alt="Profile"

                      className="object-cover"

                      size={18}

                    />

                  </div>

                  ):(

                    <div className="size-10 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center">

                      <FaUser size={18} />

                    </div>

                  )

                }
                </Motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <Motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/30">
                        <p className="text-sm font-semibold text-[#1A1A2E] truncate">
                          {user.displayName || user.name?.split(" ")[0] || "User"}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogoutClick}
                          className="w-full text-left px-3 py-2.5 text-sm text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </nav>

        {/* 4. Mobile Dropdown Menu (Slide from top) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Subtle backdrop */}
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 top-18 bg-[#1A1A2E]/5 backdrop-blur-[2px] z-10 md:hidden"
              />
              
              {/* Sliding Dropdown Panel */}
              <Motion.div
                initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-0 w-full bg-[#F8F9FB] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-b border-slate-200/60 rounded-b-3xl z-20 md:hidden origin-top"
              >
                <div className="p-4 flex flex-col gap-1.5 pb-6">
                  {menuItems.map((item) => {
                    const isActive =
                      item.path === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(item.path);
                    return (
                      <NavLink
                        key={item.name}
                        mobile
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        isActive={isActive}
                      >
                        {item.name}
                      </NavLink>
                    );
                  })}
                </div>
              </Motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
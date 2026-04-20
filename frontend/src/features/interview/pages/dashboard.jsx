import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiBell,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiTrendingUp,
  FiAward,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiX,
  FiCamera,
  FiUser,
  FiDelete,
} from "react-icons/fi";
import NavBar from "../components/nav";
import { UseInterview } from "../hooks/useInterview";
import Footer from "../components/footer";
import ReportBar from "../components/reportBar";
import { useAuth } from "../../auth/hooks/useAuth";
import { Link } from "react-router"; // Note: React Router v6 usually imports from 'react-router-dom'


// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Dashboard() {
  const { getAllInterview, reports, avgScore } =
    UseInterview();
  const { user, handleUpdateProfile } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getAllInterview();
  }, []);

  // Pre-fill form when modal opens or user changes
  useEffect(() => {
    if (isEditModalOpen && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        location: user.location || "",
        bio: user.bio || "",
        profilePic: user.profilePicture || null,
        profilePicFile: null, // to keep track of the actual file
      });
    }
  }, [isEditModalOpen, user]);

  // Handle Input Changes in the Modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bio" && value.length > 500) {
      return; // Prevent typing more than 500 characters
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result,
          profilePicFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Image Removal
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profilePic: null,
      profilePicFile: null,
    }));
  };

  // Handle Form Submission
  const handleProfileSave = (e) => {
    e.preventDefault();
    const updatedProfile = new FormData();
    updatedProfile.append("username", formData.name);
    updatedProfile.append("email", formData.email);
    updatedProfile.append("role", formData.role);
    updatedProfile.append("location", formData.location);
    updatedProfile.append("bio", formData.bio);
    
    if (formData.profilePicFile) {
      updatedProfile.append("profilePicture", formData.profilePicFile);
    }
    
    // If the image was deleted (null), notify backend
    if (!formData.profilePic) {
      updatedProfile.append("removeProfilePicture", "true");
    }

    handleUpdateProfile({ formData: updatedProfile });
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A1A2E] font-sans">
      {/* Top Navigation */}
      <NavBar />

      <main className="flex-1 max-w-300 w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        {/* Hero Profile Banner */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 
          border border-indigo-50 flex flex-col md:flex-row items-center justify-between gap-8 w-full"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-sm border-4 border-white">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="text-gray-400 w-8 h-8" />
                  </div>
                )}
              </div>
              {user.profilePicture && (
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                  <button 
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setFormData(prev => ({ ...prev, profilePic: null, profilePicFile: null }));
                    }}
                    className="bg-red-500 hover:bg-red-600 transition-colors text-white p-1.5 rounded-full cursor-pointer"
                    title="Remove Photo"
                  >
                    <FiDelete className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-1">
                <h1 className="text-3xl font-serif font-bold text-slate-900">
                  {user?.name
                    ? user.name.toString().toUpperCase()
                    : 'USERNAME'}
                </h1>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
                  title="Edit Profile"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-lg text-indigo-900/80 mb-4">{user.role}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <FiMail className="text-slate-400" /> {user?.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="text-slate-400" /> {user.location}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-white flex flex-col items-center justify-center min-w-30">
              <span className="text-3xl font-bold text-slate-800">
                {reports?.length || 0}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Analyses
              </span>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-white flex flex-col items-center justify-center min-w-30">
              <span className="text-3xl font-bold text-slate-800">
                {avgScore || 0}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Avg. Match
              </span>
            </div>
          </div>
        </Motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            {/* Career Trajectory / Bio */}
            <Motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 md:h-80 md:w-full"
            >
              <h3 className="font-serif font-bold text-lg mb-6">Bio</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start wrap-break-word overflow-hidden">
                  <div className="min-w-0 w-full">
                    <p className="text-sm text-slate-800 wrap-break-word whitespace-pre-wrap">
                      {user.bio}
                    </p>
                  </div>
                </div>
              </div>
            </Motion.div>

            {/* Top Keywords */}
            {/* <Motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="bg-slate-50/80 border border-slate-200 border-dashed rounded-xl p-6"
            >
              <h3 className="font-serif font-bold text-lg mb-4">
                Top Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </Motion.div> */}
          </aside>

          {/* Main Content (Recent Reports) */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-2xl text-slate-800">
                Recent Reports
              </h3>
              <Link
                to={"/allReports"}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View All Reports
              </Link>
            </div>

            <Motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {reports?.slice(0, 3).map((report) => (
                <ReportBar
                  key={report._id}
                  report={report}
                  itemVariants={itemVariants}
                />
              ))}
            </Motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* --- EDIT PROFILE MODAL --- */}

      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl shrink-0">
                <h2 className="text-lg font-serif font-bold text-slate-800">
                  Edit Profile Info
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 rounded-full p-1.5 transition-all"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form (Scrollable for smaller devices) */}
              <form
                onSubmit={handleProfileSave}
                className="p-6 space-y-6 overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {/* Profile Picture Upload Section */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pb-2">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full bg-indigo-50 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                      {formData.profilePic ? (
                        <img
                          src={formData.profilePic}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-indigo-400 text-2xl font-medium">
                          {formData.name
                            ? formData.name.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 text-white rounded-full shadow-md cursor-pointer hover:bg-indigo-700 transition-colors">
                      <FiCamera className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <div className="text-center sm:text-left flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-slate-800">
                      Profile Picture
                    </h3>
                    {(formData.profilePic || formData.profilePicFile) && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors w-fit mx-auto sm:mx-0"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 focus:outline-none transition-all"
                      placeholder="e.g. Alex Johnson"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      disabled
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 focus:outline-none transition-all"
                      placeholder="e.g. alex@example.com"
                    />
                  </div>

                  {/* Role Field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Current Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 focus:outline-none transition-all"
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>

                  {/* Location Field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 focus:outline-none transition-all"
                      placeholder="e.g. New York, NY"
                    />
                  </div>

                  {/* Bio Field */}
                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-end mb-1.5">
                      <label className="block text-sm font-medium text-slate-700">
                        Bio / Highlight
                      </label>
                      <span className="text-xs text-slate-400">
                        {formData.bio ? formData.bio.length : 0}/500 characters
                      </span>
                    </div>
                    <textarea
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 focus:outline-none transition-all resize-none"
                      placeholder="Tell us a little about your career trajectory..."
                    ></textarea>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100 mt-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

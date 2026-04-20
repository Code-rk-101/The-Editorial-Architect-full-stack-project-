import { useContext } from "react";
import toast from "react-hot-toast";
import {
  getAllInterviewReport,
  getInterviewReportById,
  generateIntervieewReport,
  deleteInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";
import InterviewContext from "../interview.context";
// import { set } from "mongoose";

export const UseInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("UseInterview must be used within InterviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    avgScore,
    setAvgScore,
  } = context;

  // To this:
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    const toastId = toast.loading(
      "Analyzing resume with AI... this may take a moment.",
    );

    try {
      const response = await generateIntervieewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      toast.success("Interview report generated successfully!", {
        id: toastId,
      });
      return response.interviewReport._id;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.errors?.resumeFile?.[0] ||
        error?.message ||
        "Failed to generate report";
      toast.error(errorMessage, { id: toastId, duration: 5000 });
      throw error; // Rethrow so the caller (Auth form/page) can show a message or handle it
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to fetch report from database");
    } finally {
      setLoading(false);
    }
  };

  const getAllInterview = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReport();

      const formattedReports = response.allInterviewReports
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((rep) => {
          const dateObj = new Date(rep.createdAt);
          return {
            ...rep,
            date: dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            time: dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

      let totalScore = 0;
      formattedReports.forEach((report) => {
        totalScore += report.matchScore || 0;
      });

      let scorePercent =
        formattedReports.length > 0 ? totalScore / formattedReports.length : 0;
      scorePercent = Math.round(scorePercent * 100) / 100; // Round to 2 decimal places
      setAvgScore(scorePercent);
      setReports(formattedReports);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const removeInterviewReportById = async (interviewId) => {
    const toastId = toast.loading("Deleting report...");
    try {
      await deleteInterviewReportById(interviewId);
      setReports((prevReports) =>
        prevReports.filter((report) => report._id !== interviewId),
      );
      toast.success("Report deleted", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to delete report", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const getResumePdf = async (interviewId) => {
    setLoading(true);
    const toastId = toast.loading("Generating customized PDF...");
    let response = null;
    try {
      response = await generateResumePdf(interviewId);
      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-${interviewId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Resume downloaded successfully!", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to generate resume pdf", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    report,
    reports,
    avgScore,
    getAllInterview,
    getReportById,
    generateReport,
    removeInterviewReportById,
    getResumePdf,
  };
};

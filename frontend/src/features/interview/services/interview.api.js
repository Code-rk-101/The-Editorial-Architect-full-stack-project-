import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

export const generateIntervieewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview", formData, {
      headers: {
        "Content-Type": "Multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error.response?.data || error;
  }
};

export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);

  return response.data;
};

export const getAllInterviewReport = async () => {
  const response = await api.get(`/api/interview/all`);

  return response.data;
};

export const deleteInterviewReportById = async (interviewId) => {
  try {
    const response = await api.delete(
      `/api/interview/deleteReport/${interviewId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error.response?.data || error;
  }
};

export const generateResumePdf = async (interviewReportId) => {
  try {
    const response = await api.get(
      `/api/interview/resume/pdf/${interviewReportId}`,
      {
        responseType: "blob",
      },
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error.response?.data || error;
  }
};

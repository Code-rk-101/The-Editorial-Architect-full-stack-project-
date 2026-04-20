import { createContext, useState } from "react";

const InterviewContext = createContext();
export default InterviewContext;

export const InterviewContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState();
  const [reports, setReports] = useState([]);

  const [avgScore,setAvgScore] = useState(0);
  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
        avgScore,
        setAvgScore,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

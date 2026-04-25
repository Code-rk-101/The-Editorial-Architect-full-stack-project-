const { PDFParse } = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.services");
const generateResumePdf = require("../services/pdf.service");
const interviewReportModel = require("../models/interviewReport.model");
const { body, validationResult } = require("express-validator");
const { eo } = require("zod/v4/locales");

const generateInterviewReportController = [
  body("jobDescription")
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 20 })
    .withMessage("Job description must be at least 20 characters long")
    .isLength({ max: 2000 })
    .withMessage("Job description must be less than 2000 characters long"),
  body("selfDescription")
    .notEmpty()
    .withMessage("Self description is required")
    .isLength({ min: 20 })
    .withMessage("Self description must be at least 20 characters long")
    .isLength({ max: 2000 })
    .withMessage("Self description must be less than 2000 characters long"),
  body("resumeFile").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Resume file is required");
    }
    return true;
  }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().reduce((acc, error) => {
            if (!acc[error.path]) {
              acc[error.path] = [];
            }
            acc[error.path].push(error.msg);
            return acc;
          }, {}),
        });
      }

      const resumeFile = req.file;
      const resumeContent = await new PDFParse(
        new Uint8Array(resumeFile.buffer),
      ).getText();
      const { selfDescription, jobDescription } = req.body;

      const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
      });

      const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription: selfDescription,
        jobDescription: jobDescription,
        ...interviewReportByAi,
      });

      res.status(201).json({
        message: "Interview report ",
        interviewReport,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Internal server error during report generation.",
          error: error.message,
        });
    }
  },
];

const getInterviewReportById = async (req, res, next) => {
  try {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Failed to fetch interview report.",
        error: error.message,
      });
  }
};

const getAllInterview = async (req, res, next) => {
  try {
    const allInterviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .select(
        " -resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );

    res.status(200).json({
      message: "Interview reports fetched successfully",
      allInterviewReports,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Failed to fetch interview reports.",
        error: error.message,
      });
  }
};

const deleteInterviewReportById = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findByIdAndDelete({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        errors: "Interview report not found",
      });
    }

    res.status(200).json({
      message: "Interview report deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Failed to delete interview report.",
        error: error.message,
      });
  }
};

const getResumePdf = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findById(interviewId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview Report not found",
      });
    }

    const { resume, selfDescription, jobDescription } = interviewReport;

    const pdf = await generateResumePdf({
      resume,
      selfDescription,
      jobDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`,
    });
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to generate PDF.", error: error.message });
  }
};

module.exports = {
  generateInterviewReportController,
  getInterviewReportById,
  getAllInterview,
  deleteInterviewReportById,
  getResumePdf,
};

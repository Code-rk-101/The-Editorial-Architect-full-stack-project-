const express = require('express');
const interviewRouter = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const {upload} = require('../middleware/file.middleware');

interviewRouter.post('/',authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController);

interviewRouter.get('/report/:interviewId',authMiddleware.authUser,
interviewController.getInterviewReportById);

interviewRouter.get('/all',authMiddleware.authUser,
interviewController.getAllInterview);

interviewRouter.delete('/deleteReport/:interviewId',authMiddleware.authUser,
interviewController.deleteInterviewReportById);

interviewRouter.get('/resume/pdf/:interviewId',authMiddleware.authUser,interviewController.getResumePdf);

module.exports = interviewRouter;
const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema(
    {
        question:
        {
            type:String,
            required:[true,'Technical question is required']
        },
        intention:
        {
            type:String,
            required:[true,'Intention is required']
        },
        answer:
        {
            type:String,
            required:[true,'Answer is required']
        }
    },
    {_id:false}
);

const behavioralQuestionSchema = new mongoose.Schema(
    {
        question:
        {
            type:String,
            required:[true,'Technical question is required']
        },
        intention:
        {
            type:String,
            required:[true,'Intention is required']
        },
        answer:
        {
            type:String,
            required:[true,'Answer is required']
        }
    },
    {_id:false}
);

const skillSchema = new mongoose.Schema(
    {
        skill:
        {
            type:String,
            required:[true,'Skill is required']
        },
        severity:
        {
            type:String,
            enum:['low','medium','high'],
            required:[true,'Severity is required']
        },
        level:
        {
            type:Number,
            min:0,
            max:100,
            required:[true,'Level is required']
        }
    },
    {_id:false}
);

const preprationPlanSchema = new mongoose.Schema(
    {
        day:
        {
            type:Number,
            required:[true,'Day is required']
        },
        focus:
        {
            type:String,
            required:[true,'Focus is required']
        },
        task:[{
            type:String,
            required:[true,'Task is required']
        }]
    },
    {_id:false}
);


const interviewReportSchema = new mongoose.Schema(
    {
        jobDescription:
        {
            type:String,
            required:[true,'Job description is required'],
        },
        resume:
        {
            type:String
        },
        selfDescription:
        {
            type:String,
        },
        matchScore:
        {
            type:Number,
            min:0,
            max:100,
        },
        technicalQuestions:[ technicalQuestionSchema],
        behavioralQuestions:[
            behavioralQuestionSchema
        ],
        skillGaps: [ skillSchema],
        preparationPlan:[preprationPlanSchema],
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        title:
        {
            type:String,
            required:[true,'job titile is required']
        }
    },
    {timestamps:true}
);

const interviewReportModel = mongoose.model('InterviewReport',interviewReportSchema);

module.exports = interviewReportModel;
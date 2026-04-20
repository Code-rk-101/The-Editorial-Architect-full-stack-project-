const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true,
        },

        email:
        {
            type:String,
            unique:[true,'Account already exists with this email address'],
            required: true,
        },

        password:
        {
            type:String,
            required: true,
        },
        profilePicture:
        {
            type:String,
            default:null,
        },
        role:
        {
            type:String,
            default:'user',
        },
        location:
        {
            type:String,
            default:null,
        },
        bio:
        {
            type:String,
            default:null,
        },
    }
);

const userModel = mongoose.model('users',userSchema);

module.exports = userModel
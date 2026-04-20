const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

async function authUser(req,res,next)
{
    const token = req.cookies.token;

    if(!token)
    {
        return res.status(401).json({
            message:'Token not provided',
        });
    };

    try
    {
        const isTokenBlackListed = await tokenBlacklistModel.findOne({token});

        if(isTokenBlackListed)
        {
            return res.status(401).json(
                {
                    message:'Token is Invalid',
                }
            )
        };

        const decoded = jwt.verify(token,process.env.JWT_SECRETS);

        req.user = decoded;

        next();
    }
    catch(error)
    {
        return res.status(401).json({
            message:'Invalid or expired token',
        });
    }
}

module.exports = {
    authUser,
}
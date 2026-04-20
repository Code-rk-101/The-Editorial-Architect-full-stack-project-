const mongoose = require('mongoose');


async function ConnectToDB ()
{
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DataBase');
    }
    catch(err)
    {
        console.error('Database connection failed:', err.message);
    }
    
}

module.exports = ConnectToDB;
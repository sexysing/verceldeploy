const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URI)
        console.log(process.env.MONGO_URI)
        console.log(process.env.JWT_SECRET)
        console.log(process.env.PORT)
        console.log(process.env.CLIENT_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error:', error);
    }
}

module.exports = {db}
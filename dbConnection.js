import mongoose from "mongoose";

const dbConnection = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/URLShortner');
}

export default dbConnection;
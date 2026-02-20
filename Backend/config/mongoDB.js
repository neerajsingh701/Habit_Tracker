import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("Connected", () => console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URL}/habitTracker`);
}

export default connectDB
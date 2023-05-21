import mongoose from "mongoose";


export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI).then((c)=>{console.log(`Database Connected on ${c.connection.host}`)}).catch((err)=>{
    console.log(err);
});
};

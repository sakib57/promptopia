import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }

    try{
        await mongoose.connect("mongodb+srv://sakib57:sakib984@xtreem.wnemiwq.mongodb.net/?retryWrites=true&w=majority&appName=Xtreem",{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("MongoDB Connected");

    }catch(error){
        console.log("Not connect");
        console.log(error);
    }
}
import mongoose  from "mongoose";
import dotenv from "dotenv";
  dotenv.config({
          path:"../config/.env"
  });

  // database connnection 

  const dbConnect = async () =>{
try {
          await mongoose.connect(process.env.MONGO_DB_URL);
          console.log('Connected to database');
          
} catch (error) {
          console.log(" Error Connecting to database", error );
          
}
  }

  export default dbConnect ;
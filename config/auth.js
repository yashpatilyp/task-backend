import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { User } from '../models/userSchema.js';


dotenv.config({
    path:"../config/.env"
});
// Middleware function to verify user authentication
const isAuthenticated = (req, res, next) => {
   
    const { authorization } = req.headers;
  
  
    if (!authorization) {
      return res.status(401).json({ error: "User not logged in" });
    }
  
   
    const token = authorization.replace("Bearer ", "");
  
    
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
     
      if (error) {
        return res.status(401).json({ error: "User not logged in" });
      }
  
      
      const { _id } = payload;
  
      
      User.findById(_id)
        .then((dbUser) => {
          
          req.user = dbUser;
         
          next();
        })
        .catch((err) => {
         
          console.error("Error finding user:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
    });
  };
  
export default isAuthenticated;


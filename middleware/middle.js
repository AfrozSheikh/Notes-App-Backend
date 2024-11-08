// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const middleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token)
//       return res
//         .status(401)
//         .json({
//           success: false,
//           message: "No token provided , You are unauthorized",
//         });
//     const decoded = jwt.verify(token, "secretkey123456");
//     if (!decoded)
//       return res
//         .status(401)
//         .json({
//           success: false,
//           message: "Invalid token , You are unauthorized",
//         });
//     const user = await User.findById({ _id: decoded.id });
//     if (!user) return res
//     .status(401)
//     .json({
//       success: false,
//       message: "No user",
//     });
// const newUser = {name : user.name , id : user._id}
//     req.user = newUser ;
//     next() ; 
//   } catch (error) {
//     console.log(error);
    
//     res.status(500).json({success :false , msg:"middleware error plzz login "})
// }
// };

// export  default middleware;


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const middleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader)
//       return res.status(401).json({
//         success: false,
//         message: "No token provided, You are unauthorized",
//       });

//     const token = authHeader.split(" ")[1];
//     if (!token)
//       return res.status(401).json({
//         success: false,
//         message: "Token is malformed, You are unauthorized",
//       });

//     const decoded = jwt.verify(token, "secretkey123456");
//     if (!decoded)
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token, You are unauthorized",
//       });

//     const user = await User.findById({ _id: decoded.id });
//     if (!user)
//       return res.status(401).json({
//         success: false,
//         message: "No user found",
//       });

//     req.user = { name: user.name, id: user._id };
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, msg: "Middleware error, please login" });
//   }
// };

// export default middleware;

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey123456"); // Verify the token
    const user = await User.findById(decoded.id); // Retrieve user from database

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = { name: user.name, id: user._id }; // Add user info to the request
    next(); // Move to the next middleware
  } catch (error) {
    console.log("Token verification error:", error.message); // Log the error message
    res.status(401).json({ success: false, message: "Invalid or malformed token" });
  }
};

export default middleware;


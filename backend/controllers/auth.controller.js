import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.utility.js";
import { ApiResponse } from "../utility/ApiResponse.utility.js";
import { asyncHandler } from "../utility/asyncHandler.utility.js";

const register = asyncHandler(async (req, res, next) => {
   const { fullName, userName, password } = req.body;

   let invalid = [userName, fullName, password].some(
      (elem) => !elem || elem.trim() == ""
   );
   if (invalid) {
      throw new ApiError(400, "Give required details");
   }

   const userExist = await User.findOne({ userName });
   if (userExist) {
      throw new ApiError(409, "Username already exists");
   }

   const newUser = await User.create({ fullName, userName, password });

   //  const { ...data } = newUser._doc;
   //  delete data.password;
   delete newUser._doc.password;

   res.status(200).json(
      new ApiResponse(200, "User created successfully ", newUser)
      // new ApiResponse(200, "User created successfully ", data)
   );
});

const login = asyncHandler(async (req, res) => {
   const { userName, password } = req.body;

   if (!userName || !password) {
      throw new ApiError(409, "Username/Password are required");
   }
   if (userName.trim() == "" || password.trim() == "") {
      throw new ApiError(409, "Username/Password are required");
   }

   const user = await User.findOne({ userName });

   if (!user) {
      throw new ApiError(409, "User does not exist");
   }

   const isPasswordCorrect = await user.isPasswordCorrect(password);

   if (!isPasswordCorrect) {
      throw new ApiError(409, "Wrong Password");
   }

   const accessToken = user.generateAccessToken();

   const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 5 * 24 * 60 * 60 * 1000,
      //         1day   1hour  1min    1sec
   };

   //  const { ...userData } = user._doc;
   //  delete userData.password;
   delete user._doc.password;

   res.status(200).cookie("accessToken", accessToken, options).json(
      new ApiResponse(200, "User Logged In Successfully", {
         accessToken,
         user,
         // user: userData,
      })
   );
});

const logout = asyncHandler(async (req, res) => {
   //  const user = req.user;

   const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   };

   //  console.log(req.cookies);
   res.status(200)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, "User loged out successfully"));
});

const currentUser = asyncHandler(async (req, res) => {
   const user = req.user;

   res.status(200).json(
      new ApiResponse(200, "User available", {
         user,
      })
   );
});

export { register, login, logout, currentUser };

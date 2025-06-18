import { User } from "../model/user.js";
import jwt from "jsonwebtoken";
import { TryCatch } from "../utils/try-catch.js";
import { AuthenticatedRequest } from "../middleware/isAuth.js";
import { getBuffer } from "../utils/data-uri.js";
import { v2 as cloudinary } from "cloudinary";
import { oauth2Client } from "../utils/google-config.js";
import axios from "axios";

export const loginUser = TryCatch(async (req, res) => {

  const {code} = req.body;
  if(!code){
    res.status(400).json({
      success: false,
      message: "Google code is required",
    });
    return;
  }

  const googleRes = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token =${googleRes.tokens.access_token}`)

  const { email, name, picture } = userRes.data;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      image: picture,
    });
  }
  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: "5d",
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
});

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
  const user = req.user;

  res.json({
    success: true,
    message: "User profile fetched successfully",
    user,
  });
});

export const getUserProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: user,
  });
});

export const updateUser = TryCatch(async (req: AuthenticatedRequest, res) => {
  const { name, instagram, linkedin, facebook, bio } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      name,
      instagram,
      linkedin,
      facebook,
      bio,
    },
    {
      new: true,
    }
  );

  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: "5d",
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
    token,
  });
});

export const updateProfileImage = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      res.status(400).json({
        success: false,
        message: "Error processing file",
      });
      return;
    }

    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
      folder: "blogs",
    });

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        image: cloud.secure_url,
      },
      {
        new: true,
      }
    );

    const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
      expiresIn: "5d",
    });

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      user,
      token,
    });
  }
);

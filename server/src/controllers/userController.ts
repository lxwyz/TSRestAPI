import { Request, Response } from "express";
import { User } from "../models/user";
import generateToken from "../utils/generateToken";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser && (await existingUser.matchPassword(password))) {
      generateToken(res, existingUser._id);
      return res.status(200).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
  }
);

export const logoutUser = asyncHandler(
    async (req: Request, res: Response) : Promise<any> =>  {
        res.cookie('token', null, { 
            httpOnly: true,
            expires: new Date(0) });
        return res.status(200).json({ msg: "Logged out successfully" });
    }
)

export const getUserProfile = asyncHandler(
  async(req: AuthRequest, res:Response) : Promise<any> => {
    const user = {
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
    }
    res.status(200).json(user)
  }
)

export const updateUserProfile = asyncHandler(
  async(req: AuthRequest, res: Response): Promise<any> => {
    const user = await User.findById(req.user?._id)

    if(!user){
      res.status(404);
      throw new Error("User not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();

    const selectedUser = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    }
    res.status(200).json(selectedUser);
  }
)
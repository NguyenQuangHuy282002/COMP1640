import { bcryptHash } from "helpers/bcrypt.helper";
import User from "models/User";
import ApiErrorResponse from "utils/ApiErrorResponse";
import { generateJWToken, verifyJWTToken } from '../helpers/token.helper'


export const find = async (req: any, res: any, next: any) => {
  try {
    const users = await User.find({ $ne: { role: 'admin' } }).select("-password");
    if (!users) {
      return next(new ApiErrorResponse("No account exists.", 404));
    }
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500));
  }
};



export const findUser = async (req: any, res: any, next: any) => {
  try {
    const { username } = req.params.username;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return next(new ApiErrorResponse("Account does not exists.", 404));
    }
    return res.status(200).json({
      email: user.email,
      picture: user.image,
    });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500));
  }
};

export const updateProfilePicture = async (req: any, res: any, next: any) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      image: url,
    });
    res.json(url);
  } catch (error) {
    next(new ApiErrorResponse(`${error.message}`, 500));
  }
};

export const changePassword = async (req: any, res: any, next: any) => {
  const { username, password } = req.body;

  const cryptedPassword = await bcryptHash(password);
  if (password !== undefined || password !== "") {
    await User.findOneAndUpdate(
      { username },
      {
        password: cryptedPassword,
      }
    );
  }
  return res.status(200).json({ message: "ok" });
};

export const updateUser = async (req: any, res: any, next: any) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true }).select('-password');

    if (!updatedUser) {
      return next(new ApiErrorResponse(`Could not update user`, 400));
    }
    return res.status(200).json({ success:true, message: "User updated successfully", updatedUser });

  } catch (error) {
    next(new ApiErrorResponse(`${error.message}`, 500));

  }
};

export const deleteUser = async (req: any, res: any, next: any) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId); 

    if (!deletedUser) {
      return next(new ApiErrorResponse(`Could not update user`, 400));
    }
    return res.status(200).json({ success:true, message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    next(new ApiErrorResponse(`${error.message}`, 500));
  }
};

export const search = async (req: any, res: any, next: any) => {
  try {
    const searchTerm = req.params.searchTerm;
    const results = await User.find({ $text: { $search: searchTerm } }).select(
      "name email username"
    );
    res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    next(new ApiErrorResponse(`${error.message}`, 500));
  }
};

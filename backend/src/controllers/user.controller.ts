import User from "models/User";
import ApiErrorResponse from "utils/ApiErrorResponse";
import { generateJWToken, verifyJWTToken } from '../helpers/token.helper'


export const findUser = async (req: any, res: any, next: any) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
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

export const sendResetPasswordCode = async (req: any, res: any, next: any) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    const code = generateJWToken(5, process.env.JWT_FREQUENCY_SECRET, '30p');
    const updateUser = await User.findByIdAndUpdate(
      { id: req.user.id },
      { user: user._id }
    );
    // sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: "Email reset code has been sent to your email",
    });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500));
  }
};

export const validateResetCode = async (req: any, res: any, next: any) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user._id });
    if (Dbcode.code !== code) {
      return res.status(400).json({
        message: "Verification code is wrong..",
      });
    }
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    {
      password: cryptedPassword,
    }
  );
  return res.status(200).json({ message: "ok" });
};


export const updateProfilePicture = async (req: any, res: any, next: any) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDetails = async (req: any, res: any, next: any) => {
  try {
    const { infos } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      {
        new: true,
      }
    );
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const search = async (req: any, res: any, next: any) => {
  try {
    const searchTerm = req.params.searchTerm;
    const results = await User.find({ $text: { $search: searchTerm } }).select(
      "first_name last_name username picture"
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addToSearchHistory = async (req: any, res: any, next: any) => {
  try {
    const { searchUser } = req.body;
    const search = {
      user: searchUser,
      createdAt: new Date(),
    };
    const user = await User.findById(req.user.id);
    const check = user.search.find((x) => x.user.toString() === searchUser);
    if (check) {
      await User.updateOne(
        {
          _id: req.user.id,
          "search._id": check._id,
        },
        {
          $set: { "search.$.createdAt": new Date() },
        }
      );
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          search,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
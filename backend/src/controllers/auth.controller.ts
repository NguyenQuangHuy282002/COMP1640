import User from '../models/User'
import { generateJWToken, verifyJWTToken } from '../helpers/token.helper'
import { bcryptHash, bcryptCompare } from '../helpers/bcrypt.helper'
import ApiErrorResponse from '../utils/ApiErrorResponse'
import { senVerification } from '../utils/mailer'

export const createAccount = async (req: any, res: any, next: any) => {
  try {
    const { username, firstName, lastName, password, role, phone, birthday } = req.body

    const isUserExists = await User.findOne({ username: username.toLowerCase() })
    if (isUserExists) {
      next(new ApiErrorResponse('Username is taken', 400))
    }

    const passwordHash = await bcryptHash(password)
    const name = firstName + ' ' + lastName
    const newAccount = await new User({
      username,
      name,
      password: passwordHash,
      role,
      phone,
      birthday,
    }).save()

    res.status(200).json({ success: true, savedUser: newAccount })
  } catch (err) {
    next(err)
  }
}

export const login = async (req: any, res: any, next: any) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username.toString() }).select('+password')
    if (!user) {
      return next(new ApiErrorResponse('Invalid username or password', 401))
    }
    const checkPassword = await bcryptCompare(password, user!.password)
    if (!checkPassword) {
      return next(new ApiErrorResponse('Invalid username or password', 400))
    } else if (!user.isActivate) {
      sendTokenResponse(user, 200, 'Account is not activated', res, next)
    }

    sendTokenResponse(user, 200, 'Login successfully', res, next)
  } catch (err) {
    next()
  }
}

const sendTokenResponse = async (userData: any, statusCode: any, message: any, res: any, next: any) => {
  const payload = {
    user: {
      id: userData.id,
      username: userData.username,
    },
  }

  const cookieOptions = {
    expires: new Date(Date.now() + 169696),
    httpOnly: true,
  }

  const refreshToken = generateJWToken(payload, process.env.JWT_REFRESH_SECRET, '15d')
  const accessToken = generateJWToken(payload, process.env.JWT_ACCESS_SECRET, '300s')

  setRefreshToken(refreshToken, userData, next)

  res.status(statusCode)
  .cookie('token', refreshToken, cookieOptions)
  .json({
    success: true,
    userData,
    message,
    accessToken: accessToken,
    refreshToken: refreshToken,
  })
}

const setRefreshToken = async (token: string, userData: any, next: any) => {
  try {
    await new User(userData).save()
  } catch (err) {
    next(err)
  }
}

export const refreshToken = async (req: any, res: any, next: any) => {
  try {
    const refreshToken = await User.findOne({ _id: req.user.id }).select('token')
    if (refreshToken) {
      const accessOption = {
        expriresIn: 300,
      }
      const decodedJWTToken = await verifyJWTToken(refreshToken, process.env.JWT_REFRESH_SECRET)
      if (decodedJWTToken) {
        const newAccessToken = await generateJWToken(decodedJWTToken, process.env.JWT_ACCESS_SECRET, accessOption)
        res.status(200).json({
          newAccessToken: newAccessToken,
        })
      }
    } else {
      return next(new ApiErrorResponse('The user is not authenticated.', 401));
    }
  } catch (error) {
    next(error)
  }
}


export const sendVerificationEmail = async (req: any, res: any, next: any) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }
    if (user!.isActivate) {
      return next(new ApiErrorResponse(`User ${id} is already activated`, 400));
    }

    const verificationToken = generateJWToken(
      {
        id: user._id.toString()
      },
      process.env.JWT_FREQUENCY_SECRET,
      '30m'
    );
    const verificationUrl = `${process.env.BASE_URL}/verification/${verificationToken}`;
    const isSent = await senVerification(user.email, user.name, verificationUrl);
    if (isSent) {
      res.status(200).json({
        success: true,
        message: `send email successfully`
      });
    }
  } catch (error) {
    next(new ApiErrorResponse('failed to send email'));
  }
}

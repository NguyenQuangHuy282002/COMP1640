import * as express from 'express'

export const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  try {
  } catch (err) {
    res.json({ success: 0, err })
  }
})

userRouter.post('/', express.json(), (req, res) => {
  try {
  } catch (err) {
    res.json({ success: 0, err })
  }
})

import Hastag from "../models/Hastag";
import express from 'express'
// import { v4 as uuidv4 } from 'uuid';

export const hastagRouter = express.Router()


// hastagRouter.post('/hashtags', async (req, res) => {
//     const hashtagName = req.body.name;
//     const existingHashtag = await Hashtag.findOne({ name: hashtagName });
//     if (existingHashtag) {
//       res.send(existingHashtag);
//     } else {
//       const newHashtag = new Hashtag({
//         name: hashtagName,
//       });
//       await newHashtag.save();
//       res.send(newHashtag);
//     }
//   });

//   hastagRouter.post('/', express.json(),async (req,res) => {
//     try{
//       const{_id , name} = req.body;
//       if (_id) {
//         await Hashtag.findByIdAndUpdate(
//           {_id},
//           {name},
//           {upsert: true},
//         )
//       } else {
//         await Hashtag.collection.insertOne({name})
//       }
//       res.status(200).json({success : 1})
//     } catch (err){
//       res.status(500).json({
//         message: err.message,
//       })
//     }
//   })




// departmentRouter.get('/', async (req, res) => {
//   try {
//     const data = await Department.find({})
//     res.status(200).json({ success: 1, data: data })
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     })
//   }
// })

// departmentRouter.post('/', express.json(), async (req, res) => {
//   try {
//     const { name, oldName } = req.body
//     await Department.findOneAndUpdate({ oldName }, { name }, { upsert: true })
//     res.status(200).json({ success: 1 })
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     })
//   }
// })

hastagRouter.post('/delete', express.json(), async (req, res) => {
  try {
    const { name } = req.body
    await Hastag.findOneAndDelete({ name })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

hastagRouter.post('/', express.json(),async (req,res) => {
  try{
    const{_id , name} = req.body;
    if (_id) {
      await Hastag.findByIdAndUpdate(
        {_id},
        {name},
        {upsert: true},
      )
    } else {
      await Hastag.collection.insertOne({name})
    }
    res.status(200).json({success : 1})
  } catch (err){
    res.status(500).json({
      message: err.message,
    })
  }
})

hastagRouter.get('/', async (req, res) => {
  try {
    const { id } = req.query
    const data = await Hastag.find(id ? { _id: id } : {})
    res.status(200).json({ success: 1, data })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})


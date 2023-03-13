import ApiErrorResponse from "../utils/ApiErrorResponse";
import Comment, { IComment } from "../models/Comment";
import User from "../models/User";
import Category from "../models/Category";
import SpecialEvent from "../models/SpecialEvent";
import Idea from "../models/Idea";
import { sendNotification } from "../utils/mailer";


export const createComment = async (req: any, res: any, next: any) => {
  try {
    const commentBody = req.body;

    if (!commentBody.content || commentBody.content == '' || req.payload?.user?.id == '' || commentBody.ideaId === '' || commentBody.publisherEmail === '') {
      return next(new ApiErrorResponse('Lack of required information.', 400))
    }
    let idea = await Idea.findById(commentBody.ideaId)
    if (idea?.specialEvent) {
      idea = await idea.populate({
        path: 'specialEvent',
        select: ['finalCloseDate']
      });
      if (new Date(idea.specialEvent.finalCloseDate) >= new Date()) {
        return next(new ApiErrorResponse(`This idea reached final closure date, id:${commentBody.ideaId}`, 400))
      }
    }

    const data = { content: commentBody.content, ideaId: commentBody.ideaId, isAnonymous: commentBody.isAnonymous }

    const newComment = {...data, userId: req.payload?.user?.id};

    let savedComment = await Comment.create(newComment);
    const user = await User.findById(req.payload?.user?.id);
    user.comments.push(savedComment._id);
    console.log('user', user)
    idea.comments.push(savedComment._id);
    user.save();
    idea.save();
    activeMailer(user.name, commentBody.publisherEmail, new Date(), idea._id)
      .then((data) => console.log('isSent', data))
      .catch((error) => console.log('error'))

    res.status(200).json({
      success: true,
      message: 'Comment is created successfully',
      Comment: savedComment,
    })
  } catch (err) {
    return next(new ApiErrorResponse(`${err.message}`, 500))
  }
}

export const activeMailer = async (name: any, email: any, date: any, ideaId: any) => {
  try {
    const title = 'Your idea has received a new comment'
    const content = `${name} has commented on your idea, commented at ${new Date(date).toUTCString()}. Check now by click the link bellow`
    const url = `http://localhost:3000/idea/${ideaId}`
    const isSent = await sendNotification(email, content, title, date, url);
    return isSent
  } catch (err) {
    throw new Error(err.message);
  }
}

export const getComments = async (req: any, res: any, next: any) => {
  try {
    const reqQuery = req.query;
    const { ideaId } = reqQuery;
    console.log('id', ideaId);
    const page = parseInt(reqQuery.page) || 1;
    const offset = (page - 1) * 5;
    const trending = reqQuery.tab || null;
    const endIndex = page * 5;
    const results = {};

    if (endIndex < (await Comment.countDocuments().exec())) {
      results['next'] = {
        page: page + 1,
        limit: 5,
      };
    }

    if (offset > 0) {
      results['previous'] = {
        page: page - 1,
        limit: 5,
      };
    }

    let options: any = { ideaId: ideaId }

    let comments = Comment
      .find(options)
      .populate({
        path: 'userId',
        select: ["name", "avatar", "email", "role"]
      })

    if (trending == 'best') {
      comments
        .sort({ like: -1 })
    }

    else {
      comments
        .sort({ date: -1 })
    }

    results['results'] = await comments
      .limit(5)
      .skip(offset)
      .exec();

    res.status(200).json({
      success: true,
      count: results['results'].length,
      next: results['next'],
      previous: results['previous'],
      data: results['results']
    })
  } catch (err) {
    return next(new ApiErrorResponse(`${err.message}`, 500))
  }
}

export const getAllCommentsOfUser = async (req: any, res: any, next: any) => {
  try {
    const option = req.query.uid;
    const userId = option == 'me' ? req.payload.user.id : option;

    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiErrorResponse(`Not found user id ${userId}`, 500))
    }
    const comments = await Comment
      .find({ publisherId: { "$in": user._id } })
      .populate({
        path: 'userId',
        select: ["name", "avatar", "email", "role"]
      })
      .populate('categories')
    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    })
  } catch (err) {
    return next(new ApiErrorResponse(`${err.message}`, 500))
  }
}


export const deleteComment = async (req: any, res: any, next: any) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId)
    if (!deletedComment) {
      return next(new ApiErrorResponse(`Comment id ${commentId} not found`, 404))
    }

    const user = await User.findById(deletedComment.userId)
    const idea = await Idea.findById(deletedComment.ideaId)
    // await User.deleteMany({ CommentId: deletedComment._id });

    const newUserComments = user.comments.filter(userI => userI._id.toString() !== deletedComment._id);
    const newIdeaComment = idea.comments.filter(userC => userC._id.toString() !== deletedComment._id);

    user.comments = newUserComments;
    idea.comments = newIdeaComment;
    user.save();
    idea.save();

    res.status(200).json({ success: true, message: 'Comment is deleted!', deletedComment: deletedComment, user });
  }
  catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}


export const editComment = async (req: any, res: any, next: any) => {
  try {
    //init req body obj
    const reqBody = req.body;

    //get Comment id from req params prop
    const { CommentId } = req.params;

    //update Comment with req body obj 
    const updatedComment = await Comment.findByIdAndUpdate(CommentId, reqBody, { new: true, useFindAndModify: false })
      .populate('userId')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId'
        }
      })
      .populate('likes');

    if (!updatedComment) {
      return next(new ApiErrorResponse(`Not found Comment id ${CommentId}`, 404))
    }

    await updatedComment.save();

    res.status(202).json({ message: 'Comment succesfully updated!', updatedComment });
  }
  catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}

export const likeComment = async (req: any, res: any, next: any) => {
  try {
    const { commentId } = req.params;
    let comment = await Comment.findById(commentId);
    comment.like = +comment.like + 1;
    await comment.save();
    res.status(200).json({ success: true, message: 'Comment liked!', comment });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))

  }
}

export const disLikeComment = async (req: any, res: any, next: any) => {
  try {
    const { commentId } = req.params;
    let comment = await Comment.findById(commentId);
    comment.like = +comment.like - 1;
    await comment.save();
    res.status(200).json({ success: true, message: 'Comment liked!', comment });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))

  }
}
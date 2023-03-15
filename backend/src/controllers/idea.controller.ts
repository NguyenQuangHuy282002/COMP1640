import ApiErrorResponse from "../utils/ApiErrorResponse";
import Idea, { IIdea } from "../models/Idea";
import User from "../models/User";
import Comment from "../models/Comment";
import Category from "../models/Category";
import SpecialEvent from "../models/SpecialEvent";


export const createIdea = async (req: any, res: any, next: any) => {
  try {
    const ideaBody = req.body;

    if (!ideaBody.content || ideaBody.content == '' || ideaBody.title == '') {
      return next(new ApiErrorResponse('Account does not exists.', 400))
    }


    const newIdea: IIdea = Object.assign({}, ideaBody, { publisherId: req.payload.user.id });
    console.log('uploaded idea:', newIdea)

    let savedIdea = await Idea.create(newIdea);

    savedIdea = await savedIdea.populate('publisherId');

    const user = await User.findById(savedIdea.publisherId);

    if (ideaBody.categories) {
      const updatedtags = ideaBody.categories.map(async tag => {
        let updateTag = await Category.findById(tag)
        updateTag.ideas.push(savedIdea._id)
        await updateTag.save()
      })
      await Promise.all(updatedtags)
    }

    if (ideaBody.specialEvent) {
      const specialEvent = await SpecialEvent.findById(savedIdea.specialEvent);
      specialEvent.ideas.push(savedIdea._id);
      specialEvent.save();
    }

    user.ideas.push(savedIdea._id);
    user.save();

    res.status(200).json({
      success: true,
      message: 'idea is created successfully',
      idea: savedIdea
    })
  } catch (err) {
    return next(new ApiErrorResponse(`${err.message}`, 500))
  }
}

export const getIdeas = async (req: any, res: any, next: any) => {
  try {
    const reqQuery = req.query;
    const page = parseInt(reqQuery.page) || 1;
    const limit = parseInt(reqQuery.limit) || 20;
    const offset = (page - 1) * limit;
    const trending = reqQuery.tab || null;
    const endIndex = page * limit;
    let keyWord = reqQuery.keyword || null;
    const results = {};

    if (endIndex < (await Idea.countDocuments().exec())) {
      results['next'] = {
        page: page + 1,
        limit: limit,
      };
    }

    if (offset > 0) {
      results['previous'] = {
        page: page - 1,
        limit: limit,
      };
    }

    let options: any = {}

    if (keyWord) {
      keyWord = keyWord.replace(/-/g, ' ').toLowerCase();
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRegex = rgx(keyWord);
      options = {
        $or: [
          { title: { $regex: searchRegex, $options: "i" } },
          { content: { $regex: searchRegex, $options: "i" } },
        ]
      }
    }

    let ideas = Idea
      .find(options)
      .select('title views likes dislikes createdAt comments isAnonymous specialEvent content')
      .populate({
        path: 'publisherId',
        select: ["name", "avatar", "email", "role"]
      })
      .populate('categories')

    if (trending == 'hot') {
      ideas
        .sort({ views: -1 })
    }

    else if (trending == 'best') {
      ideas
        .sort({ like: -1 })
    }

    else {
      ideas
        .sort({ createdAt: -1 })
    }

    results['results'] = await ideas
      .limit(limit)
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

export const getAllIdeasOfUser = async (req: any, res: any, next: any) => {
  try {
    const option = req.query.uid;
    const userId = option == 'me' ? req.payload.user.id : option;

    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiErrorResponse(`Not found user id ${userId}`, 500))
    }
    const ideas = await Idea
      .find({ publisherId: { "$in": user._id } })
      .select('title views likes dislikes createdAt comments isAnonymous specialEvent content')
      .populate({
        path: 'publisherId',
        select: ["name", "avatar", "email", "role"]
      })
      .populate('categories')
    res.status(200).json({
      success: true,
      count: ideas.length,
      data: ideas
    })
  } catch (err) {
    return next(new ApiErrorResponse(`${err.message}`, 500))
  }
}

export const getIdea = async (req: any, res: any, next: any) => {
  try {
    console.log(req.query.id)
    const idea = await Idea
      .findById(req.query.id)
      .populate({
        path: 'publisherId',
        select: ["name", "avatar", "email", "role"]
      })
      .populate('categories')
      .populate('specialEvent')
    idea.views = idea.views + 1;
    await idea.save();
    console.log(idea)
    res.status(200).json({
      success: true,
      data: idea
    })
  } catch (err) {
    return next(new ApiErrorResponse(`${err.message}`, 500))
  }
}

export const getDataSuggestion = async (req: any, res: any, next: any) => {
  try {
    const ideas = await Idea
      .find()
      .select('title')
    // const users = await User
    //   .find()
    //   .select('name')
    // const categories = await Category
    //   .find()
    //   .select('name')
    res.status(200).json({
      success: true,
      data: ideas,
      count: ideas.length,
    }
    )
  } catch (err) {
    return next(new ApiErrorResponse(`${err.message}`, 500))
  }
}


export const deleteIdea = async (req: any, res: any, next: any) => {
  try {
    const { ideaId } = req.params;

    const deletedIdea = await Idea.findByIdAndDelete(ideaId)
    if (!deletedIdea) {
      return next(new ApiErrorResponse(`Idea id ${ideaId} not found`, 404))
    }

    const user = await User.findById(deletedIdea.publisherId).populate('ideas')
      .populate('comments')
      .populate({
        path: 'ideas',
        populate: {
          path: 'publisherId'
        }
      })
      .populate({
        path: 'ideas',
        populate: {
          path: 'comments',
          populate: {
            path: 'publisherId'
          }
        }
      });

    await Comment.deleteMany({ ideaId: deletedIdea._id });

    const newUserIdeas = user.ideas.filter(userI => userI._id.toString() !== deletedIdea._id);
    const newUserComment = user.comments.filter(userC => userC._id.toString() !== deletedIdea._id);

    user.ideas = newUserIdeas;
    user.comments = newUserComment;
    user.save();

    res.status(200).json({ success: true, message: 'idea is deleted!', deletedIdea: deletedIdea, user });
  }
  catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}


export const editIdea = async (req: any, res: any, next: any) => {
  try {
    const reqBody = req.body;

    const { ideaId } = req.params;

    const updatedIdea = await Idea.findByIdAndUpdate(ideaId, reqBody, { new: true, useFindAndModify: false })
      .populate('publisherId')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId'
        }
      })
      .populate('likes');

    if (!updatedIdea) {
      return next(new ApiErrorResponse(`Not found Idea id ${ideaId}`, 404))
    }

    updatedIdea.files = reqBody.files ? reqBody.files : updatedIdea.files;
    await updatedIdea.save();

    res.status(202).json({ message: 'idea succesfully updated!', updatedIdea });
  }
  catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}

export const likeIdea = async (req: any, res: any, next: any) => {
  try {
    const { ideaId } = req.body;
    const userId = req.payload.user.id
    let idea = await Idea.findById(ideaId);
    if (idea.likes.indexOf(userId) >= 0) {
      return
    }
    if (idea.dislikes.indexOf(userId) >= 0) {
      idea.dislikes = idea.dislikes.filter(like => like.toString() !== userId);
    }
    if (idea.likes.indexOf(userId) === -1) {
      idea.likes.push(userId);
    }
    await idea.save();
    res.status(200).json({ success: true, message: 'idea liked!', idea });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}

export const disLikeIdea = async (req: any, res: any, next: any) => {
  try {
    const { ideaId } = req.body;
    const userId = req.payload.user.id
    let idea = await Idea.findById(ideaId);
    if (idea.dislikes.indexOf(userId) >= 0) {
      return
    }
    if (idea.likes.indexOf(userId) >= 0) {
      idea.likes = idea.likes.filter(like => like.toString() !== userId);
    }
    if (idea.dislikes.indexOf(userId) === -1) {
      idea.dislikes.push(userId);
    }

    await idea.save();
    res.status(200).json({ success: true, message: 'idea liked!', idea });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}

export const omitVoteIdea = async (req: any, res: any, next: any) => {
  try {
    const { ideaId } = req.body;
    const userId = req.payload.user.id
    let idea = await Idea.findById(ideaId);
    if (idea.dislikes.indexOf(userId) === -1 || idea.likes.indexOf(userId) === -1) {
      return
    }
    if (idea.likes.indexOf(userId) >= 0) {
      idea.likes = idea.likes.filter(like => like.toString() !== userId);
    }
    if (idea.dislikes.indexOf(userId) >= 0) {
      idea.dislikes = idea.dislikes.filter(like => like.toString() !== userId);
    }

    await idea.save();
    res.status(200).json({ success: true, message: 'omit oke!', idea });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}

export const getPostLikes = async (req: any, res: any, next: any) => {
  try {
      const { ideaId } = req.query;

      const ideas = await Idea.findById(ideaId)
      .populate({
        path: 'likes',
        select: ["name", "avatar"]
      })
      .populate({
        path: 'dislikes',
        select: ["name", "avatar"]
      });

      res.status(201).json({ success: true, message: 'Post likers fetched succesfully!', likes: ideas.likes, dislikes: ideas.dislikes });
  } catch (error) {
    return next(new ApiErrorResponse(`${error.message}`, 500))
  }
}
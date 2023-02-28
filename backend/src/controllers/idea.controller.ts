import ApiErrorResponse from "../utils/ApiErrorResponse";
import Idea, { IIdea } from "../models/Idea";
import User from "../models/User";


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
    const page = parseInt(reqQuery.page) || 0;
    const limit = parseInt(reqQuery.limit) || 15;
    const offset = page * limit;
    const byViews = reqQuery.hot || null;
    const byLikes = reqQuery.best || null;

    const results = {};

    let ideas = Idea
      .find({})
      .select('title views like dislike createdAt comments')
      .populate({
        path: 'publisherId',
        select: ["name", "avatar", "email", "role"]
      })
      .populate('categories')

    if (byViews) {
      ideas
        .sort({ views: -1 })
    }

    if (byLikes) {
      ideas
        .sort({ like: -1 })
    }

    results['results'] = await ideas
          .limit(limit)
          .skip(offset)
          .exec();
    
    res.status(200).json({
      success: true,
      count: results['results'].length,
      data: results['results']
    })
  } catch (err) {

  }

}


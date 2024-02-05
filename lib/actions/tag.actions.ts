import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import Question from "@/database/question.model";

export function getTopInteractedTags(params: GetTopInteractedTagsParams){
 
    return [{_id:'1',name:'tag1'},{_id:'2',name:'tag2'},{_id:'3',name:'tag3'}]
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const {searchQuery} = params;

    const query : FilterQuery<typeof Tag>={};

    if(searchQuery){
      query.$or=[
        {name:{$regex: new RegExp(searchQuery,'i')}},
        {description:{$regex: new RegExp(searchQuery,'i')}}

      ]
    }

    const tags= await Tag.find(query);
    return {tags};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, pageSize = 10, searchQuery } = params;
    

    const tagFilter: FilterQuery<ITag> = { _id: tagId};

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' }}
        : {},
      options: {
        sort: { createdAt: -1 }
      },
      populate: [
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name picture'}
      ]
    })

    if(!tag) {
      throw new Error('Tag not found');
    }

    const isNext = tag.questions.length > pageSize;
    
    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" }}},
      { $sort: { numberOfQuestions: -1 }}, 
      { $limit: 5 }
    ])

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
"use server"

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose"
import {  CreateQuestionParams, GetQuestionByIdParams, GetQuestionsParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";

export async function getQuestions(params: GetQuestionsParams){
    connectToDatabase();
    const questions= await Question.find({})
    .populate({path:'tags',model: Tag})
    .populate({path:'author',model: User})
    .sort({createdAt:-1});

    return {questions}
}

export async function createQuestion(params: CreateQuestionParams){
    // eslint-disable-next-line no-empty
    try {

        connectToDatabase();

        const {title , content, tags, author, path}= params;
         // create question 

        const question = await Question.create({
            title,
            content,
            author,
            path,
         });

         const tagDocuments= [];

         // create or get if exisit tags

         for (const tag of tags){
            const existingTag= await Tag.findOneAndUpdate(
                {name: { $regex: new RegExp(`^${tag}$`, "i")}},
                { $setOnInsert: { name: tag}, $push: {question: question._id}},
                {upsert: true, new: true}
            );

            tagDocuments.push(existingTag._id);
         };

        await Question.findByIdAndUpdate(question._id,{
            $push: {tags: { $each: tagDocuments }}
        });

        revalidatePath(path)
    } catch (error) {
        throw new Error;
    }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
    try {
      connectToDatabase();
  
      const { questionId } = params;
  
      const question = await Question.findById(questionId)
        .populate({ path: 'tags', model: Tag, select: '_id name'})
        .populate({ path: 'author', model: User, select: '_id clerkId name picture'})
  
        return question;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
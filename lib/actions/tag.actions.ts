import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";

export function getTopInteractedTags(params: GetTopInteractedTagsParams){
 
    return [{_id:'1',name:'tag1'},{_id:'2',name:'tag2'},{_id:'3',name:'tag3'}]
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags= await Tag.find({});
    return {tags};
  } catch (error) {
    console.log(error);
    throw error;
  }
}
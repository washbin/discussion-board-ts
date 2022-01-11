import { Mongo } from "meteor/mongo";

export interface Comment {
  _id?: string;
  userId: string;
  username: string;
  message: string;
  sentAt: string;
}

export const CommentsCollection = new Mongo.Collection<Comment>("comments");

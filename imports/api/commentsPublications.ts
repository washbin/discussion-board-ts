import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "/imports/db/CommentsCollection";

Meteor.publish("comments", function publishComments() {
  return CommentsCollection.find({}, { sort: { sentAt: -1 } });
});

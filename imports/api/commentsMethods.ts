import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

import { CommentsCollection } from "/imports/db/CommentsCollection";

Meteor.methods({
  "comments.insert"(text: string, username: string) {
    check(text, String);
    check(username, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    CommentsCollection.insert({
      message: text,
      username: username,
      userId: this.userId,
      sentAt: new Date().toString(),
    });
  },
});

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";

import { Comment } from "/imports/db/CommentsCollection";

export const CommentBox = ({ comment }: { comment: Comment }) => {
  const user = useTracker(() => Meteor.user());

  return (
    <div className="bubbleWrapper">
      <div
        className={
          comment.userId === user?._id
            ? "inlineContainer own"
            : "inlineContainer"
        }
      >
        <div
          className={
            comment.userId === user?._id ? "own ownBubble" : "other otherBubble"
          }
        >
          {comment.message}
        </div>
      </div>
      <span className={comment.userId === user?._id ? "own" : "other"}>
        {comment.username}
      </span>
    </div>
  );
};

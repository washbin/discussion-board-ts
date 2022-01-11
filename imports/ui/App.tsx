import { Meteor } from "meteor/meteor";
import React, { Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";

import { CommentsCollection, Comment } from "/imports/db/CommentsCollection";
import { CommentBox } from "/imports/ui/CommentBox";
import { CommentForm } from "/imports/ui/CommentForm";
import { LoginForm } from "/imports/ui/LoginForm";

export const App = () => {
  const { comments, isLoading } = useTracker(() => {
    const emptyCommentList = [] as Comment[];
    if (!Meteor.user()) {
      return { comments: emptyCommentList, isLoading: false };
    }
    const handler = Meteor.subscribe("comments");
    if (!handler.ready()) {
      return { comments: emptyCommentList, isLoading: true };
    }
    const comments = CommentsCollection.find(
      {},
      { sort: { sentAt: -1 } }
    ).fetch();
    return { comments, isLoading: false };
  });

  const user = useTracker(() => Meteor.user());

  const MakeComment = (comment: Comment) => (
    <CommentBox comment={comment} key={comment._id} />
  );

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Let's discuss about something!</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <button className="user" onClick={() => Meteor.logout()}>
              {user.username} - Log Out
            </button>
            <CommentForm />
            {isLoading && <div className="loading">Loading...</div>}
            <ul className="comments">{comments.map(MakeComment)}</ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

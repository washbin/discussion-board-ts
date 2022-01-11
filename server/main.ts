import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "/imports/api/commentsMethods";
import "/imports/api/commentsPublications";

const createAccount = (username: string, password: string) => {
  if (!Accounts.findUserByUsername(username)) {
    Accounts.createUser({
      username,
      password,
    });
  }
};

Meteor.startup(() => {
  createAccount("firstuser", "firstpass");
  createAccount("seconduser", "secondpass");
  createAccount("thirduser", "thirdpass");
  createAccount("fourthuser", "fourthpass");
  createAccount("fifthuser", "fifthpass");
});

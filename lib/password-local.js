import Local from "passport-local";
import { findUser, validatePassword } from "./user";

export const localStrategy = new Local.Strategy(
  { usernameField: "email" },
  function (email, password, done) {
    const isAdmin = false;
    findUser(email, isAdmin)
      .then((user) => {
        if (user && validatePassword(user, password)) {
          done(null, user);
        } else {
          done(new Error("Invalid credentials"));
        }
      })
      .catch((error) => {
        done(error);
      });
  }
);

export const localStrategyAdmin = new Local.Strategy(
  { usernameField: "email" },
  function (email, password, done) {
    const isAdmin = true;
    findUser(email, isAdmin)
      .then((user) => {
        if (user && validatePassword(user, password)) {
          done(null, user);
        } else {
          done(new Error("Invalid credentials"));
        }
      })
      .catch((error) => {
        done(error);
      });
  }
);

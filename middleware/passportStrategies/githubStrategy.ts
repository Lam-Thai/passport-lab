import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Profile } from "passport";
import express from "express";
import { Request } from "express";
import { database } from "../../models/userModel";
import {
  addUserToDatabase,
  getUserById,
} from "../../controllers/userController";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: "http://localhost:8000/auth/github/callback",
    scope: ["user:email"],
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err?: Error | null, profile?: any) => void
  ) => {
    const newUser: Express.User = {
      id: database.length + 1,
      name: profile.displayName,
      email: String(profile.emails?.[0]?.value),
      admin: false,
    };
    try {
      addUserToDatabase(newUser);
      const user = getUserById(newUser.id);
      done(null, user);
    } catch (error) {
      if (!profile) {
        done(null, false);
      }
    }
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;

import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Profile } from "passport";
import express from "express";
import { Request } from "express";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `${process.env.CALLBACK_URL}`,
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
    User.findOrCreate(
      { githubId: profile.id },
      function (err: any, user: Express.User) {
        return done(err, user);
      }
    );
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;

import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  let failMessage = req.session.messages;
  if (failMessage) {
    req.session.messages = "";
  }
  res.render("login", { messages: failMessage });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* : 😭 failureMsg needed when login fails */
    failureMessage: true,
    // failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
    failureMessage: true,
  }),

  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

export default router;

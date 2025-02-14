import express from "express";
const router = express.Router();
import { checkAdmin, ensureAuthenticated } from "../middleware/checkAuth";
import session = require("express-session");

router.get("/", (req, res) => {
  console.log(req.user);
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, checkAdmin, (req, res) => {
  res.render("dashboard", {
    user: req.user,
    sessionID: req.sessionID,
  });
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
    sessionID: req.sessionID,
  });
});

export default router;

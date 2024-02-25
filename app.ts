import express from "express";
import cors from "cors";
import multer from "multer";
import * as authController from "./src/controllers/auth";
import * as postsController from "./src/controllers/posts";
import * as commentsController from "./src/controllers/comments";
import * as votesController from "./src/controllers/votes";
import * as filesController from "./src/controllers/files";
import validateToken from "./src/middleware/validateToken";

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer();

app.post("/register", authController.register);
app.post("/login", authController.logIn);
app.post("/token/refresh", authController.refreshJWT);
app.get("/profile", validateToken, authController.profile);

app.post(
  "/posts",
  validateToken,
  upload.single("image"),
  postsController.create,
);
app.get("/posts", postsController.getAllPosts);
app.get("/posts/:id", postsController.getPost);


app.post("/posts/:postId/upvote", validateToken, votesController.upvote);
app.post("/posts/:postId/downvote", validateToken, votesController.downvote);

app.post(
  "/posts/:postId/comments",
  validateToken,
  commentsController.createComment,
);

app.delete(
  "/posts/:postId/comments/:commentId",
  validateToken,
  commentsController.deleteComment,
);

app.get("/files/:id", filesController.getFileById);

export default app;
// routes/postRoutes.js
import express from "express";
import multer from 'multer';
import authenticateUser from "../middleware/authMiddleware.js";
import {
  createPost,
  getAllPosts,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticateUser, upload.single('image'), createPost);
router.get("/", authenticateUser, getAllPosts);
router.post("/:id/like", authenticateUser, likePost);
router.post("/:id/comment", authenticateUser, commentPost);
router.delete("/:id", authenticateUser, deletePost);

export default router;

// backend/routes/noteRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authenticateUser from '../middleware/authMiddleware.js';
import {
  uploadNote,
  getAllNotes,
  deleteNoteById,
  getNotesByUser
} from '../controllers/noteController.js';

const router = express.Router();

// Setup uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesDir = path.join(__dirname, '../uploads/notes');

if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, notesDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.get('/', getAllNotes);
router.get('/user/:userId', getNotesByUser);
router.post('/', authenticateUser, upload.single('file'), uploadNote);
router.delete('/:id', authenticateUser, deleteNoteById);

export default router;

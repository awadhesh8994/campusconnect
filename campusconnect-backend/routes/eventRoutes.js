// routes/eventRoutes.js
import express from 'express';
import multer from 'multer';
import authenticateUser from '../middleware/authMiddleware.js';
import {
  createEvent,
  getEvents,
  getEventById,
  toggleRSVP,
  getUserEvents
} from '../controllers/eventController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Optional standalone image-based event creation (unused if controller handles file upload)
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, location, tags, category } = req.body;
    const image = req.file ? req.file.path : null;
    // Example: const event = new Event({ ... });
    // await event.save();
    res.status(201).json({ message: 'Event created', event: null });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

router.post('/', authenticateUser, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/my', authenticateUser, getUserEvents);
router.get('/:id', getEventById);
router.post('/:id/rsvp', authenticateUser, toggleRSVP);

export default router;

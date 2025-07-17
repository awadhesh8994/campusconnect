// backend/controllers/eventController.js
import jwt from "jsonwebtoken";
import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Helper: extract user id if a token is present (non‑mandatory read)
const getUserIdFromHeader = (req) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET).id;
  } catch {
    return null;
  }
};

// POST /api/events
const createEvent = async (req, res) => {
  try {
    let { title, description, date, location, image, tags, category } =
      req.body;

    if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // Upload to Cloudinary if image file provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "campusconnect/events",
      });
      image = result.secure_url;
      fs.unlinkSync(req.file.path); // delete local temp file
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      image,
      tags,
      category,
      createdBy: req.user.id,
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("❌ Event creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const event = await Event.findById(req.params.id)
      .populate("attendees", "name profilePic")
      .lean();

    if (!event) return res.status(404).json({ message: "Event not found" });

    event.isAttending = userId
      ? event.attendees.some((u) => u._id.toString() === userId)
      : false;
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/events/:id/rsvp
const toggleRSVP = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const idx = event.attendees.findIndex(
      (uid) => uid.toString() === req.user.id
    );
    idx === -1
      ? event.attendees.push(req.user.id)
      : event.attendees.splice(idx, 1);

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/events/my
const getUserEvents = async (req, res) => {
  try {
    const mine = await Event.find({ createdBy: req.user.id }).sort({
      date: -1,
    });
    res.json(mine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { createEvent, getEvents, getEventById, toggleRSVP, getUserEvents };

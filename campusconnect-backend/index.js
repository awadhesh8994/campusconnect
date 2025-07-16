import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import noteRoutes from "./routes/noteRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authenticateUser from "./middleware/authMiddleware.js";
import conversationRoutes from "./routes/conversationRoutes.js";

// ────── Setup ──────
dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Use CORS origins from .env (comma-separated)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];

console.log("🌍 CORS Allowed Origins:", allowedOrigins);

// ────── Socket.IO Setup ──────
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("✅ User online:", userId);
  });

  socket.on("sendMessage", ({ senderId, recipientId, text }) => {
    const recipientSocket = onlineUsers.get(recipientId);
    const senderSocket = onlineUsers.get(senderId);

    if (recipientSocket)
      io.to(recipientSocket).emit("receiveMessage", { senderId, text });
    if (senderSocket)
      io.to(senderSocket).emit("receiveMessage", { senderId, text });
  });

  socket.on("join", (roomId) => {
    socket.join(roomId);
    console.log(`🟣 ${socket.id} joined room ${roomId}`);
  });

  socket.on("typing", (toId) => {
    const toSocket = onlineUsers.get(toId);
    if (toSocket) {
      io.to(toSocket).emit("typing", socket.id);
    }
  });

  socket.on("disconnect", () => {
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        console.log("❌ User disconnected:", key);
        break;
      }
    }
  });
});

// ────── Middleware ──────
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ────── Routes ──────
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", authenticateUser, notificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/conversations", conversationRoutes);

// ────── Static Files ──────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ────── MongoDB & Server Start ──────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

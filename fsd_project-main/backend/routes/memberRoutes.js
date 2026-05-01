const express = require("express");
const multer = require("multer");
const path = require("path");
const Member = require("../models/Member");

const router = express.Router();

// ---------------------------------------------------------------------------
// Multer configuration — saves images to backend/uploads/
// ---------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// ---------------------------------------------------------------------------
// POST /api/members — Create a new member
// ---------------------------------------------------------------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, role, email } = req.body;

    // Basic validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!role || !role.trim()) {
      return res.status(400).json({ message: "Role is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    const member = new Member({
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
      image: req.file ? req.file.filename : null,
    });

    const saved = await member.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("POST /api/members error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/members — Retrieve all members
// ---------------------------------------------------------------------------
router.get("/", async (_req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error("GET /api/members error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/members/:id — Retrieve a single member by ID
// ---------------------------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Member not found" });
    }
    console.error("GET /api/members/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------------------------------------------
// PUT /api/members/:id — Update an existing member
// ---------------------------------------------------------------------------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const { name, role, email } = req.body;

    if (name) member.name = name.trim();
    if (role) member.role = role.trim();
    if (email) member.email = email.trim();

    // If a new image was uploaded, delete the old one and update
    if (req.file) {
      if (member.image) {
        const fs = require("fs");
        const oldPath = path.join(__dirname, "..", "uploads", member.image);
        fs.unlink(oldPath, () => {}); // delete old file silently
      }
      member.image = req.file.filename;
    }

    const updated = await member.save();
    res.json(updated);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Member not found" });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("PUT /api/members/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/members/:id — Delete a member
// ---------------------------------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Delete image file if it exists
    if (member.image) {
      const fs = require("fs");
      const imgPath = path.join(__dirname, "..", "uploads", member.image);
      fs.unlink(imgPath, () => {});
    }

    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Member not found" });
    }
    console.error("DELETE /api/members/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

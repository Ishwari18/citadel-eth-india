const express = require("express");
const router = express.Router();

// Route to fetch the user profile (require authentication)
router.get("/totalvalue", fetchuser, async (req, res) => {
    try {
  
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
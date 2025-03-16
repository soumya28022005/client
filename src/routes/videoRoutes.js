const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/solution", async (req, res) => {
  try {
    const {topic} = req.query;
    const API_KEY = "your_youtube_api_key";
    const searchQuery = `${topic} explanation`;

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API_KEY}&type=video`
    );

    res.json({ videoUrl: `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}` });
  }
  
  catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error.message });
    } else {
      res.status(500).json({ error: "Error fetching video" });
    }
  }

});

module.exports = router;
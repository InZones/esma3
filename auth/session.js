const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      loggedin: true,
      username: req.session.username
    });
  } else {
    res.json({ loggedin: false });
  }
});

module.exports = router;

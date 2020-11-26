const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "get the deals" }).status(200);
});

module.exports = router;
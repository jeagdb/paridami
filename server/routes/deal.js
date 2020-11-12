const express = require("express");
const router = express.Router();
const { getUserDeals } = require('../controllers/dealController');

router.get("/", (req, res) => {
  //const deals = getUserDeals(req.user.Id);
  res.send({ response: "get the deals" }).status(200);
});

module.exports = router;
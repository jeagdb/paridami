const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  res.send({ response: "logout" }).status(200);
});
  
router.post("/signin", (req, res) => {
  
});
  
router.post("/signup", (req, res) => {
    
})

module.exports = router;
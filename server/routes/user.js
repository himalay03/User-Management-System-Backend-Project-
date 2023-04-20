const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// create, find, update, delete etc(functions)
router.post("/", userController.find);
router.post("/adduser", userController.create);
router.post("/edituser/:id", userController.update);

router.get("/", userController.view);
router.get("/adduser", userController.form);
router.get("/edituser/:id", userController.edit);
router.get("/:id", userController.delete);
router.get("/viewuser/:id", userController.viewall);

// Router
// router.get("", (req, res) => {
//   res.render("home");
// });

module.exports = router;

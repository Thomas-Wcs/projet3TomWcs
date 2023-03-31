const express = require("express");

const router = express.Router();

const ItemController = require("../controllers/itemControllers");

router.get("/", ItemController.browse);
router.get("/:id", ItemController.read);
router.put("/:id", ItemController.edit);
router.post("/", ItemController.add);
router.delete("/:id", ItemController.destroy);

module.exports = router;

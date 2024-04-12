import express from "express";
import groupsControl from "../controllers/group.controller.js"

const router = express.Router();

router.get('/', groupsControl.getAll)
router.get('/:id', groupsControl.getId)

export default router;
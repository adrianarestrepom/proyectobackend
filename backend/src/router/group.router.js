import groupsControl from "../controllers/group.controller.js";
import express from 'express';

const router = express.Router();

router.get('/', groupsControl.getAll);
router.get('/:id', groupsControl.getId);
router.post('/' , groupsControl.postGroup);

export default router;
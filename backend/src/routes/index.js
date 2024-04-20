import groupsControl from "../controllers/group.controller.js";
import Router from 'express-promise-router';

const router = Router();

router.get('/', groupsControl.getAll);
router.get('/:id', groupsControl.getId);
router.post('/' , groupsControl.postGroup);

export default router;
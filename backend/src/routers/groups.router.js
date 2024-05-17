import Router from "express-promise-router";
import Controller from "../controllers/groups.controller.js";

const GroupsRouter = () => {

    const router = Router();
    const controller = Controller();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);

    return router;

};

export default GroupsRouter;

// const router = express.Router();


// router.get('/:id', groupsControl.getId);
// router.post('/' , groupsControl.postGroup);

// export default router;
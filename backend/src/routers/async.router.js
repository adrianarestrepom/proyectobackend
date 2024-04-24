import Router from "express-promise-router";
import groupRouter from "./group.router.js";
import { connectDatabase, commitDatabase, rollbackDatabase } from "../lib/middleware/database.middleware.js";

const AsyncRouter = () => {
    const router = Router ();

    router.use(connectDatabase);
    router.use("/",  groupRouter());
    router.use(commitDatabase);
    router.use(rollbackDatabase);

    return router;

};

export default AsyncRouter


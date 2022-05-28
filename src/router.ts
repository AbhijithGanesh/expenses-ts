import { json, Router } from "express";
import modes from "./routers/modes";
import { PaymentRouter } from "./Routers/payments";
import users from "./routers/user";

const router: Router = Router();

router.use(json());
router.use("/payments", PaymentRouter);
router.use("/modes", modes);
router.use("/users", users);

export default router;

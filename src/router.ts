import { json, Router } from "express";
import payments from "./Routers/payments";

const router: Router = Router();

router.use(json());
router.use("/payments", payments);

export default router;

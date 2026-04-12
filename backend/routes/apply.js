import express from "express";
import { multerMiddleware } from "../utils/multerConfig.js";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  hardDeleteApplication,
  softDeleteApplication,
  updateApplicationStatus,
} from "../controllers/apply.js";

const applyRouter = express.Router();

applyRouter.post(
  "/create",
  multerMiddleware([
    { name: "resume", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  createApplication
);

applyRouter.get("/all", getAllApplications);

applyRouter.get("/:id", getApplicationById);

applyRouter.patch("/status/:id", updateApplicationStatus);

applyRouter.patch("/soft-delete/:id", softDeleteApplication);

applyRouter.delete("/hard-delete/:id", hardDeleteApplication);

export default applyRouter;

import express from "express";
import {
  createPageContent,
  getAllPageContents,
  getPageContentById,
  hardDeletePageContent,
  restorePageContent,
  softDeletePageContent,
  toggleActivePageContent,
  updatePageContent,
  updatePageImages,
} from "../controllers/pageContent.js";
import { multerMiddleware } from "../utils/multerConfig.js";

const pageContentRouter = express.Router();

pageContentRouter.post("/create", createPageContent);

pageContentRouter.get("/all", getAllPageContents);

pageContentRouter.put("/update/:id", updatePageContent);

pageContentRouter.put(
  "/update-images/:id",
  multerMiddleware([
    { name: "heroBackground", maxCount: 1 },
    { name: "columnImages", maxCount: 10 },
    { name: "featureIcons", maxCount: 10 },
    { name: "testimonialAvatars", maxCount: 10 },
    { name: "badgeIcons", maxCount: 10 },
  ]),
  updatePageImages
);

pageContentRouter.get("/:id", getPageContentById);

pageContentRouter.patch("/soft-delete/:id", softDeletePageContent);

pageContentRouter.patch("/restore/:id", restorePageContent);

pageContentRouter.patch("/toggle/:id", toggleActivePageContent);

pageContentRouter.delete("/hard-delete/:id", hardDeletePageContent);

export default pageContentRouter;

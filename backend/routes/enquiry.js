import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  hardDeleteEnquiry,
  softDeleteEnquiry,
  updateEnquiryStatus,
} from "../controllers/enquiry.js";

const enquiryRouter = express.Router();

enquiryRouter.post("/create", createEnquiry);

enquiryRouter.get("/all", getAllEnquiries);

enquiryRouter.get("/:id", getEnquiryById);

enquiryRouter.patch("/status/:id", updateEnquiryStatus);

enquiryRouter.patch("/soft-delete/:id", softDeleteEnquiry);

enquiryRouter.delete("/hard-delete/:id", hardDeleteEnquiry);

export default enquiryRouter;

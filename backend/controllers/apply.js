import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import Apply from "../models/applyFormModal.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import { sendMail } from "../utils/sendMail.js";

export const createApplication = CatchAsyncError(async (req, res, next) => {
  const { fullName, email, phone, address, position, experience, shift } =
    req.body;

  const resumeFile = req.files?.resume?.[0];
  const profileImageFile = req.files?.profileImage?.[0];

  const resumeFilePath = resumeFile?.path;
  const profileImageFilePath = profileImageFile?.path;

  if (!fullName) return next(new ErrorHandler("Full Name is required", 400));
  if (!email) return next(new ErrorHandler("Email Address is required", 400));
  if (!phone) return next(new ErrorHandler("Phone Number is required", 400));
  if (!address)
    return next(new ErrorHandler("Address / City is required", 400));
  if (!position)
    return next(new ErrorHandler("Position Applying For is required", 400));
  if (experience === undefined)
    return next(new ErrorHandler("Experience is required", 400));
  if (!shift)
    return next(new ErrorHandler("Shift Preference is required", 400));
  if (!resumeFilePath)
    return next(new ErrorHandler("Resume / Document is required", 400));
  if (!profileImageFilePath)
    return next(new ErrorHandler("Profile Image is required", 400));

  let uploadedResumeUrl;
  let uploadedProfileImageUrl;

  try {
    const resumeResult = await cloudinary.uploader.upload(resumeFilePath, {
      folder: "applications/resumes",
      resource_type: "auto",
    });
    uploadedResumeUrl = resumeResult.secure_url;

    const profileImageResult = await cloudinary.uploader.upload(
      profileImageFilePath,
      {
        folder: "applications/profileImages",
        resource_type: "image",
      }
    );
    uploadedProfileImageUrl = profileImageResult.secure_url;

    const application = await Apply.create({
      fullName,
      email,
      phone,
      address,
      position,
      experience,
      shift,
      resume: uploadedResumeUrl,
      profileImage: uploadedProfileImageUrl,
    });

    try {
      await sendMail({
        email: process.env.ADMIN_MAIL,
        subject: `New Application Received: ${position}`,
        template: "application.ejs",
        data: { application },
      });
    } catch (mailError) {
      console.error("Mail sending failed:", mailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    next(err);
  } finally {
    [resumeFilePath, profileImageFilePath].forEach((filePath) => {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete local file:", err.message);
        });
      }
    });
  }
});

export const getAllApplications = CatchAsyncError(async (req, res, next) => {
  const { position, shift, page = 1, limit = 10 } = req.query;

  const filters = {};
  if (position) filters.position = position;
  if (shift) filters.shift = shift;

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);
  const skip = (pageNumber - 1) * pageSize;

  const totalApplications = await Apply.countDocuments(filters);

  const applications = await Apply.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  if (!applications || applications.length === 0) {
    return next(new ErrorHandler("No applications found", 404));
  }

  res.status(200).json({
    success: true,
    totalApplications,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalApplications / pageSize),
    applications,
  });
});

export const getApplicationById = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const application = await Apply.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }

  res.status(200).json({
    success: true,
    application,
  });
});

export const updateApplicationStatus = CatchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return next(new ErrorHandler("Status is required", 400));
    }

    const validStatuses = ["pending", "reviewed", "accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return next(
        new ErrorHandler(
          `Invalid status. Valid options: ${validStatuses.join(", ")}`,
          400
        )
      );
    }

    const application = await Apply.findById(id);

    if (!application) {
      return next(new ErrorHandler("Application not found", 404));
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  }
);

export const softDeleteApplication = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const application = await Apply.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }

  if (application.isDeleted) {
    return next(new ErrorHandler("Application already deleted", 400));
  }

  application.isDeleted = true;
  application.deletedAt = Date.now();
  await application.save();

  res.status(200).json({
    success: true,
    message: "Application soft deleted successfully",
    application,
  });
});

export const hardDeleteApplication = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const application = await Apply.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: "Application permanently deleted",
  });
});

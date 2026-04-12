import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import Enquiry from "../models/enquiryModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendMail } from "../utils/sendMail.js";

export const createEnquiry = CatchAsyncError(async (req, res, next) => {
  const { name, email, phone, location, serviceType, startDate } = req.body;

  if (!name || name.trim().length < 2) {
    return next(
      new ErrorHandler(
        "Name is required and must be at least 2 characters",
        400
      )
    );
  }

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return next(new ErrorHandler("Valid email is required", 400));
  }

  if (!phone || !/^\+?[0-9]{7,15}$/.test(phone)) {
    return next(new ErrorHandler("Valid phone number is required", 400));
  }

  if (!location || location.trim().length < 3) {
    return next(
      new ErrorHandler(
        "Location is required and must be at least 3 characters",
        400
      )
    );
  }

  const validServices = ["cctv", "guard", "event-security"];
  if (!serviceType || !validServices.includes(serviceType)) {
    return next(
      new ErrorHandler(
        `Service type must be one of: ${validServices.join(", ")}`,
        400
      )
    );
  }

  if (!startDate || isNaN(Date.parse(startDate))) {
    return next(new ErrorHandler("Valid start date is required", 400));
  }

  const enquiry = await Enquiry.create({
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    location: location.trim(),
    serviceType,
    startDate,
  });

  sendMail({
    email: process.env.ADMIN_MAIL,
    subject: `New Enquiry Received: ${serviceType}`,
    template: "enquiry.ejs",
    data: { enquiry },
  }).catch((err) => {
    console.error("Mail sending failed:", err.message);
  });

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully",
    enquiry,
  });
});

export const getAllEnquiries = CatchAsyncError(async (req, res, next) => {
  let { page = 1, limit = 10, serviceType, search } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  const query = {};

  if (serviceType) {
    query.serviceType = serviceType.toLowerCase();
  }

  if (search) {
    const regex = new RegExp(search, "i");
    query.$or = [
      { name: regex },
      { email: regex },
      { phone: regex },
      { location: regex },
    ];
  }

  const totalEnquiries = await Enquiry.countDocuments(query);
  const totalPages = Math.ceil(totalEnquiries / limit);
  const skip = (page - 1) * limit;

  const enquiries = await Enquiry.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!enquiries || enquiries.length === 0) {
    return next(new ErrorHandler("No enquiries found", 404));
  }

  res.status(200).json({
    success: true,
    totalEnquiries,
    totalPages,
    currentPage: page,
    enquiries,
  });
});

export const getEnquiryById = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("Invalid Enquiry ID", 400));
  }

  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    return next(new ErrorHandler("Enquiry not found", 404));
  }

  res.status(200).json({
    success: true,
    enquiry,
  });
});

export const updateEnquiryStatus = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("Invalid Enquiry ID", 400));
  }

  const allowedStatuses = ["pending", "in-progress", "completed", "cancelled"];
  if (!status || !allowedStatuses.includes(status)) {
    return next(
      new ErrorHandler(
        `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`,
        400
      )
    );
  }

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    return next(new ErrorHandler("Enquiry not found", 404));
  }

  enquiry.status = status;
  await enquiry.save();

  res.status(200).json({
    success: true,
    message: `Enquiry status updated to ${status}`,
    enquiry,
  });
});

export const softDeleteEnquiry = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("Invalid Enquiry ID", 400));
  }

  const enquiry = await Enquiry.findById(id);
  if (!enquiry || enquiry.isDeleted) {
    return next(new ErrorHandler("Enquiry not found or already deleted", 404));
  }

  enquiry.isDeleted = true;
  enquiry.deletedAt = new Date();
  await enquiry.save();

  res.status(200).json({
    success: true,
    message: "Enquiry soft deleted successfully",
    enquiry,
  });
});

export const hardDeleteEnquiry = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("Invalid Enquiry ID", 400));
  }

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    return next(new ErrorHandler("Enquiry not found", 404));
  }

  await enquiry.deleteOne();

  res.status(200).json({
    success: true,
    message: "Enquiry permanently deleted",
  });
});


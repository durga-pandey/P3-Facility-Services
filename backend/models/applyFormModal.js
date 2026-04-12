import mongoose from "mongoose";

const ApplySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
      minlength: [3, "Full Name must be at least 3 characters"],
      maxlength: [100, "Full Name must be at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?\d{7,15}$/, "Please fill a valid phone number"],
    },
    address: {
      type: String,
      required: [true, "Address/City is required"],
      trim: true,
      maxlength: [200, "Address must be at most 200 characters"],
    },
    position: {
      type: String,
      enum: ["guard", "supervisor", "driver"],
      required: [true, "Position applying for is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
      max: [50, "Experience cannot exceed 50 years"],
    },
    shift: {
      type: String,
      enum: ["day", "night", "24hr"],
      required: [true, "Shift preference is required"],
    },
    resume: {
      type: String,
      required: [true, "Resume/document is required"],
    },
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Apply = mongoose.model("Apply", ApplySchema);
export default Apply;

import mongoose from "mongoose";
import validator from "validator";

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be less than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email address"],
      index: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /^\+?\d{7,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [200, "Location must be less than 200 characters"],
    },
    serviceType: {
      type: String,
      enum: ["cctv", "guard", "event-security"],
      required: [true, "Service type is required"],
      index: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes must be less than 1000 characters"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

EnquirySchema.index({ email: 1, phone: 1 });
EnquirySchema.index({ serviceType: 1, status: 1, startDate: -1 });

EnquirySchema.methods.softDelete = async function () {
  this.deletedAt = new Date();
  await this.save();
};

EnquirySchema.virtual("deletedFlag").get(function () {
  return !!this.deletedAt;
});


const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

export default Enquiry;

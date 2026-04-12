import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  icon: {
    public_id: { type: String, required: false },
    secure_url: { type: String, required: false },
  },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: null },
  image: {
    public_id: { type: String },
    secure_url: { type: String },
  },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const StatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  suffix: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const TestimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: {
    public_id: { type: String, required: false },
    secure_url: { type: String, required: false },
  },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const BadgeSchema = new mongoose.Schema({
  icon: {
    public_id: { type: String, required: false },
    secure_url: { type: String, required: false },
  },
  text: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const SectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["hero", "description", "trust"],
    required: true,
  },
  hero: {
    title: String,
    animatedWords: [String],
    tagline: String,
    backgroundImage: {
      public_id: { type: String },
      secure_url: { type: String },
    },
  },
  description: {
    heading: String,
    subheading: String,
    columns: [ColumnSchema],
    features: [FeatureSchema],
  },
  trust: {
    heading: String,
    subheading: String,
    stats: [StatSchema],
    testimonials: [TestimonialSchema],
    badges: [BadgeSchema],
  },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

// Page schema
export const PageSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    sections: [SectionSchema],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PageContent = mongoose.model("PageContent", PageSchema);
export default PageContent;

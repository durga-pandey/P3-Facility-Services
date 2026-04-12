import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import morgan from "morgan";
import http from "http";
// import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.js";
import pageContentRouter from "./routes/pageContent.js";
import enquiryRouter from "./routes/enquiry.js";
import applyRouter from "./routes/apply.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API WORKING",
  });
});

app.set("trust proxy", true);

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization, Origin, Accept",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// app.use(cookieParser());

app.use("/api/v1/pageContent", pageContentRouter);
app.use("/api/v1/enquiry", enquiryRouter);
app.use("/api/v1/application", applyRouter);

app.use(ErrorMiddleware);

// app.all("*", (req, res, next) => {
//   const err = new Error(`Route ${req.originalUrl} not found`);
//   err.statusCode = 404;
//   next(err);
// });

if (process.env.NODE_ENV !== "test") {
  //   initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
  });
}

export default app;

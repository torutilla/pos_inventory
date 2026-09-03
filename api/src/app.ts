import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/api/v1", apiRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
//* libraries and packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

//* validating all the env
import {validateEnv} from "@/utils";

validateEnv();

//* configs
import {connectDb} from "@/configs";
import {connectRedis} from "@/configs";

//* routers
import authRouter from "@/routers/auth.router";
import {notFoundHandler} from "@/middlewares";
import {errorHandler} from "@/middlewares";
import {env} from "@/configs";
import profileRouter from "./routers/profile.router";
import blogRouter from "./routers/blog.router";
import voteRouter from "./routers/vote.router";
import followRouter from "./routers/follow.router";

const app = express();

app.use(
    cors({
        origin: env.CLIENT_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/health', (_req, res) => {
    console.log('health checkup')
    res.status(200).send('Healthy')
})

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/follow", followRouter);
app.use("/api/blog", blogRouter);
app.use("/api/vote", voteRouter);

app.use(notFoundHandler);

app.use(errorHandler);

const startServer = async () => {
    await connectDb();
    await connectRedis();
    app.listen(env.PORT, () => console.log(`Server started at ${env.PORT} ✅`));
}

startServer();
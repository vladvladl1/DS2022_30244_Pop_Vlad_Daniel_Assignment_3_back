import express, {Express, Router} from "express";
import userRouter from "./userRoute"
import authRouter from "./authRouter";
import firstRouter from "./firstRoute";
import authAdminRouter from "./energyRouter";
import adminRouter from "./deviceRouter";


const appRoute:Express = express();

var cors = require('cors');
appRoute.use(cors());
appRoute.use(express.json());
appRoute.use("/", firstRouter);
appRoute.use("/auth", authRouter);
appRoute.use("/user", userRouter);
appRoute.use("/energy", authAdminRouter);
appRoute.use("/device", adminRouter);

export default appRoute;
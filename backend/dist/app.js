"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/user", routes_1.userRouter);
app.use("/auth", routes_1.authRouter);
app.use("/plans", routes_1.planRoutes);
app.use("/classes", routes_1.classRouter);
app.use("/schedules", routes_1.scheduleRoutes);
app.use("/acess", routes_1.acessRoutes);

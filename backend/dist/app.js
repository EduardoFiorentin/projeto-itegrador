"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("./routes");
const AuthService_1 = require("./services/AuthService");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: 'alguma_frase_muito_doida_pra_servir_de_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, AuthService_1.authServiceConfig)();
app.use("/user", routes_1.userRouter);
app.use("/auth", routes_1.authRouter);
app.use("/plans", routes_1.planRoutes);
app.use("/classes", routes_1.classRouter);
app.use("/schedules", routes_1.scheduleRoutes);
app.use("/acess", routes_1.acessRoutes);
app.use("/modality", routes_1.modalityRoutes);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const routes_1 = require("./routes");
const AuthService_1 = require("./services/AuthService");
const PostgresDB_1 = require("./services/PostgresDB");
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
app.use("/admin/new-user", 
// requireJWTAuth, 
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const { name, cpf, email, password, role, dtbirth, address, pnumber, accesscode } = req.body;
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPasswd = bcrypt_1.default.hashSync(password, salt);
        yield PostgresDB_1.database.none("insert into users(name, cpf, email, password, role, dtbirth, address, pnumber, accesscode) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [name, cpf, email, hashedPasswd, role, dtbirth, address, pnumber, accesscode]);
        res.status(200).send("Usuário cadastrado");
    }
    catch (err) {
        res.status(400).send("Usuário não cadastrado");
        return;
    }
}));

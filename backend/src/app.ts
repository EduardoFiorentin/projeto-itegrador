import express from "express"
import { authRouter, classRouter, planRoutes, scheduleRoutes, userRouter, acessRoutes } from "./routes"

const app = express()
app.use(express.json())

app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/plans", planRoutes)
app.use("/classes", classRouter)
app.use("/schedules", scheduleRoutes)
app.use("/acess", acessRoutes)

export { app }
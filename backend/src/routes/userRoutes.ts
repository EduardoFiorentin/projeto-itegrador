import { Router } from "express";

const userRouter = Router()


// Estudantes
userRouter.post("/new-student", (req, res) => {
    res.status(200).send("Novo estudante cadastrado")
})

userRouter.get("/students", (req, res) => {
    res.status(200).send("Lista de estudantes retornada")
})

userRouter.get("/students/:cpf", (req, res) => {
    res.status(200).send("Estudante relativo ao cpf informado retornado")
})


// Funcionários
userRouter.post("/new-employer", (req, res) => {
    res.status(200).send("Novo funcionário cadastrado")
})

userRouter.get("/employers", (req, res) => {
    res.status(200).send("Lista de estudantes retornada")
})

userRouter.get("/employers/:cpf", (req, res) => {
    res.status(200).send("Funcionário relativo ao cpf informado")
})

export {userRouter}
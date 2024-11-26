import { Router } from "express";
import { requireJWTAuth } from "../services/AuthService";
import { StudentsController } from "../controllers";
import { usersController } from "../controllers/usersController";

const userRouter = Router()


// Crud Estudantes
userRouter.post("/new-student",
    requireJWTAuth,
    StudentsController.CreateStudent.createStudentValidate,
    StudentsController.CreateStudent.createStudent
)
userRouter.post("/delete-student",
    requireJWTAuth,
    StudentsController.DeleteStudent.deleteStudentValidate,
    StudentsController.DeleteStudent.deleteStudent,
)
userRouter.post("/getbyname-student",
    requireJWTAuth,
    StudentsController.GetByName.getStudentByNameValidate,
    StudentsController.GetByName.getStudentByName
)
userRouter.post("/update-student/:cpf",
    requireJWTAuth,
    StudentsController.UpdateStudent.updateStudentValidate,
    StudentsController.UpdateStudent.updateStudent
)



userRouter.get("/students", (req, res) => {
    res.status(200).send("Lista de estudantes retornada")
})


userRouter.get("/getTeachers", 
    requireJWTAuth,
    usersController.getFreeTeachersByDate.getFreeTeachersByDateValidate,
    usersController.getFreeTeachersByDate.getFreeTeachersByDate
)

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
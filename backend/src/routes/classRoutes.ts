import { Router } from "express";
import { requireJWTAuth } from "../services/AuthService";
import { GroupClassesController } from "../controllers";
import { RequestClassesController } from "../controllers/requestClassesController";

const classRouter = Router()

classRouter.get("/getbyday-groupclass/:day", 
    requireJWTAuth,
    GroupClassesController.GetByDay.getAllByDayValidate,
    GroupClassesController.GetByDay.getAllByDay
)

classRouter.post("/create-groupclass", 
    requireJWTAuth,
    GroupClassesController.CreateGroupClass.createGroupClassesValidate,
    GroupClassesController.CreateGroupClass.createGroupClasses
)

classRouter.post("/cancel-groupClass",
    requireJWTAuth,
    GroupClassesController.CancelGroupClass.CancelGrupeClass,
    GroupClassesController.CancelGroupClass.CancelGrupeClassValidate
)
classRouter.post("/update-groupClass/:code",
    requireJWTAuth,
    GroupClassesController.UpdateGroupClass.updateGroupClassValidate,
    GroupClassesController.UpdateGroupClass.updateGroupClass
)


// classRouter.get("/getbyday-personalclass/:day", 
//     // requireJWTAuth,
    
// )

// classRouter.post("/create-personalclass", 
//     requireJWTAuth,

// )

// classRouter.post("/cancel-personalClass",
//     requireJWTAuth,

// )
// classRouter.post("/update-personalClass/:code",
//     requireJWTAuth,

// )


// classes/getall-requestClass
classRouter.get("/getall-requestClasses", 
    requireJWTAuth,
    RequestClassesController.GetAll.getAllValidate,
    RequestClassesController.GetAll.getAll
)

classRouter.post("/create-requestclass", 
    requireJWTAuth,
    RequestClassesController.CreateRequestClass.createRequestClassValidate,
    RequestClassesController.CreateRequestClass.createRequestClass
)

classRouter.post("/handle-requestClass",
    requireJWTAuth,
    RequestClassesController.Handle.handleValidate,
    RequestClassesController.Handle.handle

)
classRouter.post("/delete-requestClass",
    requireJWTAuth,
    RequestClassesController.DeleteRequestClass.deleteRequestClassValidate,
    RequestClassesController.DeleteRequestClass.deleteRequestClass,
)



// solicitação de agendamento de aulas
classRouter.post("/subscribe-group", 
    requireJWTAuth,
    GroupClassesController.Subscribe.subscribeValidate,
    GroupClassesController.Subscribe.subscribe
)

// classRouter.post("/request-personal", (req, res) => {
//     res.status(200).send("Solicitação de agendamento de aula enviada")
// })

// classRouter.post("/confirm-class", (req, res) => {
//     res.status(200).send("Solicitação de agendamento aceita")
// })

// classRouter.post("/reject-class", (req, res) => {
//     res.status(200).send("Solicitação de agendamento recusada")
// })

// // Aulas que usam id 
// classRouter.get("/:id", (req, res) => {
//     res.status(200).send("Aula com id retornada")
// })

// classRouter.get("/participants/:id", (req, res) => {
//     res.status(200).send("Lista de participantes da aula id retornada")
// })

export { classRouter }
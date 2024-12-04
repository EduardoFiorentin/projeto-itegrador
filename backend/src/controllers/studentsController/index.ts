import * as CreateStudent from "./create"
import * as DeleteStudent from './delete'
import * as GetByName from './getByName'
import * as UpdateStudent from './uptade'
import * as Search from './search'

export const StudentsController = {
    CreateStudent, DeleteStudent, GetByName, UpdateStudent, Search
}
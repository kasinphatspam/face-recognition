import { Contact } from "./contact.entity"
import { Department } from "./department.entity"
import { Organization, OrganizationDepartment} from "./organization.entity"
import { User } from "./user.entity"

const entities = [ 
    User, 
    Organization, 
    OrganizationDepartment, 
    Department, 
    Contact 
]

export { 
    User, 
    Organization, 
    OrganizationDepartment, 
    Department, 
    Contact  
}

export default entities
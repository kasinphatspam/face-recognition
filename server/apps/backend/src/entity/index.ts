import { Contact } from "./contact.entity"
import { Department } from "./department.entity"
import { Organization, OrganizationDepartment, OrganizationContact, OrganizationRole} from "./organization.entity"
import { User } from "./user.entity"

const entities = [ 
    User, 
    Organization, 
    OrganizationDepartment, 
    OrganizationContact, 
    OrganizationRole, 
    Department, 
    Contact 
]

export { 
    User, 
    Organization, 
    OrganizationDepartment, 
    OrganizationContact, 
    OrganizationRole, 
    Department, 
    Contact  
}

export default entities
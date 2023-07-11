export class UpdateUserDto {
    public id: string
    public email: string
    public password: string
    public fname: string
    public lname: string
    public gender: string
    public dob: Date
    public profile_image: string 
    public organization_id: Number
    public department_id: Number
    public role_id: Number
}

export class UpdateUserProfileDto {
    public id: string
    public profile_image: string
}
export class UpdateUserDto {
    public id: number
    public email: string
    public password: string
    public firstname: string
    public lastname: string
    public gender: string
    public dob: Date
    public profile_image: string 
    public organization_id: Number
    public department_id: Number
    public role_id: Number
}

export class GetUserByIdDto {
    public id: number
}

export class UpdateUserProfileDto {
    public id: number
    public profile_image: string
}
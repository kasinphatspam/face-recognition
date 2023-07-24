class GetUserByIdDto {
    public userId: number
}

class UpdateUserDto {
    public userId: number
    public firstname: string
    public lastname: string
    public gender: string
    public dob: Date
    public profileImage: string 
    public organizationId: Number
    public departmentId: Number
    public roleId: Number
}

class UpdateUserImageDto {
    public userId: number
    public image: string
}

class DeleteUserDto {
    public userId: number
}

export { GetUserByIdDto, UpdateUserDto, UpdateUserImageDto, DeleteUserDto }
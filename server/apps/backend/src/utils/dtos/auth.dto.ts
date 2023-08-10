class AuthLoginDto {
    public email: string
    public password: string
}

class AuthRegisterDto {
    public email: string
    public password: string
    public firstname: string
    public lastname: string
    public gender: string
    public personalId: string
    public dob: Date
    public profileImage: string
}

class AuthForgotPasswordDto {
    public email: string
}

export { AuthLoginDto, AuthRegisterDto, AuthForgotPasswordDto }
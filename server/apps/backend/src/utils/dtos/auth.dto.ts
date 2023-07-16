export class AuthLoginDto {
    public email: string
    public password: string
}

export class AuthRegisterDto {
    public email: string
    public password: string
    public firstname: string
    public lastname: string
    public gender: string
    public dob: Date
    public profile_image: string
}

export class AuthForgotPasswordDto {
    public email: string
}
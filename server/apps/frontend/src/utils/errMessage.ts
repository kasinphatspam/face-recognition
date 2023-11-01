// filter non-human readable message 
export function messageCode(code: string): string {
    
    const map: { [key: string]: string } = {
        "This email already exists." : "This email already exists.",
        "This personalId already exists." : "This personal identify number already exists.",
        "Password Incorrect." : "The email address or password you entered is invalid.",
        "Not found" : "The email address or password you entered is invalid.",
        "Internal server error" : "Server not responding, check out later.",
        //AxiosError
        "NetworkError" : "request timeout, please check your connection"
    }
    return map[code] ?? code
    
}
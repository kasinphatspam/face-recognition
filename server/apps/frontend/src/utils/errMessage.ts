// filter non-human readable message 
export function messageCode(code: string): string {
    
    const map: { [key: string]: string } = {
        // Backend error message
        "This email already exists." : "This email already exists.",
        "This personalId already exists." : "This personal identify number already exists.",
        "Password Incorrect." : "The email address or password you entered is invalid.",
        "Not found" : "The email address or password you entered is invalid.",
        "Internal server error" : "Server not responding, check out later.",
        //AxiosError
        "Network Error" : "Request timeout, please check your connection",
        "Request failed with status code 400": "Organize not found, try to check your code"
    }
    return map[code] ?? code
    
}
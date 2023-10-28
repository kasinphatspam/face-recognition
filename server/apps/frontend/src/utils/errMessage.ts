

export function messageCode(code: number): string {
    const map = {
        "This email already exists." : "This email already exists.",
        "This personalId already exists." : "This personal identify number already exists.",
        "Password Incorrect." : "The email address or password you entered is invalid.",
        "Not found" : "The email address or password you entered is invalid.",
        "Internal server error" : "Server not responding, check out later."
    }

    return map[code] ?? "Too many Request!."
}
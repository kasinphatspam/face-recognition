

export function message(code: number): string {
    let text = ""
    switch (code) {
        case 400:
            text = "You have entered an invalid username or password."
            break;
        case 500:
            text = "Server not responding, check out later."
            break;
        default:
            text = "Too many requested"
            break;
    }
    return text
}
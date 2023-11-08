import { useState } from "react";
 
/** useLocalStorage: useState dynamic to localstorage */
const useLocalStorage = (key: string, defaultValue: unknown) => {
    // Create state variable to store
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const value = localStorage.getItem(key)             
            // If value is already present in localStorage and then return it
            if (value) {
                return JSON.parse(value)
            } else {
                // Else set default value in localStorage and then return it
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue
            }
        } catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue
        }
    })
 
    /** this method update our localStorage and our state */
    const setLocalStorageStateValue = (valueOrFn: unknown) => {
        let newValue: unknown;
        if (typeof valueOrFn === 'function') {
            const fn = valueOrFn;
            newValue = fn(localStorageValue)
        }
        else {
            newValue = valueOrFn;
        }
        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue)
    }
    return [localStorageValue, setLocalStorageStateValue]
}
 
export default useLocalStorage;
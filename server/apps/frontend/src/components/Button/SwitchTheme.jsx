import React from "react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { Sun, Moon } from "react-feather";
import useLocalStorage from "@/utils/useLocalstorage";

export default function Switchthemebutton(props) {
    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps
    } = useSwitch(props);
    const [theme, setTheme] = useLocalStorage('theme', 'light')

    React.useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [theme])

    React.useEffect(() => {
        if (isSelected) setTheme('light')
        else setTheme('dark')
    }, [isSelected])

    return (
        <Component {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: [
                        "w-7 h-7",
                        "flex items-center justify-center",
                        "rounded-lg bg-default-50 hover:bg-default-200",
                    ],
                })}
            >
                {isSelected ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
            </div>
        </Component>
    )
}
import React from "react";
import { Switch } from "@nextui-org/react";
import { Sun, Moon } from "react-feather";
import useLocalStorage from "@/utils/useLocalstorage";

export default function Switchthemebutton() {
    const [theme, setTheme] = useLocalStorage('theme','light')

    React.useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
      }, [theme])
    
    return (
        <Switch
        isSelected={theme == "dark" ? true : false}
        onValueChange={(e) => {
            if (e) setTheme("dark")
            else setTheme("light")
        
        }}
        size="lg"
        color="default"
        startContent={<Sun />}
        endContent={<Moon />}
      >
      </Switch>
  
    )
}
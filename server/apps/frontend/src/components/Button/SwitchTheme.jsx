import { useEffect } from "react";
import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { Sun, Moon } from "react-feather";
import useLocalStorage from "@/utils/useLocalstorage";

export default function Switchthemebutton(props) {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div onClick={() => handleClick()}
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "w-7 h-7",
            "flex items-center justify-center",
            "rounded-lg bg-default-50 hover:bg-default-200",
          ],
        })}
      >
        {
        isSelected ? (theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />) 
          : (theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)
          }
      </div>
    </Component>
  );
}

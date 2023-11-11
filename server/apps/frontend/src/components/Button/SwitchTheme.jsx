import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { Sun, Moon } from "react-feather";
import { useTheme } from "@/contexts/ThemeContext";

export default function Switchthemebutton(props) {
  const { theme, changeTheme } = useTheme();
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  const handleClick = () => {
    changeTheme();
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

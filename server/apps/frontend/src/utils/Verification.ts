import { useState, useEffect } from "react";

export function useVerification(codeLength: number) {
  let inputClass = "code-digit";
  // array collect all state
  let inputStates = [];
  // create state for each input variable
  for (let i = 0; i < codeLength; i++) {
    const [digit, setDigit] = useState("");
    inputStates.push({ digit, setDigit });
  }
  // create state for collect all code
  let [code, setCode] = useState<string | null>(null);

  // handle value change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // get value change value from user
    let entry = e.target.value;
    // limit code per input to 1 digit
    if (entry.length <= 1 && !Number.isNaN(entry)) {
      // set and limit code to input box
      inputStates[index].setDigit(entry[0]);

      if (entry.length === 1) {
        if (index < codeLength - 1) {
          let nextInput = document.querySelectorAll(`.${inputClass}`)[
            index + 1
          ] as HTMLInputElement;
          if (nextInput.value === "") {
            nextInput.focus();
          } else if (nextInput.value !== undefined) {
            nextInput.value = "";
            nextInput.focus();
          }
        }
      } else if (entry.length === 0) {
        let prevInput = document.querySelectorAll(`.${inputClass}`)[
          index - 1
        ] as HTMLInputElement;
        if (prevInput !== undefined) {
          prevInput.focus();
        }
      }
    } else return;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    if (pastedText !== undefined && pastedText.length === codeLength) {
      for (let i = 0; i < codeLength; i++) {
        inputStates[i].setDigit(pastedText.charAt(i));
      }
    }
  };

  // handle keyboard user event down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    ["/", "*", "+", "-", "."].includes(e.key) && e.preventDefault();
  };

  useEffect(() => {
    // create current code inline Number
    let finalCode = inputStates
      .map((input) => {
        return input.digit;
      })
      .join("");
    // check current code length and input length
    if (finalCode.length === codeLength) {
      setCode(finalCode);
    } else {
      setCode(null);
    }
  }, [inputStates]);

  return {
    code,
    inputStates,
    inputClass,
    handleChange,
    handleKeyDown,
    handlePaste,
  };
}

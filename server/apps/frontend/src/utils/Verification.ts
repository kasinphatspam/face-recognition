import { useState, useEffect } from "react"

export default function useVerification(codeLength: number) {

  let inputClass = "code-digit";
  // array collect all state
  let inputStates = []
  // create state for each input variable
  for (let i = 0;i < codeLength; i++) {
    const [digit, setDigit] = useState("");
    inputStates.push({ digit, setDigit })
  }
  // create state for collect all code
  let [code, setCode] = useState(null);

  // handle value change
  const handleChange = (e, index) => {
    // get value change value from user
    let entry = e.target.value

    // limit code per input to 1 digit
    if (entry.length <= 1 && !Number.isNaN(entry)) {
      // set and limit code to input box
      inputStates[index].setDigit(e.target.value);
      if (entry.length === 1) {
        if (index < codeLength - 1) {
          let nextInput = document.querySelectorAll(`.${inputClass}`)[index + 1] as HTMLInputElement;
          if (nextInput.value === "") {
            nextInput.focus()
          }
        } 
      } else if (entry.length === 0) {
        let prevInput = document.querySelectorAll(`.${inputClass}`)[index - 1] as HTMLInputElement;
        if (prevInput !== undefined) {
          prevInput.focus()
        }
      }
    } else return;
  }

  // handle keyboard user event down
  const handleKeyDown = (e) => {
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  }

  useEffect(() => {

    // create current code inline Number
    let finalCode = inputStates.map((input) => { 
      return input.digit 
    }).join("");
    // check current code length and input length
    if (finalCode.length === codeLength) {
      setCode(finalCode)
    }
    else {
      setCode(null)
    }
  }, [inputStates])

  return { code, inputStates, inputClass, handleChange, handleKeyDown };
}
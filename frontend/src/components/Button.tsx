import { MouseEventHandler } from "react"

interface ButtonType {
  button: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

function Button({button,onClick}: ButtonType) {
  return (
    <button onClick={onClick} className=" w-full bg-heheblu hover:bg-Myblue  font-Hind text-white rounded-md py-2">
       {button}
    </button>
  )
}

export default Button
interface ButtonType {
  button: string
}

function Button({button}: ButtonType) {
  return (
    <button className=" w-96 bg-Myblue   font-Hind text-white rounded-md py-2">
       {button}
    </button>
  )
}

export default Button
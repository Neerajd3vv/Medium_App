import { ChangeEvent } from "react";

interface LabelInput  {
    label: string;
    placeholder : string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function Inputbox({label, placeholder, onChange,type}: LabelInput) {
  return (
    <div className="flex flex-col py-2 ">
        <label className="font-Hind font-semibold">{label}</label>
        <input onChange={onChange} className="border-2 w-96   rounded-md p-2" type={type || "text"} placeholder={placeholder} />
    </div>
  )
}

export default Inputbox
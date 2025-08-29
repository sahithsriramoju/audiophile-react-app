import { useFormContext } from "react-hook-form";

type RadioButtonProps = {
    id:string,
    label:string,
    checked:boolean,
    onChecked(value:string):void,
    name:string
}
export const RadioButton = ({id, label,checked,onChecked,name}:RadioButtonProps) => {
    const {formState:{errors},register} = useFormContext();
    /* const inputError = findInputError(errors,name);
    const isValid = isFormValid(inputError); */
    console.log(errors);
    return (
        <>
        <div className={`grid grid-cols-radio-button place-items-center py-4 px-4 my-2 border-2
         rounded-lg cursor-pointer transition-all ${checked ? "border-dark-brown":"border-grey-1"}`} onClick={()=>onChecked(id)} onChange={()=>onChecked(id)}>
          <input type="radio"  id={id} value={id} className="appearance-none peer  cursor-pointer col-start-1 row-start-1 w-5 h-5 border-2 border-grey-2
          rounded-full" checked={checked} {...register(name)} name={name} onChange={()=>onChecked(id)} ></input>
          <div className="pointer-events-none col-start-1 row-start-1 w-2 h-2 rounded-full peer-checked:bg-dark-brown"></div>
          <label htmlFor={id} className="col-start-2 row-start-1  ml-4 font-bold text-sm tracking-[-0.25px]">{label}</label>

       </div>
       
        </>
    )
}
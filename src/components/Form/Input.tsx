import { useFormContext } from "react-hook-form"
import { findInputError, type InputError } from "../../utils/findInputError";
import { isFormValid } from "../../utils/isFormValid";
import { MdError } from "react-icons/md";

type InputProps = {
    type: string,
    label: string,
    id: string,
    name: string,
    placeholder: string
}
export const Input = ({type, label, id, name, placeholder}: InputProps) =>{
    const{formState:{errors},register} = useFormContext();
    let inputError: InputError = {};
    const separatedName = name.split(".");

    if (Object.keys(errors).length > 0 && separatedName.length === 2) {
        const parent = (errors as Record<string, unknown>)[separatedName[0]];
        if (parent && typeof parent === "object") {
            inputError = findInputError(parent as Record<string, unknown>, separatedName[1]);
        }
    }
    else{
        inputError = findInputError(errors as Record<string,unknown>,name);
    }

    const isValid = isFormValid(inputError as Record<string,unknown>)
    return (
        <div className="flex flex-col my-3">
            <label htmlFor={id} className="text-xs font-bold my-2 tracking-tightest">{label}</label>
            <input id={id} type={type} placeholder={placeholder} className="py-4 px-4 border-2
            border-grey-1 rounded-lg placeholder:text-sm placeholder:text-content 
            placeholder:font-bold placeholder:tracking-[-0.25px] focus:border-dark-brown"
           {...register(name)} name={name}></input>
            {!isValid && <span className="text-input-warning text-xs font-light">
                <MdError className="inline mr-2"/>{inputError?.errors?.message}</span>}
        </div>
    )
}
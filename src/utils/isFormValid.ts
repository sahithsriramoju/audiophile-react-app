import type { InputError } from "./findInputError";

export function isFormValid (err:InputError){
    if (!err || !err.errors) return true;
    return Object.keys(err.errors).length === 0;
}
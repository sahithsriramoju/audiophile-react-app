import { Input } from "./Form/Input";

type AddressProps = {
    heading: string,
    type :string
}
export const Address = ({heading,type}:AddressProps) =>{
    return (
        <>
        <h3 className="uppercase text-xs text-light-brown font-bold">{heading}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
            <Input label="Address" type="text"  name={`${type}.addressLine`} id="address" placeholder="Building name, Area"></Input>
            </div>
            <Input label="City" type="text"  name={`${type}.city`} id="city" placeholder="Hyderabad..."></Input>
            <Input label="Country" type="text"  name={`${type}.country`} id="country" placeholder="India..."></Input>
            <Input label="State" type="text"  name={`${type}.state`} id="state" placeholder="TG"></Input>
            <Input label="ZIP Code" type="text"  name={`${type}.zipCode`} id="zipCode" placeholder="12345..."></Input>
        </div>
        </>
    )
}
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Address as AddressComponent } from "../components/Address";
import { OrderSummary } from "../components/OrderSummary";

export class Address{
    addressLine : string;
    phoneNumber: string;
    state : string;
    city: string;
    zipCode: string;
    country: string;
    /**
     *
     */
    constructor(addressLine: string, phoneNumber: string, state: string, city: string, zipCode: string, country: string) {
        this.addressLine = addressLine;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.city = city;
        this.zipCode = zipCode;
        this.country = country;
    }
}
export class Payment {
    paymentMethod : string;
    /**
     *
     */
    constructor(paymentMethod : string) {
        this.paymentMethod = paymentMethod;
    }
}
export class CheckoutForm {
    shippingAddress: Address;
    billingAddress: Address;
    payment: Payment;
    /**
     *
     */
    constructor(shippingAddress: Address, billingAddress: Address, payment: Payment) {
       this.shippingAddress = shippingAddress;
       this.billingAddress = billingAddress;
       this.payment = payment;
    }
}
export const Checkout = () => {
    const addressSchema = yup.object().shape({
        addressLine : yup.string().required("Street address is required"),
        phoneNumber : yup.string().required("Phone number is required"),
        state : yup.string().required("State is required"),
        city : yup.string().required("City is required"),
        zipCode : yup.string().required("Zip code is required"),
        country : yup.string().required("Country is required"),
    });
    const paymentSchema = yup.object().shape({
        paymentMethod : yup.string().required("payment method is required").oneOf(['cc','paypal','cod'])
    });
    const formData =  yup.object().shape({
        shippingAddress: addressSchema,
        billingAddress: addressSchema,
        payment: paymentSchema
    });
    const methods = useForm<CheckoutForm>({ resolver: yupResolver(formData) })
    const submitHandler = () => {
        ///integrate stripe payment method
    }
    return (
        <div className="bg-grey-2 flex flex-col py-8 md:flex-row md:px-2 xl:px-45">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-[3fr_1fr]">
                    <div id="customer-details" className="bg-white rounded-lg px-6 py-8 mx-6">
                        <AddressComponent heading="Shipping Info" type="shippingAddress"></AddressComponent>
                        <AddressComponent heading="Billing Info" type="billingAddress"></AddressComponent>
                        
                        <div className="flex flex-col my-3"> 
                            <button aria-label="Proceed to Payment" type="submit" disabled = {methods.formState.isSubmitting} className="grow my-7 text-white text-xs font-bold uppercase text-center py-4 px-8 bg-dark-brown hover:bg-light-brown active:bg-light-brown cursor-pointer">
                                Proceed to Payment
                            </button>
                        </div>    
                    </div>  
                    <div>
                        <OrderSummary></OrderSummary>
                    </div>
                </form>
            </FormProvider>

          {/*  <OrderSummary></OrderSummary> */}
        </div>
    )
}
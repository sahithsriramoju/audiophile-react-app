import type { MergedCartItem } from "./OrderSummary";
import { formatCurrency } from "../utils/formatCurrency";

export const OrderSummaryItem = ({productId, price, quantity, name, imageUrl}: MergedCartItem) =>{
    return (
        <li key={productId} className="mb-6">
            <div className="flex">
                <img alt={name} src={imageUrl} className="h-16 w-16 rounded-lg mr-5"></img>
                <div className="flex flex-col mr-5">
                    <span className="text-base font-bold">{name}</span>
                    <span className="text-content font-bold text-sm tracking-negative">{formatCurrency(price)}</span>
                </div>
                <span className="text-content font-bold text-sm tracking-negative">{"x"+quantity}</span>
                
            </div>
        </li>
    )
}
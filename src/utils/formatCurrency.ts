const CURRENCY_FORMATTER = Intl.NumberFormat(undefined,
    {style:"currency",currency:"USD"});

export const formatCurrency = (price:number) => {
    return CURRENCY_FORMATTER.format(price);
}
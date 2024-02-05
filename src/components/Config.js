
export const Currency = {
    CASH_INDEX: 'CASH',
    CASH: '现金',
    CASH_SYMBOL: '¥',
    VIRTUAL_INDEX: 'VIRTUAL',
    VIRTUAL: '花生币',
    VIRTUAL_SYMBOL: 'Ħ',
    SYMBOL: 'Ŧ'
};

export const CurrencyMap = {
    [Currency.CASH_INDEX]: Currency.CASH_SYMBOL,
    [Currency.VIRTUAL_INDEX]: Currency.VIRTUAL_SYMBOL
};

export const ShopType = {
    PRIVATE: 'PRIVATE',
    PUBLIC: 'PUBLIC'
};

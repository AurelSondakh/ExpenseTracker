export const formatCurrency = (amount: number): string => {
    return `IDR ${new Intl.NumberFormat('id-ID').format(amount)}`;
};
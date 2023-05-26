export function formatPrice(price: number) {
  const formatted = new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
  return formatted
}

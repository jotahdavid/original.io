/**
 * @param {number} value
 * @returns {string}
 */
export default function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

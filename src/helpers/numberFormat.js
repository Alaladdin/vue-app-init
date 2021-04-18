export default function numberFormat(num = 0) {
  if (num < 0) return '';
  return new Intl.NumberFormat().format(num);
}

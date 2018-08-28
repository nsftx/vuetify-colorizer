export default function toKebabCase(value) {
  return value.replace(/([a-z])([A-Z\d])/g, '$1-$2').toLowerCase();
}

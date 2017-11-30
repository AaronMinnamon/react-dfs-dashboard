export function getDate() {
  let date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}${month}${day}`;
}
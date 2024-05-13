export default function convertISODateToNativeDate(date: string) {
  const isoDate = date.split('T')[0];
  const [year, month, day] = isoDate.split('-');
  return `${month}/${day}/${year}`;
}

export default function generateReadableContentstackErrorMessage(errors: any) {
  let errorsMessage = '';
  for (const key in errors) {
    for (const message of errors[key]) {
      errorsMessage += `${key}: ${message}\n`;
    }
  }
  return errorsMessage;
}

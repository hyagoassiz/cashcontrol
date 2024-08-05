export const formatDate = (inputDate: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(inputDate)) {
    throw new Error("Data inválida. O formato correto é YYYY-MM-DD.");
  }

  const [year, month, day] = inputDate.split("-");

  return `${day}/${month}/${year}`;
};

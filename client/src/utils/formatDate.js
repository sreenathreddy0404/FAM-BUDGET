function formatDate(dateStr) {
  const inputDate = new Date(dateStr);
  const today = new Date();

  // Remove time part
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (today - inputDate) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return inputDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
export default formatDate;
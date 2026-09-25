export const statusClass = status => {
  if (status === "Approved") return "status-approved";
  if (status === "Rejected") return "status-rejected";
  return "status-pending";
};

export const formatDate = date => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const calculateDays = (start, end, halfDay = false) => {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const days = Math.floor((e - s) / 86400000) + 1;
  return days - (halfDay ? 0.5 : 0);
};
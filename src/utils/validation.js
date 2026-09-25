export const validateLeave = form => {
  const errors = {};

  if (!form.leaveType) errors.leaveType = "Leave type is required";
  if (!form.startDate) errors.startDate = "Start date is required";
  if (!form.endDate) errors.endDate = "End date is required";
  if (!form.reason.trim()) errors.reason = "Reason is required";

  if (
    form.startDate &&
    form.endDate &&
    new Date(form.endDate) < new Date(form.startDate)
  ) {
    errors.endDate = "End date cannot be earlier than start date";
  }

  return errors;
};
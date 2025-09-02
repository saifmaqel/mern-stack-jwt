export function validateFields(fields, requiredFields) {
  const missingFields = [];

  for (const field of requiredFields) {
    const value = fields[field];
    if (!value || (typeof value === "string" && value.trim() === "")) {
      missingFields.push(field);
    }
  }

  if (missingFields.length === 0) return null;

  return `Missing required field${
    missingFields.length > 1 ? "s" : ""
  }: ${missingFields.join(", ")}`;
}

export function validateFields(fields) {
  const missingFields = Object.entries(fields)
    .filter(([_, value]) => {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      );
    })
    .map(([key]) => key);

  if (missingFields.length === 0) return null;

  return `Missing required field${
    missingFields.length > 1 ? "s" : ""
  }: ${missingFields.join(", ")}`;
}

export const validateInput = (actualInputs, expectedInputs) => {
  const missingFields = expectedInputs.filter(
    (field) => !actualInputs.includes(field)
  );

  if (missingFields.length > 0) {
    throw new Error(`Missing fields: ${missingFields.join(", ")}`);
  }
};

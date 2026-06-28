/**
 * Validates whether an email format matches typical syntax structures.
 * @param {string} email Input string
 * @returns {boolean} True if format is valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates the core attributes of a user object.
 * @param {Object} formData User details input state
 * @returns {Object} Key-value pair of error messages for failing fields
 */
export const validateUserForm = (formData) => {
  const errors = {};

  if (!formData.firstName || formData.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters.";
  }

  if (!formData.lastName || formData.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters.";
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!formData.department || formData.department.trim() === "") {
    errors.department = "Department selection is required.";
  }

  return errors;
};

export const validate = (data) => {
  const { firstName, emailId, password, age } = data;

  if (!firstName || firstName.length < 3) {
    throw "First name must be at least 3 characters";
  }

  if (!emailId || !emailId.includes("@")) {
    throw "Invalid email";
  }

  if (!password || password.length < 6) {
    throw "Password must be at least 6 characters";
  }

  if (!age || age < 12) {
    throw "Invalid age";
  }
};

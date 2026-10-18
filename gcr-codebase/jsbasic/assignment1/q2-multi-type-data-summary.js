// Sample values representing different kinds of user data.
const userName = "Taylor";
const accountBalance = 1250.75;
const isActive = true;
const favoriteColors = ["blue", "green"];
const userProfile = { city: "Pune", membership: "standard" };
const middleName = null;
let secondaryEmail;

const dataEntries = [
  { label: "User name", value: userName, type: typeof userName },
  { label: "Account balance", value: accountBalance, type: typeof accountBalance },
  { label: "Active", value: isActive, type: typeof isActive },
  {
    label: "Favorite colors",
    value: favoriteColors,
    type: Array.isArray(favoriteColors) ? "array" : typeof favoriteColors,
  },
  { label: "User profile", value: userProfile, type: typeof userProfile },
  { label: "Middle name", value: middleName, type: typeof middleName },
  { label: "Secondary email", value: secondaryEmail, type: typeof secondaryEmail },
];

// typeof null is "object" in JavaScript; this reports the result of typeof.
console.table(dataEntries);

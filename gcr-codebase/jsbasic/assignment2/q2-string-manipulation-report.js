const productName = " wireless headphones PRO ";

// Normalize the title, capitalize every word, then expand the Pro label.
const cleanedTitle = productName
  .trim()
  .toLowerCase()
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
  .replace("Pro", "Pro Edition");

console.log(`Cleaned title: ${cleanedTitle}`);
console.log(`Title length: ${cleanedTitle.length}`);

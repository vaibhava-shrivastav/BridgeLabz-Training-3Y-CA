const feedback = "Great product! Fast delivery and amazing sound quality!";
const feedbackWords = feedback.trim().split(/\s+/);
const normalizedFeedback = feedback.toLowerCase();
const containsNegativeFeedback =
  normalizedFeedback.includes("bad") || normalizedFeedback.includes("poor");

console.log(`Word count: ${feedbackWords.length}`);
console.log(containsNegativeFeedback ? "Needs Improvement" : "Positive Feedback");

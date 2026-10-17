/**
 * Generates a mock AI response for testing UI without external API keys.
 * Includes realistic simulated delays, code formatting, and contextual responses.
 */

const GENERAL_RESPONSES = [
  "I'm here to help you! Feel free to ask questions, brainstorm ideas, or ask for code snippets.",
  "That's an interesting question. In modern software architecture, breaking problems into modular, decoupled components leads to higher maintainability.",
  "Here is an example solution to think about:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}! Welcome to Smart AI Chatbot.`;\n}\n```\nLet me know if you would like me to expand on this!",
  "Great point! I've noted that down. Would you like me to elaborate further on this topic or explore related concepts?",
  "Certainly! The key principles here are simplicity, responsiveness, and clear user feedback."
];

export async function generateMockResponse(userMessage) {
  // Simulate network / thinking latency
  const delay = Math.floor(Math.random() * 500) + 800; // 800ms - 1300ms
  await new Promise(resolve => setTimeout(resolve, delay));

  const lower = userMessage.toLowerCase().trim();

  // Suggestion: Code an algorithm
  if (lower.includes('reverse') || lower.includes('palindrome') || lower.includes('algorithm')) {
    return `Here is a clean implementation in JavaScript to reverse a string and check if it is a palindrome:

\`\`\`javascript
/**
 * Checks if a given string is a palindrome.
 * Ignores spaces, punctuation, and casing.
 */
function isPalindrome(str) {
  // Sanitize: lowercase and remove non-alphanumeric characters
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Compare clean string with its reversed version
  const reversedStr = cleanStr.split('').reverse().join('');
  return cleanStr === reversedStr;
}

// Example usage:
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello world"));                     // false
\`\`\`

**How it works:**
1. It strips out non-alphanumeric characters and converts the text to lowercase.
2. It reverses the cleaned string using \`split('').reverse().join('')\`.
3. It performs a direct equality comparison. Time complexity is O(n).`;
  }

  // Suggestion: Brainstorm ideas
  if (lower.includes('product ideas') || lower.includes('brainstorm') || lower.includes('ideas')) {
    return `Here are 5 unique product ideas for an AI-powered productivity application:

1. **Contextual Meeting Copilot**
   Listens to virtual meetings and automatically creates structured action items, assigns owners, and syncs tasks to Jira or Notion.

2. **Codebase Onboarding Guide**
   An AI assistant that reads an entire repository and generates interactive architectural walkthroughs for new engineers.

3. **Smart Email Triager & Drafter**
   Categorizes high-priority incoming communications, summarizes message threads, and pre-drafts replies matching your personal writing style.

4. **Deep Work Focus Sentinel**
   Analyzes calendar events, active applications, and user habits to proactively block distractions and suggest optimal focus blocks.

5. **AI Knowledge Synthesizer**
   Aggregates scattered documentation from Slack, Google Docs, and Figma into a single unified knowledge base with semantic search.`;
  }

  // Suggestion: Explain a concept
  if (lower.includes('machine learning') || lower.includes('explain') || lower.includes('concept')) {
    return `Machine learning (ML) is an approach where computers learn from data rather than following rigid, hand-coded rules.

Here is an intuitive way to understand it:

- **Traditional Programming:** You write the rules (code) + feed the data ➔ Computer produces answers.
- **Machine Learning:** You feed the data + the expected answers ➔ Computer learns the rules (patterns).

**Three Core Phases:**
1. **Training:** The model is presented with thousands of labeled examples (e.g. photos of cats and dogs).
2. **Loss Minimization:** Whenever the model makes an error, mathematical optimization (like gradient descent) nudges the model parameters to reduce mistakes.
3. **Inference:** Once trained, the model can accurately evaluate never-before-seen data in real time!`;
  }

  // Suggestion: Draft a message
  if (lower.includes('email') || lower.includes('draft') || lower.includes('follow-up') || lower.includes('client')) {
    return `Here is a polished and professional follow-up email template:

**Subject:** Follow-up: Project Demo & Next Steps for [Project Name]

Dear [Client Name],

Thank you for your time earlier today during our demonstration of **[Project Name]**. It was great discussing your team's goals and seeing how the platform aligns with your roadmap.

To recap our conversation:
- We reviewed the core capabilities of the new interface.
- We discussed integration timelines and upcoming milestones.
- Our team will prepare the initial configuration sandbox by **[Target Date]**.

Please let me know if you have any feedback or if any additional team members need access to the recording or slide deck.

Looking forward to our next steps!

Warm regards,  
**[Your Name]**  
[Your Title] | [Your Company]`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello there! 👋 I'm your Smart AI Assistant. How can I help you today? Feel free to ask questions, explore ideas, or test out my features.";
  }

  if (lower.includes('help') || lower.includes('what can you do')) {
    return "Here are a few things I can assist you with:\n\n• Answering technical and general knowledge questions\n• Writing, explaining, and debugging code\n• Drafting emails, proposals, and summaries\n• Brainstorming creative product ideas\n\nWhat would you like to explore next?";
  }

  if (lower.includes('joke')) {
    return "Why do programmers prefer dark mode? 💡\n\nBecause light attracts bugs! 😄";
  }

  // Random response fallback
  const randomPick = GENERAL_RESPONSES[Math.floor(Math.random() * GENERAL_RESPONSES.length)];
  return `Thank you for your message: "${userMessage}".\n\n${randomPick}`;
}

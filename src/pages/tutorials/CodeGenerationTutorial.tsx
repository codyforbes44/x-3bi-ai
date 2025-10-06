import { TutorialContent } from "@/components/tutorials/TutorialContent";

export default function CodeGenerationTutorial() {
  const steps = [
    {
      title: "Understanding AI Code Assistant",
      description: "The AI Code Assistant uses Claude Sonnet 4 to help you write, review, and debug code across multiple programming languages.",
      tips: [
        "Works with JavaScript, Python, TypeScript, and more",
        "Can explain existing code or generate new code",
        "Provides best practices and optimization suggestions"
      ]
    },
    {
      title: "Generating Your First Function",
      description: "Start by describing what you want the code to do. Be specific about inputs, outputs, and any constraints.",
      code: `Example prompt:

"Write a TypeScript function that takes an array of numbers 
and returns the sum of all even numbers. Include input validation 
and JSDoc comments."`,
      tips: [
        "Specify the programming language",
        "Describe inputs and expected outputs",
        "Mention any edge cases to handle"
      ]
    },
    {
      title: "Request Code Explanations",
      description: "Paste existing code and ask the AI to explain how it works, identify issues, or suggest improvements.",
      code: `Example prompt:

"Explain this React component and suggest improvements:

function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}"`,
      tips: [
        "Ask for line-by-line explanations",
        "Request performance optimization suggestions",
        "Get recommendations for best practices"
      ]
    },
    {
      title: "Debugging with AI",
      description: "Share error messages and code snippets to get debugging help and solutions.",
      code: `Debugging prompt structure:

"I'm getting this error: [error message]

Here's my code:
[paste code]

What's causing this and how do I fix it?"`,
      tips: [
        "Include the full error message",
        "Provide relevant code context",
        "Mention what you've already tried"
      ]
    },
    {
      title: "Building Complete Components",
      description: "Request full component implementations with styling, state management, and error handling.",
      code: `Component request example:

"Create a React form component with:
- Name and email input fields
- Client-side validation
- Submit handler
- Loading and error states
- Styled with Tailwind CSS"`,
      tips: [
        "Specify the framework or library",
        "List all required features",
        "Mention styling preferences"
      ]
    },
    {
      title: "Code Review & Refactoring",
      description: "Get expert-level code reviews with suggestions for improvements, security, and maintainability.",
      code: `Code review prompt:

"Review this code for:
- Performance issues
- Security vulnerabilities
- Best practices
- Readability improvements

[paste your code]"`,
      tips: [
        "Ask for specific review criteria",
        "Request refactoring suggestions",
        "Get recommendations for testing"
      ]
    },
    {
      title: "Advanced Patterns",
      description: "Learn design patterns, architectural decisions, and advanced programming concepts.",
      tips: [
        "Ask about when to use specific patterns",
        "Request comparisons between approaches",
        "Get help with complex algorithms",
        "Learn framework-specific best practices"
      ]
    }
  ];

  return (
    <TutorialContent
      title="AI-Powered Code Generation"
      description="Master the art of using AI to write better code faster. Learn to generate, debug, and optimize code across multiple languages."
      duration="30 minutes"
      level="Intermediate"
      steps={steps}
      demoUrl="/dashboard"
    />
  );
}

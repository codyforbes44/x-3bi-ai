import { TutorialContent } from "@/components/tutorials/TutorialContent";

export default function AIChatTutorial() {
  const steps = [
    {
      title: "Access the AI Chat Interface",
      description: "Navigate to the Dashboard and select the AI Chat tool. This is powered by Claude Sonnet 4, one of the most advanced language models available.",
      tips: [
        "The chat interface is designed for natural conversation",
        "You can ask questions, request explanations, or seek creative ideas",
        "Each conversation maintains context for follow-up questions"
      ]
    },
    {
      title: "Craft Your First Prompt",
      description: "Start with a clear, specific question or request. The AI works best when you provide context and explain what you need.",
      code: `Example prompts:

"Explain quantum computing in simple terms"

"Help me brainstorm marketing ideas for a new coffee shop"

"What are the best practices for React component design?"`,
      tips: [
        "Be specific about what you want to know",
        "Provide relevant context for better responses",
        "Ask follow-up questions to dig deeper"
      ]
    },
    {
      title: "Use Advanced Prompting Techniques",
      description: "Get better results by structuring your prompts effectively. Include role-playing, format specifications, and constraints.",
      code: `Advanced prompt structure:

"Act as a [role]. I need you to [task].

Context: [background information]

Requirements:
- [requirement 1]
- [requirement 2]

Format the response as [desired format]"`,
      tips: [
        "Specify the role or perspective you want",
        "Define the output format (bullet points, table, etc.)",
        "Set constraints like length or style"
      ]
    },
    {
      title: "Leverage Conversation Context",
      description: "The AI remembers your conversation history. Use this to build on previous responses and refine ideas iteratively.",
      tips: [
        "Reference previous responses with 'based on what you said...'",
        "Ask for revisions: 'Can you make that more concise?'",
        "Build complex ideas step-by-step across multiple messages"
      ]
    },
    {
      title: "Handle Different Use Cases",
      description: "The AI Chat tool can help with various tasks from writing to analysis to problem-solving.",
      code: `Common use cases:

Writing:
"Write a professional email to [recipient] about [topic]"

Analysis:
"Analyze the pros and cons of [option A] vs [option B]"

Learning:
"Explain [concept] with examples and analogies"

Problem-Solving:
"I'm facing [problem]. What are potential solutions?"`,
      tips: [
        "For writing tasks, specify tone and length",
        "For analysis, ask for structured comparisons",
        "For learning, request examples and explanations"
      ]
    },
    {
      title: "Best Practices & Tips",
      description: "Follow these guidelines to get the most accurate and helpful responses from AI Chat.",
      tips: [
        "Start conversations with clear context",
        "Break complex requests into smaller steps",
        "Ask the AI to explain its reasoning",
        "Request alternative approaches or perspectives",
        "Use the AI to brainstorm, then refine ideas together"
      ]
    }
  ];

  return (
    <TutorialContent
      title="Mastering AI Chat with Claude Sonnet 4"
      description="Learn advanced prompting techniques and best practices for conversational AI to get exceptional results every time."
      duration="25 minutes"
      level="Beginner to Intermediate"
      steps={steps}
      demoUrl="/dashboard"
    />
  );
}

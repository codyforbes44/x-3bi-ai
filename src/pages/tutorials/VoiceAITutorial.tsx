import { TutorialContent } from "@/components/tutorials/TutorialContent";

export default function VoiceAITutorial() {
  const steps = [
    {
      title: "Understanding Voice AI",
      description: "ElevenLabs provides premium text-to-speech with natural-sounding voices in multiple languages. Learn how to use it effectively.",
      tips: [
        "Supports 32+ languages with native-quality voices",
        "Perfect for content creation, accessibility, and applications",
        "Natural prosody and emotional expression"
      ]
    },
    {
      title: "Accessing the Voice Synthesis Tool",
      description: "Navigate to the AI Voice tool in your dashboard to start converting text to speech.",
      tips: [
        "Select from multiple voice options",
        "Preview different voices before generating",
        "Download audio for use in your projects"
      ]
    },
    {
      title: "Writing Effective Text for Voice",
      description: "Not all text works well for text-to-speech. Learn formatting techniques for better results.",
      code: `Best practices for TTS text:

Good:
"Hello! Welcome to our podcast. Today, we'll explore 
the fascinating world of artificial intelligence."

Better:
"Hello! Welcome to our podcast. Today... we'll explore 
the fascinating world of artificial intelligence."

Use:
- Natural punctuation for pauses
- Ellipsis (...) for longer pauses
- Commas for breath marks
- Question marks for upward inflection`,
      tips: [
        "Write as you would speak naturally",
        "Use punctuation to control pacing",
        "Break long sentences into shorter ones",
        "Avoid complex abbreviations"
      ]
    },
    {
      title: "Choosing the Right Voice",
      description: "Different voices work better for different content types. Match the voice to your use case.",
      code: `Voice selection guide:

Professional Content:
- Use clear, authoritative voices
- Examples: Aria, Laura, Charlotte

Casual/Friendly:
- Choose warm, conversational voices
- Examples: Sarah, River, Liam

Narration:
- Select voices with good storytelling flow
- Examples: Roger, Daniel, Matilda`,
      tips: [
        "Match voice gender and age to your audience",
        "Consider the tone of your content",
        "Test multiple voices for best fit"
      ]
    },
    {
      title: "Optimizing for Different Use Cases",
      description: "Learn specific techniques for podcasts, videos, audiobooks, and applications.",
      code: `Use case optimization:

Podcasts/Videos:
- Use conversational, engaging voices
- Add natural pauses between sections
- Vary pacing for emphasis

E-Learning:
- Choose clear, educational-sounding voices
- Slower pace for complex topics
- Add pauses after key points

Audiobooks:
- Select voices with good storytelling quality
- Maintain consistent energy
- Use chapter markers in text

UI/Applications:
- Brief, clear messages
- Consistent voice across app
- Quick, energetic delivery`,
      tips: [
        "Adjust pacing based on content complexity",
        "Add personality to match brand voice",
        "Consider listener environment"
      ]
    },
    {
      title: "Advanced Techniques",
      description: "Use emphasis, pronunciation guides, and emotional cues for more natural speech.",
      code: `Advanced formatting:

Emphasis:
"This is REALLY important" → stronger emphasis

Pronunciation:
"SQL (ess-cue-ell)" → guide pronunciation

Emotional cues:
"[excited] We're thrilled to announce..."
"[concerned] However, there are some challenges..."

Pacing:
"Let me explain... this carefully" → adds pause`,
      tips: [
        "Use capitalization for emphasis sparingly",
        "Provide pronunciation guides for acronyms",
        "Add emotional context in brackets",
        "Use ellipsis for dramatic pauses"
      ]
    },
    {
      title: "Integration & Best Practices",
      description: "Tips for using generated voice audio in your projects and workflows.",
      tips: [
        "Download in appropriate format for your platform",
        "Test audio quality before publishing",
        "Keep backups of successful voice generations",
        "Consider file size for web applications",
        "Use for accessibility features in apps"
      ]
    }
  ];

  return (
    <TutorialContent
      title="Voice AI with ElevenLabs"
      description="Learn to create natural, professional voice-overs and speech synthesis for any project using advanced text-to-speech technology."
      duration="15 minutes"
      level="Beginner"
      steps={steps}
      demoUrl="/dashboard"
    />
  );
}

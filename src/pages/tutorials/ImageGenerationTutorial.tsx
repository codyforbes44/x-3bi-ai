import { TutorialContent } from "@/components/tutorials/TutorialContent";

export default function ImageGenerationTutorial() {
  const steps = [
    {
      title: "Introduction to AI Image Generation",
      description: "Learn how GPT Image-1 creates stunning visuals from text descriptions. Understanding the basics will help you craft better prompts.",
      tips: [
        "AI generates images based on text descriptions (prompts)",
        "More detailed prompts produce more accurate results",
        "Style, mood, and composition can all be specified"
      ]
    },
    {
      title: "Crafting Your First Prompt",
      description: "Start with a clear subject, then add details about style, lighting, composition, and mood.",
      code: `Basic prompt structure:

[Subject] + [Style] + [Details] + [Mood/Atmosphere]

Example:
"A serene mountain landscape at sunset, digital art style, 
with snow-capped peaks reflected in a calm lake, warm 
golden hour lighting, peaceful atmosphere"`,
      tips: [
        "Start with the main subject",
        "Add descriptive details",
        "Specify the artistic style"
      ]
    },
    {
      title: "Adding Style and Composition",
      description: "Control the artistic style, perspective, and composition of your generated images.",
      code: `Style keywords:

Art Styles:
- "photorealistic", "digital art", "oil painting"
- "watercolor", "3D render", "anime style"
- "minimalist", "abstract", "vintage photograph"

Composition:
- "close-up portrait", "wide-angle landscape"
- "bird's eye view", "from below looking up"
- "centered composition", "rule of thirds"`,
      tips: [
        "Combine multiple style keywords",
        "Specify camera angle or perspective",
        "Use composition rules for better framing"
      ]
    },
    {
      title: "Controlling Lighting and Mood",
      description: "Lighting dramatically affects the feel of an image. Learn to specify lighting conditions for better results.",
      code: `Lighting examples:

Time of Day:
- "golden hour lighting", "blue hour", "midday sun"
- "sunset glow", "dawn light", "nighttime"

Lighting Types:
- "soft diffused light", "dramatic shadows"
- "backlit", "rim lighting", "studio lighting"
- "neon lights", "candlelight", "natural light"

Mood:
- "moody and atmospheric", "bright and cheerful"
- "mysterious", "energetic", "calm and peaceful"`,
      tips: [
        "Specify time of day for natural lighting",
        "Combine lighting with mood descriptors",
        "Use weather conditions to set atmosphere"
      ]
    },
    {
      title: "Advanced Prompt Techniques",
      description: "Use negative prompts, weight adjustments, and specific artist references to refine your images.",
      code: `Advanced techniques:

Detailed Descriptions:
"A futuristic cityscape at night, cyberpunk aesthetic, 
neon signs reflecting on wet streets, flying cars in 
the distance, towering skyscrapers with holographic 
advertisements, moody blue and purple tones, cinematic 
composition, high detail, 4K quality"

Artist References:
- "in the style of [artist name]"
- "inspired by [art movement]"
- "reminiscent of [reference work]"`,
      tips: [
        "Be very specific with important details",
        "Layer multiple descriptive elements",
        "Reference specific art styles or artists",
        "Mention desired image quality"
      ]
    },
    {
      title: "Common Use Cases",
      description: "Practical applications for AI-generated images in different contexts.",
      code: `Use case examples:

Marketing:
"Professional product photo of a smartwatch on a clean 
white background, studio lighting, high-end advertising 
style, sharp focus"

Social Media:
"Vibrant abstract background with flowing gradients, 
purple and blue tones, modern and trendy, Instagram-worthy"

Concept Art:
"Fantasy castle on a floating island surrounded by clouds, 
magical atmosphere, epic scale, detailed architecture, 
concept art style"`,
      tips: [
        "Tailor prompts to your specific use case",
        "Consider the final medium (web, print, etc.)",
        "Specify aspect ratio if needed",
        "Think about where the image will be used"
      ]
    },
    {
      title: "Iterating and Refining",
      description: "Learn how to improve results through iteration and prompt refinement.",
      tips: [
        "Start simple, then add details gradually",
        "If results are off, adjust one element at a time",
        "Save successful prompts for future use",
        "Experiment with different style combinations",
        "Use specific technical terms for precision"
      ]
    }
  ];

  return (
    <TutorialContent
      title="Creating Stunning AI Images"
      description="Master the art of prompt engineering for image generation. Learn to create professional visuals for any purpose with GPT Image-1."
      duration="20 minutes"
      level="Beginner"
      steps={steps}
      demoUrl="/dashboard"
    />
  );
}

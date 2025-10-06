import { TutorialContent } from "@/components/tutorials/TutorialContent";

export default function SystemArchitectureTutorial() {
  const steps = [
    {
      title: "Understanding AI Architecture Guidance",
      description: "Claude Opus 4 excels at system design and architectural decision-making. Learn how to leverage it for building scalable applications.",
      tips: [
        "Best for complex system design questions",
        "Provides architecture patterns and best practices",
        "Helps evaluate trade-offs between approaches"
      ]
    },
    {
      title: "Defining Your System Requirements",
      description: "Start by clearly outlining what you're building, constraints, and goals before asking for architectural guidance.",
      code: `Requirements template:

"I'm designing a system for [purpose].

Requirements:
- Expected users: [number/scale]
- Key features: [list features]
- Performance needs: [latency, throughput]
- Data volume: [size, growth rate]
- Budget constraints: [if any]

Current stack: [technologies]

What architecture would you recommend?"`,
      tips: [
        "Be specific about scale and performance needs",
        "Mention existing technology constraints",
        "Include non-functional requirements"
      ]
    },
    {
      title: "Exploring Architecture Patterns",
      description: "Ask the AI to explain different architectural patterns and when to use them.",
      code: `Pattern exploration prompt:

"Explain the differences between:
- Microservices architecture
- Monolithic architecture
- Serverless architecture

For a [describe your application], which would be most 
appropriate and why? Include pros and cons of each approach."`,
      tips: [
        "Request comparisons between patterns",
        "Ask for real-world use cases",
        "Get recommendations based on your context"
      ]
    },
    {
      title: "Database Design Decisions",
      description: "Get guidance on data modeling, database selection, and scaling strategies.",
      code: `Database design prompt:

"I need to store [describe data] for a [type of application].

Considerations:
- Read/write ratio: [e.g., 80/20]
- Consistency requirements: [eventual vs strong]
- Query patterns: [how data will be accessed]
- Expected growth: [data volume over time]

Should I use SQL or NoSQL? What specific database would 
you recommend and how should I structure the data?"`,
      tips: [
        "Describe your data access patterns",
        "Mention consistency requirements",
        "Ask about scaling strategies"
      ]
    },
    {
      title: "API Design & Integration",
      description: "Design RESTful APIs, GraphQL schemas, or event-driven architectures with AI guidance.",
      code: `API design prompt:

"Design a RESTful API for [feature/system].

Endpoints needed:
- [list main operations]

Requirements:
- Authentication: [method]
- Rate limiting: [if needed]
- Versioning strategy
- Response formats

Provide:
1. Endpoint structure
2. Request/response examples
3. Error handling approach
4. Best practices for this use case"`,
      tips: [
        "Specify authentication requirements",
        "Ask for versioning strategies",
        "Request error handling patterns"
      ]
    },
    {
      title: "Scalability & Performance",
      description: "Learn to design systems that can grow and handle increasing load efficiently.",
      code: `Scalability prompt:

"My system currently handles [current load] but needs 
to scale to [target load].

Bottlenecks:
- [identify if known]

Architecture:
- [current architecture]

How should I:
1. Identify bottlenecks?
2. Implement caching strategies?
3. Design for horizontal scaling?
4. Optimize database queries?
5. Implement load balancing?"`,
      tips: [
        "Describe current limitations",
        "Ask about caching strategies",
        "Request load testing approaches"
      ]
    },
    {
      title: "Security Architecture",
      description: "Design secure systems with proper authentication, authorization, and data protection.",
      code: `Security architecture prompt:

"Design a security architecture for [application type].

Needs:
- User authentication and authorization
- Data encryption (at rest and in transit)
- API security
- Protection against common vulnerabilities
- Compliance with [regulations if any]

Provide a comprehensive security strategy including:
- Authentication mechanisms
- Authorization patterns
- Data protection methods
- Monitoring and auditing"`,
      tips: [
        "Ask about security best practices",
        "Request threat modeling guidance",
        "Get recommendations for compliance"
      ]
    },
    {
      title: "Migration & Modernization",
      description: "Get guidance on migrating legacy systems or modernizing existing architectures.",
      tips: [
        "Describe current system limitations",
        "Ask for migration strategies and risks",
        "Request phased migration approaches",
        "Get recommendations for backward compatibility",
        "Learn about data migration patterns"
      ]
    }
  ];

  return (
    <TutorialContent
      title="AI-Powered System Architecture Design"
      description="Master system design with Claude Opus 4. Learn to architect scalable, secure, and efficient applications with AI guidance."
      duration="35 minutes"
      level="Advanced"
      steps={steps}
      demoUrl="/dashboard"
    />
  );
}

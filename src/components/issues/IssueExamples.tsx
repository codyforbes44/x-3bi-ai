import { Heart, Scale, Briefcase, DollarSign, Users, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IssueExample } from "@/types/issue";

const exampleIssues: IssueExample[] = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Get guidance on maintaining physical health, mental wellness, stress management, nutrition, and building healthy habits.",
    category: "health"
  },
  {
    icon: Scale,
    title: "Legal Concerns",
    description: "Seek advice on legal matters, understanding your rights, contract issues, tenant rights, or family law questions.",
    category: "legal"
  },
  {
    icon: Briefcase,
    title: "Career & Professional Development",
    description: "Navigate career transitions, job search strategies, workplace challenges, professional growth, and work-life balance.",
    category: "career"
  },
  {
    icon: DollarSign,
    title: "Financial Planning",
    description: "Receive guidance on budgeting, debt management, savings strategies, investment basics, and financial decision-making.",
    category: "finance"
  },
  {
    icon: Users,
    title: "Relationships & Family",
    description: "Find support for relationship challenges, family dynamics, communication issues, parenting advice, and social connections.",
    category: "relationships"
  },
  {
    icon: Brain,
    title: "Personal Growth & Education",
    description: "Explore learning opportunities, skill development, life transitions, goal setting, and personal development strategies.",
    category: "personal"
  },
];

export const IssueExamples = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Areas Where We Can Help</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exampleIssues.map((issue, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow hover-scale">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <issue.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{issue.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{issue.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

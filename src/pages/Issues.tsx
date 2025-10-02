import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Scale, Briefcase, DollarSign, Users, Brain } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  title: z.string().trim().min(5, { message: "Title must be at least 5 characters" }).max(200),
  description: z.string().trim().min(20, { message: "Description must be at least 20 characters" }).max(2000),
  category: z.string().min(1, { message: "Please select a category" }),
});

const exampleIssues = [
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

const Issues = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("issues").insert({
        user_id: user?.id || null,
        name: values.name,
        email: values.email,
        title: values.title,
        description: values.description,
        category: values.category,
      });

      if (error) throw error;

      toast({
        title: "Your concern has been submitted!",
        description: "Our AI will analyze your situation and provide guidance soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error submitting your concern",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Get AI Guidance</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Facing challenges in life? Share your concerns and get AI-powered guidance to help you navigate through them.
            </p>
          </div>

          {/* Example Issues Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Areas Where We Can Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleIssues.map((issue, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
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

          {/* Submission Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Share Your Concern</CardTitle>
              <CardDescription>
                Describe your situation in detail so our AI can provide the most helpful guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="health">Health & Wellness</SelectItem>
                            <SelectItem value="legal">Legal Concerns</SelectItem>
                            <SelectItem value="career">Career & Professional</SelectItem>
                            <SelectItem value="finance">Financial Planning</SelectItem>
                            <SelectItem value="relationships">Relationships & Family</SelectItem>
                            <SelectItem value="personal">Personal Growth</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Concern Summary</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief summary of your concern" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your situation in detail. What's troubling you? What have you tried so far?"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The more context you provide, the better guidance we can offer
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Get AI Guidance"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Issues;

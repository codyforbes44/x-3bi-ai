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
import { Bug, Code, Zap, Shield, Smartphone, Globe } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  title: z.string().trim().min(5, { message: "Title must be at least 5 characters" }).max(200),
  description: z.string().trim().min(20, { message: "Description must be at least 20 characters" }).max(2000),
  category: z.string().min(1, { message: "Please select a category" }),
});

const exampleIssues = [
  {
    icon: Bug,
    title: "Bug Fixes & Error Resolution",
    description: "Application crashes, unexpected errors, broken features, or performance issues that need immediate attention.",
    category: "bug"
  },
  {
    icon: Code,
    title: "Code Optimization",
    description: "Refactoring legacy code, improving performance, reducing technical debt, and implementing best practices.",
    category: "optimization"
  },
  {
    icon: Zap,
    title: "Feature Implementation",
    description: "Adding new functionality, integrating third-party services, or building custom features from scratch.",
    category: "feature"
  },
  {
    icon: Shield,
    title: "Security Vulnerabilities",
    description: "Addressing security concerns, implementing authentication, fixing vulnerabilities, and ensuring data protection.",
    category: "security"
  },
  {
    icon: Smartphone,
    title: "Responsive Design Issues",
    description: "Mobile compatibility problems, layout inconsistencies, or UI/UX improvements across different devices.",
    category: "design"
  },
  {
    icon: Globe,
    title: "API Integration",
    description: "Connecting external services, fixing API errors, or optimizing data fetching and synchronization.",
    category: "integration"
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
        title: "Issue submitted successfully!",
        description: "We'll review your submission and get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error submitting issue",
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
            <h1 className="text-4xl md:text-5xl font-bold">Report an Issue</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Found a problem or need help? Submit your issue below and our team will assist you.
            </p>
          </div>

          {/* Example Issues Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Examples of Solvable Issues</h2>
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
              <CardTitle>Submit Your Issue</CardTitle>
              <CardDescription>
                Fill out the form below with as much detail as possible
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
                            <SelectItem value="bug">Bug Fix</SelectItem>
                            <SelectItem value="optimization">Code Optimization</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="security">Security Issue</SelectItem>
                            <SelectItem value="design">Design/UI Issue</SelectItem>
                            <SelectItem value="integration">API Integration</SelectItem>
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
                        <FormLabel>Issue Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of the issue" {...field} />
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
                            placeholder="Provide as much detail as possible about the issue..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include steps to reproduce, expected vs actual behavior, and any error messages
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Issue"}
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

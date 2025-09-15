"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/selectContent";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { 
  MessageSquare, 
  Eye, 
  Send, 
  HelpCircle,
  Code2,
  Tag,
  ArrowLeft,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { tags } from "../../content/new/option";
import RichTextEditor from "@/components/text-editor/textEditor";
import Preview from "@/components/text-editor/preview";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters - be specific about your problem",
  }).max(150, {
    message: "Title must be less than 150 characters",
  }),
  slug: z.string().min(5, {
    message: "Slug must be at least 5 characters",
  }),
  keywords: z.string().min(5, {
    message: "Keywords must be at least 5 characters for better discoverability",
  }),
  questionType: z.string({
    required_error: "Please select a question type",
  }),
  content: z.string().min(30, {
    message: "Question body must be at least 30 characters - provide more details",
  }),
  tags: z
    .array(z.string())
    .min(1, { message: "At least one tag is required" })
    .max(5, { message: "Maximum 5 tags allowed" }),
});

type FormValues = z.infer<typeof formSchema>;

const questionTypes = [
  { value: "question", label: "❓ Question - I need help solving a problem" },
  { value: "discussion", label: "💬 Discussion - Let's talk about a topic" },
  { value: "code-review", label: "🔍 Code Review - Please review my code" },
  { value: "tutorial", label: "📚 Tutorial - I want to share knowledge" },
];

export default function CreateForumPost() {
  const [activeTab, setActiveTab] = useState("create");
  const router = useRouter();
  const animatedComponents = makeAnimated();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      keywords: "",
      questionType: "",
      content: "",
      tags: [],
    },
  });

  const watchTitle = form.watch("title");
  const watchContent = form.watch("content");

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle) {
      const autoSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      form.setValue("slug", autoSlug);
    }
  }, [watchTitle, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Forum post values:", values);
    // Handle form submission
  }

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: '#e5e7eb',
      '&:hover': {
        borderColor: '#CD3937',
      },
      '&:focus': {
        borderColor: '#CD3937',
        boxShadow: '0 0 0 1px #CD3937',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#000040',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: 'white',
      '&:hover': {
        backgroundColor: '#CD3937',
        color: 'white',
      },
    }),
  };

  return (
    <div className="ml-[320px] bg-gray-50 min-h-screen">
      <div className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="text-gray-600 hover:text-[#000040]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  Ask a Question
                </h1>
                <p className="text-gray-600">Get help from the CodeAdvisor community</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Auto-saved
                </Badge>
              </div>
            </div>

            {/* Help Tips */}
            <Card className="bg-blue-50 border-blue-200 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Writing a good question</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Be specific and clear about your problem</li>
                      <li>• Include relevant code snippets</li>
                      <li>• Mention what you've already tried</li>
                      <li>• Add appropriate tags for better visibility</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Write Question
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            {/* Create Tab */}
            <TabsContent value="create" className="mt-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Question Type */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-[#CD3937]" />
                            Question Type
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="questionType"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder="What kind of help do you need?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {questionTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Title */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-[#CD3937]" />
                            Question Title
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., How do I center a div with CSS flexbox?"
                                    className="h-12 text-lg"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Be specific and clear. Include key technologies you're using.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* URL Slug */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-[#CD3937]" />
                            URL Slug
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="auto-generated-from-title"
                                    className="h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Auto-generated from title. You can edit if needed.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Keywords */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Tag className="w-5 h-5 text-[#CD3937]" />
                            Keywords
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="keywords"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="CSS, flexbox, centering, layout"
                                    className="h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Comma-separated keywords for better search visibility.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Question Body */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-[#CD3937]" />
                            Question Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="min-h-[400px]">
                                    <RichTextEditor
                                      content={field.value}
                                      onChange={(content: string) => field.onChange(content)}
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Include code snippets, error messages, and what you've already tried. Be specific about what you're trying to achieve.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Tags */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Tag className="w-5 h-5 text-[#CD3937]" />
                            Tags
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <ReactSelect
                                    components={animatedComponents}
                                    isMulti
                                    options={tags}
                                    value={tags.filter(tag => field.value?.includes(tag.value))}
                                    onChange={(selected) => {
                                      const values = selected ? selected.map(option => option.value) : [];
                                      field.onChange(values);
                                    }}
                                    placeholder="Select up to 5 relevant tags..."
                                    styles={customSelectStyles}
                                    className="text-sm"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Choose tags that describe your technologies and topic.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Submit Button */}
                      <div className="flex justify-end gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setActiveTab("preview")}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview Question
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-[#000040] hover:bg-[#000040]/90 text-white flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Post Question
                        </Button>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-8 space-y-6">
                        
                        {/* Question Guidelines */}
                        <Card className="border-0 shadow-md">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              Question Guidelines
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>Be specific about your problem</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>Include relevant code snippets</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>Mention what you've tried</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>Use appropriate tags</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                                <span>Avoid asking multiple questions</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Question Stats */}
                        <Card className="border-0 shadow-md">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <MessageSquare className="w-5 h-5 text-[#CD3937]" />
                              Question Stats
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Title Length:</span>
                                <span className="font-medium">{watchTitle?.length || 0}/150</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Content Length:</span>
                                <span className="font-medium">
                                  {watchContent ? watchContent.replace(/<[^>]*>/g, '').length : 0} chars
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Reading Time:</span>
                                <span className="font-medium">
                                  {Math.max(1, Math.ceil((watchContent ? watchContent.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length : 0) / 200))} min
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Preview</h2>
                  <p className="text-gray-600">How your question will appear to the community</p>
                </div>
                <div className="p-6">
                  {watchTitle && (
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{watchTitle}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Asked just now</span>
                        <span>•</span>
                        <span>0 answers</span>
                        <span>•</span>
                        <span>0 views</span>
                      </div>
                    </div>
                  )}
                  {watchContent && (
                    <div className="prose prose-lg max-w-none">
                      <Preview content={watchContent} />
                    </div>
                  )}
                  {!watchTitle && !watchContent && (
                    <div className="text-center py-16 text-gray-500">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Start writing your question to see the preview</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
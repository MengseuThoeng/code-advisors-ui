"use client";
import React, { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import dynamic from "next/dynamic";

// Make React Select SSR-safe
const DynamicSelect = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => (
    <div className="h-10 bg-gray-100 border border-gray-200 rounded-md animate-pulse"></div>
  ),
});
import { 
  Upload, 
  Image as ImageIcon, 
  Eye, 
  Save, 
  Send, 
  X,
  FileText,
  Tag,
  Link,
  Settings,
  BookOpen,
  Sparkles,
  Clock,
  User,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Calendar,
  TrendingUp,
  Coffee
} from "lucide-react";
import { tags } from "./option";
import RichTextEditor from "@/components/text-editor/textEditor";
import Preview from "@/components/text-editor/preview";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  cover: z.instanceof(File).optional(),
  slug: z.string().min(5, {
    message: "Slug must be at least 5 characters",
  }),
  keyword: z.string().min(5, {
    message: "Keywords must be at least 5 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }).max(200, {
    message: "Description must be less than 200 characters",
  }),
  tag: z
    .array(z.string())
    .min(1, { message: "At least one tag is required" })
    .max(5, { message: "Maximum 5 tags allowed" }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateNewContent() {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("create");
  const [publishType, setPublishType] = useState<"draft" | "publish">("draft");

  const animatedComponents = makeAnimated();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      keyword: "",
      description: "",
      tag: [],
      cover: undefined,
      content: "",
    },
  });

  const watchTitle = form.watch("title");
  const watchContent = form.watch("content");
  const watchDescription = form.watch("description");
  const watchTags = form.watch("tag");

  // Auto-generate slug from title
  React.useEffect(() => {
    if (watchTitle && !form.getValues("slug")) {
      const autoSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      form.setValue("slug", autoSlug);
    }
  }, [watchTitle, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setUploading(true);
      setTimeout(() => {
        setUploading(false);
      }, 1000);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("cover", undefined);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Publishing:", publishType);
    console.log("Form values:", values);
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
    <div className="bg-gray-50 min-h-screen">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  Create New Article
                </h1>
                <p className="text-gray-600">Share your knowledge with the community</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Auto-saved
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Draft
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Create
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
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Title */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#CD3937]" />
                            Article Title
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
                                    placeholder="Enter an engaging title for your article..."
                                    className="text-lg py-3 border-gray-200 focus:border-[#CD3937]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Description */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#CD3937]" />
                            Article Description
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Write a brief description that will appear in search results and social media previews..."
                                    className="resize-none border-gray-200 focus:border-[#CD3937]"
                                    rows={3}
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="flex justify-between">
                                  <span>This will be shown as a preview snippet</span>
                                  <span className={field.value.length > 180 ? "text-red-500" : "text-gray-500"}>
                                    {field.value.length}/200
                                  </span>
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Cover Image */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-[#CD3937]" />
                            Cover Image
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="cover"
                            render={({ field }) => (
                              <FormItem>
                                {imagePreview ? (
                                  <div className="relative group">
                                    <img
                                      src={imagePreview}
                                      alt="Cover preview"
                                      className="w-full h-64 object-cover rounded-lg border border-gray-200"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={removeImage}
                                        className="flex items-center gap-2"
                                      >
                                        <X className="w-4 h-4" />
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#CD3937] transition-colors">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                      <Upload className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div>
                                      <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            field.onChange(file);
                                            handleFileChange(e);
                                          }
                                        }}
                                        disabled={uploading}
                                      />
                                      <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer"
                                      >
                                        <Button type="button" variant="outline" asChild>
                                          <span>
                                            {uploading ? "Uploading..." : "Choose Cover Image"}
                                          </span>
                                        </Button>
                                      </label>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Content Editor */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#CD3937]" />
                            Article Content
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RichTextEditor
                                    content={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Publish Card */}
                      <Card className="border-0 shadow-md sticky top-8">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Send className="w-5 h-5 text-[#CD3937]" />
                            Publish Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex gap-2">
                            <Button
                              type="submit"
                              variant="outline"
                              className="flex-1"
                              onClick={() => setPublishType("draft")}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save Draft
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1 bg-[#CD3937] hover:bg-[#CD3937]/90"
                              onClick={() => setPublishType("publish")}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Publish
                            </Button>
                          </div>
                          
                          <div className="pt-2 text-sm text-gray-500 space-y-1">
                            <p>• Draft: Save for later editing</p>
                            <p>• Publish: Make public immediately</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* SEO Settings */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Settings className="w-5 h-5 text-[#CD3937]" />
                            SEO Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Slug */}
                          <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Link className="w-4 h-4" />
                                  URL Slug
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="article-url-slug"
                                    className="font-mono text-sm"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-xs">
                                  yoursite.com/content/{field.value || 'your-slug'}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Keywords */}
                          <FormField
                            control={form.control}
                            name="keyword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Tag className="w-4 h-4" />
                                  SEO Keywords
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="react, javascript, tutorial"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-xs">
                                  Comma-separated keywords for search engines
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
                            Article Tags
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="tag"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <DynamicSelect
                                    isMulti
                                    components={animatedComponents}
                                    options={tags}
                                    value={tags.filter(tag => field.value.includes(tag.value))}
                                    onChange={(selectedOptions: any) => {
                                      field.onChange(selectedOptions.map((option: any) => option.value));
                                    }}
                                    placeholder="Select up to 5 tags..."
                                    styles={customSelectStyles}
                                    isOptionDisabled={() => field.value.length >= 5}
                                    instanceId="tags-select"
                                  />
                                </FormControl>
                                <FormDescription className="text-xs">
                                  Choose relevant tags to help readers find your article
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {/* Article Stats */}
                      <Card className="border-0 shadow-md">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#CD3937]" />
                            Article Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Word Count:</span>
                            <span className="font-medium">
                              {watchContent ? watchContent.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length : 0}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Characters:</span>
                            <span className="font-medium">
                              {watchContent ? watchContent.replace(/<[^>]*>/g, '').length : 0}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Reading Time:</span>
                            <span className="font-medium">
                              {Math.max(1, Math.ceil((watchContent ? watchContent.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length : 0) / 200))} min
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* Preview Tab - Exact Content Detail Layout */}
            <TabsContent value="preview" className="mt-0">
              <div className="bg-white min-h-screen -mx-8 -mb-8">
                {/* Hero Section - Exact same as content detail */}
                <div className="bg-gradient-to-br from-[#000040] via-[#000066] to-[#CD3937] pt-8 relative">
                  {/* Cover Image Overlay */}
                  {imagePreview && (
                    <>
                      <img
                        src={imagePreview}
                        alt={watchTitle || "Article cover"}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
                    </>
                  )}
                  
                  <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                      <div className="lg:col-span-2">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {watchTags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                          {watchTitle || "Your Article Title"}
                        </h1>
                        
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                          {watchDescription || "Your article description will appear here..."}
                        </p>
                        
                        <div className="flex items-center gap-6 text-white/80">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{Math.max(1, Math.ceil((watchContent ? watchContent.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length : 0) / 200))} min read</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>0 views</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>New</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Author Card in Hero */}
                      <div className="lg:col-span-1">
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <Avatar className="w-16 h-16 border-2 border-white/30">
                                <AvatarFallback className="bg-white/20 text-white text-lg">
                                  YN
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">Your Name</h3>
                                <p className="text-white/70 text-sm">Author</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Coffee className="w-3 h-3" />
                                  <span className="text-xs text-white/60">1 articles</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-white/80 text-sm mb-6">
                              Content creator and developer sharing knowledge with the community.
                            </p>
                            
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-white text-[#000040] hover:bg-white/90">
                                Follow
                              </Button>
                              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="bg-white">
                  <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-4 gap-12">
                      
                      {/* Floating Action Bar */}
                      <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className="sticky top-32">
                          {/* Main Reactions */}
                          <Card className="p-6 shadow-xl border-0 bg-white rounded-2xl">
                            <div className="flex lg:flex-col gap-4">
                              {/* Like Button */}
                              <div className="flex-1 lg:w-full">
                                <Button
                                  variant="outline"
                                  size="lg"
                                  className="w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white border-red-200 hover:border-red-500"
                                >
                                  <Heart className="w-5 h-5" />
                                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                                    <span className="font-semibold">0</span>
                                    <span className="text-xs lg:text-sm opacity-90">Likes</span>
                                  </div>
                                </Button>
                              </div>
                              
                              {/* Bookmark Button */}
                              <div className="flex-1 lg:w-full">
                                <Button
                                  variant="outline"
                                  size="lg"
                                  className="w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#000040] hover:to-indigo-600 hover:text-white border-[#000040]/20 hover:border-[#000040]"
                                >
                                  <Bookmark className="w-5 h-5" />
                                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                                    <span className="font-semibold">Save</span>
                                  </div>
                                </Button>
                              </div>
                              
                              {/* Share Button */}
                              <div className="flex-1 lg:w-full">
                                <Button 
                                  variant="outline" 
                                  size="lg" 
                                  className="w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white border-green-200 hover:border-green-500 group"
                                >
                                  <Share2 className="w-5 h-5 group-hover:animate-pulse" />
                                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                                    <span className="font-semibold">Share</span>
                                  </div>
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="lg:col-span-3 order-1 lg:order-2">
                        <div className="prose prose-lg max-w-none">
                          {watchContent ? (
                            <Preview content={watchContent} />
                          ) : (
                            <div className="text-center py-24 text-gray-500">
                              <FileText className="w-20 h-20 mx-auto mb-6 text-gray-300" />
                              <h3 className="text-2xl font-semibold mb-3 text-gray-700">No content yet</h3>
                              <p className="text-lg">Switch to Create tab to start writing your article</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section Preview */}
                <div className="bg-gray-50 border-t">
                  <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                      <h3 className="text-2xl font-bold mb-8 text-gray-900">Comments</h3>
                      <div className="text-center py-12 text-gray-500">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">No comments yet</p>
                        <p className="text-sm">Be the first to share your thoughts!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
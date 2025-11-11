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
import dynamic from "next/dynamic";

const DynamicSelect = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => (
    <div className="h-10 bg-gray-100 border border-gray-200 rounded-md animate-pulse"></div>
  ),
});
import makeAnimated from "react-select/animated";
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
  ArrowLeft,
  Loader2
} from "lucide-react";
import RichTextEditor from "@/components/text-editor/textEditor";
import Preview from "@/components/text-editor/preview";
import { useUpdateArticle, useArticle } from "@/hooks/use-article";
import { useTags } from "@/hooks/use-tag";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  cover: z.instanceof(File).optional(),
  slug: z.string().min(5, {
    message: "Slug must be at least 5 characters",
  }),
  keyword: z.string().optional(),
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

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const { data: article, isLoading: articleLoading, error: articleError } = useArticle(slug);
  const updateArticleMutation = useUpdateArticle(slug);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("create");
  const [publishType, setPublishType] = useState<"draft" | "publish">("draft");
  const [isArticleLoaded, setIsArticleLoaded] = useState(false);

  const { data: tagsData, isLoading: tagsLoading, error: tagsError } = useTags({ page: 0, limit: 100 });

  const animatedComponents = makeAnimated();

  const form = useForm<FormValues>({
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

  // Load article data into form
  useEffect(() => {
    if (article && !isArticleLoaded) {
      // Convert tags to comma-separated keywords
      const keywords = article.tags
        .map(tag => typeof tag === 'string' ? tag : tag.name)
        .join(', ');
      
      form.reset({
        title: article.title,
        slug: article.slug,
        keyword: keywords, // Use tags as keywords
        description: article.excerpt,
        tag: article.tags.map(tag => typeof tag === 'string' ? tag : tag.name),
        content: article.content || "",
      });
      
      if (article.coverImage) {
        setImagePreview(article.coverImage);
      }
      
      // Set publish type based on article status
      if (article.status === 'published') {
        setPublishType('publish');
      }
      
      setIsArticleLoaded(true);
    }
  }, [article, form, isArticleLoaded]);

  const watchTitle = form.watch("title");
  const watchContent = form.watch("content");
  const watchDescription = form.watch("description");
  const watchTags = form.watch("tag");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        form.setError("cover", {
          type: "manual",
          message: `File size exceeds 10MB. Please choose a smaller image. (Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
        });
        e.target.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        form.setError("cover", {
          type: "manual",
          message: "Please upload a valid image file (PNG, JPG, GIF, WebP)",
        });
        e.target.value = '';
        return;
      }

      form.clearErrors("cover");

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

  async function onSubmit(values: FormValues) {
    try {
      let coverImageUrl = imagePreview;
      
      if (values.cover) {
        const maxSize = 10 * 1024 * 1024;
        if (values.cover.size > maxSize) {
          form.setError("cover", {
            type: "manual",
            message: `Image is too large (${(values.cover.size / (1024 * 1024)).toFixed(2)}MB). Maximum allowed size is 10MB.`,
          });
          return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', values.cover);
        
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://159.65.8.211:8080/api/images/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = 'Failed to upload image';
          
          if (response.status === 413 || errorText.includes('upload size')) {
            errorMessage = 'Image file is too large. Please choose an image smaller than 10MB.';
          } else if (response.status === 400) {
            errorMessage = 'Invalid image file. Please choose a valid image (PNG, JPG, GIF).';
          }
          
          form.setError("cover", {
            type: "manual",
            message: errorMessage,
          });
          setUploading(false);
          return;
        }
        
        const data = await response.json();
        coverImageUrl = data.url;
        setUploading(false);
      }

      updateArticleMutation.mutate({
        title: values.title,
        content: values.content,
        excerpt: values.description,
        coverImage: coverImageUrl || undefined,
        tags: values.tag,
        status: publishType === 'publish' ? 'published' : 'draft',
      }, {
        onSuccess: () => {
          toast.success(
            publishType === 'publish' 
              ? 'Article updated and published!' 
              : 'Article updated as draft!',
            {
              description: 'Your changes have been saved.',
            }
          );
          router.push(`/content/${slug}`);
        },
        onError: (error: any) => {
          toast.error('Failed to update article', {
            description: error?.message || 'Please try again later.',
          });
        },
      });
    } catch (error) {
      console.error('Error updating article:', error);
      setUploading(false);
      toast.error('Failed to update article', {
        description: 'An unexpected error occurred.',
      });
    }
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

  // Loading state
  if (articleLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#CD3937] mx-auto mb-4" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (articleError || !article) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're trying to edit doesn't exist.</p>
          <Button onClick={() => router.push('/content')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/content/${slug}`)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Article
                  </Button>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  Edit Article
                </h1>
                <p className="text-gray-600">Update your article content</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  {article.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            {/* Edit Tab */}
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
                                    placeholder="Write a brief description..."
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
                                      <label htmlFor="file-upload" className="cursor-pointer">
                                        <Button type="button" variant="outline" asChild>
                                          <span>
                                            {uploading ? "Uploading..." : "Choose Cover Image"}
                                          </span>
                                        </Button>
                                      </label>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                      PNG, JPG, GIF up to <span className="font-semibold text-primary">10MB</span>
                                    </p>
                                  </div>
                                )}
                                <FormMessage className="text-red-600 font-medium mt-2" />
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
                                  {isArticleLoaded ? (
                                    <RichTextEditor
                                      key={`editor-${slug}`}
                                      content={field.value}
                                      onChange={field.onChange}
                                    />
                                  ) : (
                                    <div className="min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 flex items-center justify-center">
                                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                    </div>
                                  )}
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
                      {/* Update Card */}
                      <Card className="border-0 shadow-md sticky top-8">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Send className="w-5 h-5 text-[#CD3937]" />
                            Update Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex gap-2">
                            <Button
                              type="submit"
                              variant="outline"
                              className="flex-1"
                              onClick={() => setPublishType("draft")}
                              disabled={uploading || updateArticleMutation.isPending}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {updateArticleMutation.isPending && publishType === 'draft' ? 'Saving...' : 'Save Draft'}
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1 bg-[#CD3937] hover:bg-[#CD3937]/90"
                              onClick={() => setPublishType("publish")}
                              disabled={uploading || updateArticleMutation.isPending}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              {updateArticleMutation.isPending && publishType === 'publish' ? 'Publishing...' : 'Publish'}
                            </Button>
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
                                  Comma-separated keywords
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
                            render={({ field }) => {
                              const tagOptions = tagsData?.content.map(tag => ({
                                value: tag.name,
                                label: tag.name,
                                slug: tag.slug,
                              })) || [];

                              return (
                                <FormItem>
                                  <FormControl>
                                    {tagsLoading ? (
                                      <div className="h-10 bg-gray-100 border border-gray-200 rounded-md animate-pulse"></div>
                                    ) : tagsError ? (
                                      <div className="text-sm text-red-600 p-3 bg-red-50 border border-red-200 rounded-md">
                                        Failed to load tags. Please refresh the page.
                                      </div>
                                    ) : tagOptions.length === 0 ? (
                                      <div className="text-sm text-amber-600 p-3 bg-amber-50 border border-amber-200 rounded-md">
                                        No tags available. Please contact administrator.
                                      </div>
                                    ) : (
                                      <DynamicSelect
                                        isMulti
                                        components={animatedComponents}
                                        options={tagOptions}
                                        value={tagOptions.filter(tag => field.value.includes(tag.value))}
                                        onChange={(selectedOptions: any) => {
                                          field.onChange(selectedOptions.map((option: any) => option.value));
                                        }}
                                        placeholder="Select up to 5 tags..."
                                        styles={customSelectStyles}
                                        isOptionDisabled={() => field.value.length >= 5}
                                        instanceId="tags-select"
                                        isSearchable={true}
                                        noOptionsMessage={() => "No tags found"}
                                      />
                                    )}
                                  </FormControl>
                                  <FormDescription className="text-xs">
                                    Choose relevant tags to help readers find your article
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="mt-0">
              <div className="prose prose-lg max-w-none">
                <Card className="border-0 shadow-md p-8">
                  <h1 className="text-4xl font-bold mb-4">{watchTitle || "Article Title"}</h1>
                  <p className="text-lg text-gray-600 mb-8">{watchDescription || "Article description..."}</p>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Cover"
                      className="w-full h-96 object-cover rounded-lg mb-8"
                    />
                  )}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {watchTags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {watchContent ? (
                    <Preview content={watchContent} />
                  ) : (
                    <p className="text-gray-500 text-center py-12">No content yet...</p>
                  )}
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

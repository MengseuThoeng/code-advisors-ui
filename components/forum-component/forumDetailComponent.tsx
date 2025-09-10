/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    Bookmark,
    CircleArrowDown,
    CircleArrowUp,
    MessageSquare,
    Share2,
} from "lucide-react";
import React from "react";
import TagComponent from "../tag/tagComponent";
import RichTextEditor from "../text-editor/textEditor";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import CommentReplyComponent from "./commentReplyComponent";

const formSchema = z.object({
    content: z.string().min(10, {
        message: "ការពិពណ៌នាត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ",
    }),
});

export default function ForumDetailComponent() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    return (
        <div className="  ml-[264px] w-full">
            <TagComponent />
            <div className="p-4 bg-white rounded-[5px] shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img
                                src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-medium">@Golanginya</div>
                            <div className="text-sm text-gray-500">
                                12-Nov-2024 1:38PM
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        <div className="w-6 h-6">•••</div>
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                        How to patch KDE on FreeBSD?
                    </h2>
                    <p className="text-gray-700">
                        Mi magna sed nec nisl mattis. Magna cursus tincidunt
                        rhoncus imperdiet fermentum pretium, pharetra nisl.
                        Euismod.
                    </p>

                    {/* Code Block */}
                    <div className="bg-gray-100 rounded-md p-4 font-mono text-sm">
                        <pre className="space-y-1">
                            <div>package main</div>
                            <div>&nbsp;</div>
                            <div>import &quot;fmt&quot;</div>
                            <div>&nbsp;</div>
                            <div>func main() {"{"}</div>
                            <div> fmt.Println(&quot;Hello, world!&quot;)</div>
                            <div>{"}"}</div>
                        </pre>
                    </div>

                    <p className="text-gray-700">
                        Posuere arcu arcu consectetur turpis rhoncus tellus.
                        Massa, consectetur massa sit fames nulla eu vehicula
                        ullamcorper. Ante sit mauris elementum sollicitudin arcu
                        sit suspendisse pretium. Nisl egestas fringilla justo
                        bibendum.
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2">
                        {["java", "javascript", "spring"].map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm border border-secondary text-primary rounded-[5px]"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <CircleArrowUp className="w-6 h-6 text-gray-600" />
                        </button>
                        <span className="text-gray-600">30</span>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <CircleArrowDown className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MessageSquare className="w-6 h-6 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Bookmark className="w-6 h-6 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Share2 className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary text-xl font-bold​ ​">
                                    ការឆ្លើយតបរបស់អ្នក
                                </FormLabel>
                                <FormDescription className="text-sm">
                                    ចែករំលែកគំនិតរបស់អ្នក
                                </FormDescription>
                                <FormControl>
                                    <RichTextEditor
                                        content={field.value}
                                        onChange={(value: any) => {
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
                <div className="flex flex-col sm:flex-row-reverse gap-3 justify-start">
                    <Button
                        type="submit"
                        className="w-full sm:w-auto text-white"
                    >
                        បោះពុម្ភផ្សាយ
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto text-primary"
                    >
                        សេចក្តីព្រាង
                    </Button>
                </div>
            </div>
            <CommentReplyComponent />
        </div>
    );
}

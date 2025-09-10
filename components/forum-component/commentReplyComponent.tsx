/* eslint-disable react/no-unescaped-entities */
import {
    ChevronDown,
    ChevronUp,
    CircleCheck,
    MessageCircle,
    MoreVertical,
} from "lucide-react";
import React from "react";

export default function CommentReplyComponent() {
    return (
        <div className=" mt-3  mx-auto bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">12 Answers</h2>

            {/* Main Comment */}
            <div className="space-y-4">
                <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                    alt="Jenny Wilson"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-medium">Jenny Wilson</div>
                                <div className="text-sm text-gray-500">
                                    12-Nov-2024 1:38PM
                                </div>
                            </div>
                        </div>
                        <button className="text-gray-500">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <p>
                            If you use too many keyboard layouts, maybe the
                            MacOS shortcut might be active. You can disabled
                            ^(Ctrl)+Space shortcuts for MacOS.
                        </p>

                        <ul className="list-disc ml-5">
                            <li>
                                System
                                Preferences&gt;Keyboard&gt;Shorcuts&gt;Input
                                Sources&gt; Disable Select the previous input
                                source.
                            </li>
                        </ul>

                        <p>
                            You can use next shortcut for change input
                            sources.Ctrl+Alt+Space
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center">
                                <CircleCheck className="w-5 h-5 text-green-500  rounded-full" />
                                <div className="flex items-center mx-2">
                                    <ChevronUp className="w-5 h-5" />
                                    <span className="mx-1">50</span>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                            <button className="text-gray-600 flex items-center gap-1">
                                <MessageCircle className="w-5 h-5" />
                                <span>Reply</span>
                            </button>
                        </div>
                    </div>

                    {/* Nested Comments */}
                    <div className="mt-4 space-y-4 ml-8 border-l-2 border-gray-200 pl-4">
                        {/* First Reply */}
                        <div className="mt-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                            alt="Yith Sopheaktra"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            Yith Sopheaktra
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            12-Nov-2024 1:38PM
                                        </div>
                                    </div>
                                </div>
                                <button className="text-gray-500">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="mb-2">
                                Do I have to press control + space every time?
                                In my previous system it used to show without
                                pressing. Any idea why it's not working anymore?
                            </p>
                            <p>
                                Not sure why you single out CJK languages. This
                                is true for ANY multi-language setup. For
                                example, I am using SWE keyboard and I have to
                                use ALT+ESC.
                            </p>
                        </div>

                        {/* Second Reply */}
                        <div className="mt-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                            alt="Thoeng Mengseu"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            Thoeng Mengseu
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            12-Nov-2024 1:38PM
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>
                                Confirmed ! Awesome. I upgraded VS Code to
                                1.141.1, and Option + esc
                            </p>
                        </div>
                    </div>
                </div>

                {/* Second Main Comment */}
                <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                                    alt="Eung Lyzhia"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-medium">Eung Lyzhia</div>
                                <div className="text-sm text-gray-500">
                                    12-Nov-2024 1:38PM
                                </div>
                            </div>
                        </div>
                        <button className="text-gray-500">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <p>
                            "change input source&ldquo; keyboard shortcut should
                            be disabled
                        </p>
                        <p>To disable it-&gt;</p>
                        <ul className="list-disc ml-5 space-y-1">
                            <li>
                                Go to system preferences -&gt; keyboard -&gt;
                                input sources
                            </li>
                            <li>add a new input source (choose ABC)</li>
                            <li>
                                Go to shortcuts tab (inside of keyboard
                                settings)
                            </li>
                            <li>Click on input sources on the left</li>
                            <li>
                                disable the &ldquo;select previous input
                                source&ldquo; shortcut
                            </li>
                        </ul>
                        <p>
                            restart your vs code and now ctrl+space will show
                            quick suggestions.
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <ChevronUp className="w-5 h-5" />
                                    <span className="mx-1">5</span>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                            <button className="text-gray-600 flex items-center gap-1">
                                <MessageCircle className="w-5 h-5" />
                                <span>Reply</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

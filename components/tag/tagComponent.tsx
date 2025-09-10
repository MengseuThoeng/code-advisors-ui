import React from "react";

export default function TagComponent() {
    return (
        <div className="flex items-center p-2 justify-evenly px-10 bg-white rounded-[5px] shadow-sm mb-2">
            <button className="flex items-center gap-2">
                <span className="text-xl">+</span>
                <span className="text-primary">For you</span>
            </button>
            <div className="flex gap-3">
                {[
                    "Spring cloud",
                    "Technology",
                    "Javascript",
                    "Programming",
                    "Java",
                ].map((tag) => (
                    <button
                        key={tag}
                        className="hover:bg-gray-100 rounded-full px-3 py-1 text-primary"
                    >
                        #{tag}
                    </button>
                ))}
            </div>
            <button className="ml-auto">More</button>
        </div>
    );
}

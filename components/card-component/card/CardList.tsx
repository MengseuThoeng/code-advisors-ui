"use client";

import * as React from "react";
import { CardComponent } from "./CardComponent";
import { cardsData } from "@/lib/card";

export function CardList() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 z-10">
                {cardsData.map((card) => (
                    <CardComponent key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
}

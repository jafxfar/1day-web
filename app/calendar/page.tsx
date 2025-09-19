"use client";

import React from "react";

import { ActivityHeatmap } from "@/components/Heatmap";
export default function CalendarPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 dark:bg-black/80 p-4">
      <ActivityHeatmap />
    </div>
  );
}

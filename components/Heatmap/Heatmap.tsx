/**
 * ActivityHeatmap component
 *
 * Top-level heatmap card that toggles between week/month/year views.
 *
 * @author JX
 */
"use client";

import { useState, useMemo } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";

import { heatmapUtils } from "./Heatmap.utils";
import { YearView, MonthView, WeekView } from "./parts";

type ViewType = "week" | "month" | "year";

/**
 * ActivityHeatmap
 *
 * @returns JSX.Element
 */
export function ActivityHeatmap() {
  const [viewType, setViewType] = useState<ViewType>("year");

  const { generateSampleData } = heatmapUtils();

  const data = useMemo(() => generateSampleData(viewType), [viewType]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-xl font-semibold">Activity</h2>
        <div className="flex items-center gap-2">
          <Select
            className="w-32"
            selectedKeys={[viewType]}
            size="sm"
            variant="bordered"
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as ViewType;

              setViewType(selectedKey);
            }}
          >
            <SelectItem key="week">This week</SelectItem>
            <SelectItem key="month">This month</SelectItem>
            <SelectItem key="year">This year</SelectItem>
          </Select>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        {viewType === "week" && <WeekView data={data} />}
        {viewType === "month" && <MonthView data={data} />}
        {viewType === "year" && <YearView data={data} />}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-muted border border-border/50" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-300" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
            </div>
            <span>More</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

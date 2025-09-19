/**
 * Heatmap utils
 *
 * Utility functions and constants for the activity heatmap.
 *
 * @author JX
 */
import { ViewType } from "@/types";

export interface ActivityData {
  date: string;
  count: number;
}

export const heatmapUtils = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const generateSampleData = (viewType: ViewType): ActivityData[] => {
    const data: ActivityData[] = [];
    const now = new Date();

    if (viewType === "week") {
      // Generate data for current week
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);

        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 10),
        });
      }
    } else if (viewType === "month") {
      // Generate data for current month
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      for (
        let d = new Date(firstDay);
        d <= lastDay;
        d.setDate(d.getDate() + 1)
      ) {
        data.push({
          date: d.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 10),
        });
      }
    } else {
      // Generate data for current year
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear(), 11, 31);

      for (
        let d = new Date(startOfYear);
        d <= endOfYear;
        d.setDate(d.getDate() + 1)
      ) {
        data.push({
          date: d.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 10),
        });
      }
    }

    return data;
  };

  const getIntensityColor = (count: number): string => {
    if (count === 0) return "bg-muted";
    if (count <= 2) return "bg-emerald-200";
    if (count <= 4) return "bg-emerald-300";
    if (count <= 6) return "bg-emerald-400";
    if (count <= 8) return "bg-emerald-500";

    return "bg-emerald-600";
  };

  return {
    days,
    dayLabels,
    monthNames,
    getIntensityColor,
    generateSampleData,
  };
};

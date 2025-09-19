/**
 * YearView component
 *
 * Renders a year overview heatmap.
 *
 * @author JX
 */
import { useMemo } from "react";

import { ActivityData, heatmapUtils } from "../Heatmap.utils";

interface Props {
  data: ActivityData[];
}

/**
 * YearView
 *
 * @param {Props} props Component props
 * @returns JSX.Element
 */
export const YearView = (props: Props) => {
  const { data } = props;

  const { getIntensityColor, dayLabels, monthNames } = heatmapUtils();
  const yearData = useMemo(() => {
    const months: { [key: number]: ActivityData[] } = {};

    // Group data by month
    data.forEach((item) => {
      const date = new Date(item.date);
      const monthIndex = date.getMonth();

      if (!months[monthIndex]) {
        months[monthIndex] = [];
      }
      months[monthIndex].push(item);
    });

    // Create calendar structure for each month
    const calendars = monthNames.map((monthName, monthIndex) => {
      const monthData = months[monthIndex] || [];
      const year = new Date().getFullYear();
      const firstDay = new Date(year, monthIndex, 1);
      const lastDay = new Date(year, monthIndex + 1, 0);
      const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

      const weeks: (ActivityData | null)[][] = [];
      let currentWeek: (ActivityData | null)[] = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        currentWeek.push(null);
      }

      // Add all days of the month
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const dayData = monthData.find((item) => item.date === dateStr) || {
          date: dateStr,
          count: 0,
        };

        currentWeek.push(dayData);

        // If it's Sunday or the last day of the month, start a new week
        if (currentWeek.length === 7) {
          weeks.push([...currentWeek]);
          currentWeek = [];
        }
      }

      // Fill the last week with empty cells if needed
      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeks.push(currentWeek);
      }

      return {
        name: monthName,
        weeks,
      };
    });

    return calendars;
  }, [data]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {yearData.map((month, monthIndex) => (
        <div key={monthIndex} className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-center text-foreground">
            {month.name}
          </h3>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {dayLabels.map((day, index) => (
              <div
                key={index}
                className="text-[10px] text-muted-foreground text-center font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex flex-col gap-0.5">
            {month.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-0.5">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`
                      w-4 h-4 sm:w-5 sm:h-5 rounded-sm text-[8px] sm:text-[10px] flex items-center justify-center
                      ${day ? getIntensityColor(day.count) : "bg-transparent"}
                      ${day ? "border border-border/30 hover:border-border transition-colors cursor-pointer" : ""}
                      ${day ? "text-foreground font-medium" : ""}
                    `}
                    title={
                      day
                        ? `${new Date(day.date).toLocaleDateString()}: ${day.count} activities`
                        : ""
                    }
                  >
                    {day ? new Date(day.date).getDate() : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

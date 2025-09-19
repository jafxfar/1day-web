/**
 * MonthView component
 *
 * Renders a monthly activity heatmap view.
 *
 * @author JX
 */
import { useMemo } from "react";

import { ActivityData, heatmapUtils } from "../Heatmap.utils";

interface Props {
  data: ActivityData[];
}

/**
 * MonthView
 *
 * @param {Props} props Component props
 * @returns JSX.Element
 */
export const MonthView = (props: Props) => {
  const { data } = props;

  const { days, getIntensityColor } = heatmapUtils();
  const monthData = useMemo(() => {
    const weeks: (ActivityData | null)[][] = [];
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    let currentWeek: (ActivityData | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      currentWeek.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayData = data.find((item) => item.date === dateStr) || {
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

    return weeks;
  }, [data]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-7 gap-2 text-sm text-muted-foreground mb-2">
        {days.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      {monthData.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-2">
          {week.map((item, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${
                item ? getIntensityColor(item.count) : "bg-transparent"
              } ${item ? "border border-border/50 hover:border-border transition-colors cursor-pointer" : ""} flex items-center justify-center text-sm font-medium text-foreground`}
              title={
                item
                  ? `${new Date(item.date).toLocaleDateString()}: ${item.count} activities`
                  : ""
              }
            >
              {item ? new Date(item.date).getDate() : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

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
    const weeks: ActivityData[][] = [];
    let currentWeek: ActivityData[] = [];

    data.forEach((item, index) => {
      const date = new Date(item.date);
      const dayOfWeek = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

      // Fill empty days at the beginning of the first week
      if (index === 0 && dayOfWeek > 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: 0 });
        }
      }

      currentWeek.push(item);

      // If it's Sunday or the last day, complete the week
      if (dayOfWeek === 6 || index === data.length - 1) {
        // Fill empty days at the end of the last week
        while (currentWeek.length < 7) {
          currentWeek.push({ date: "", count: 0 });
        }
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    return weeks;
  }, [data]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[280px] md:min-w-0 flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-2">
        {days.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
        {monthData.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((item, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-5 sm:w-6 h-5 sm:h-6 rounded-sm ${
                  item.date ? getIntensityColor(item.count) : "bg-transparent"
                } border border-border/30 hover:border-border transition-colors cursor-pointer`}
                title={
                  item.date
                    ? `${new Date(item.date).toLocaleDateString()}: ${item.count} activities`
                    : ""
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

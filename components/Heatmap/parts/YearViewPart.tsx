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

  const { getIntensityColor, days, monthNames } = heatmapUtils();

  const yearData = useMemo(() => {
    const months: { [key: string]: ActivityData[][] } = {};

    data.forEach((item) => {
      const date = new Date(item.date);
      const monthKey = date.getMonth();
      const monthName = monthNames[monthKey];

      if (!months[monthName]) {
        months[monthName] = [[], [], [], [], [], [], []]; // 7 days of week
      }

      const dayOfWeek = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

      months[monthName][dayOfWeek].push(item);
    });

    return { months, monthNames };
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-4 text-xs text-muted-foreground mb-2">
        {yearData.monthNames.map((month) => (
          <div key={month} className="text-center font-medium">
            {month}
          </div>
        ))}
      </div>

      {days.map((day, dayIndex) => (
        <div key={day} className="flex items-center gap-4">
          <div className="w-8 text-xs text-muted-foreground font-medium">
            {day}
          </div>
          <div className="grid grid-cols-12 gap-4 flex-1">
            {yearData.monthNames.map((month) => (
              <div key={`${day}-${month}`} className="flex gap-0.5">
                {(yearData.months[month]?.[dayIndex] || [])
                  .slice(0, 5)
                  .map((item, index) => (
                    <div
                      key={`${item.date}-${index}`}
                      className={`w-2.5 h-2.5 rounded-sm ${getIntensityColor(item.count)} hover:scale-110 transition-transform cursor-pointer`}
                      title={`${new Date(item.date).toLocaleDateString()}: ${item.count} activities`}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

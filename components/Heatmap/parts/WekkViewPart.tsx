/**
 * WeekView component
 *
 * Renders a weekly activity heatmap row.
 *
 * @author JX
 */
import { ActivityData, heatmapUtils } from "../Heatmap.utils";

interface Props {
  data: ActivityData[];
}

/**
 * WeekView
 *
 * @param {Props} props Component props
 * @returns JSX.Element
 */
export const WeekView = (props: Props) => {
  const { data } = props;

  const { getIntensityColor, days } = heatmapUtils();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-7 gap-2 text-sm text-muted-foreground mb-2">
        {days.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {data.map((item) => {
          const date = new Date(item.date);

          return (
            <div
              key={item.date}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg ${getIntensityColor(item.count)} border border-border/50 hover:border-border transition-colors cursor-pointer flex items-center justify-center text-sm font-medium text-foreground`}
              title={`${date.toLocaleDateString()}: ${item.count} activities`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

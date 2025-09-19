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
    <div className="w-full overflow-x-auto">
      <div className="min-w-[260px] md:min-w-0 flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-1 text-sm text-muted-foreground mb-2">
          {days.map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {data.map((item) => {
            const date = new Date(item.date);

            return (
              <div
                key={item.date}
                className={`w-6 sm:w-8 h-6 sm:h-8 rounded-sm ${getIntensityColor(item.count)} border border-border/50 hover:border-border transition-colors cursor-pointer`}
                title={`${date.toLocaleDateString()}: ${item.count} activities`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

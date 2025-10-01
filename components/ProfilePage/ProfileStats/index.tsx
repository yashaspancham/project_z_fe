import StatComp from "../statComp";

type StatData = {
  subText: string;
  value: number | string;
};

type Stats = Record<string, StatData>;
type ProfileStatsProps = {
  stats: Stats | null;
};

const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <div className="m-5 p-5 w-[300px] bg-[#fcfcff] rounded">
      {stats &&
        Object.entries(stats).map(([key, { subText, value }]) => (
          <StatComp
            key={key}
            valueName={key}
            valueSubScript={subText}
            value={value}
          />
        ))}
    </div>
  );
};

export default ProfileStats;

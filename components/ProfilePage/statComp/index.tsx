const StatComp = ({ valueName, valueSubScript, value }: any) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <p className="text-md">{valueName}:</p>
        <span className="text-xs text-gray-500">{valueSubScript}</span>
      </div>
      <p className="text-3xl text-emerald-700">
        {value !== undefined && value !== null
          ? value.toString().length > 4
            ? value.toString().slice(0, 4) + ".."
            : value.toString()
          : "—"}
      </p>
    </div>
  );
};

export default StatComp;

import { SelectApp } from "../components";
import { GapByOrigins } from "../components/metrics/GapByOrigins";
import { GeneralEvaluations } from "../components/metrics/GeneralEvaluations";
import { MetricsHeader } from "../components/metrics/MetricsHeader";
import { PercentageByBlock } from "../components/metrics/PercentageByBlock";
import { SelectLevel } from "../components/metrics/SelectLevel";
import { useState } from "react";

export const MetricsPage = () => {
  const [level, setLevel] = useState("secundaria");
  const [appId, setAppId] = useState(null);

  return (
    <section className="w-full space-y-10 h-screen overflow-y-auto">
      <MetricsHeader />
      <div className="px-20 flex items-center justify-between">
        <SelectLevel level={level} setLevel={setLevel} />
        <SelectApp selectedApp={appId} setSelectedApp={setAppId} />
      </div>
      <GeneralEvaluations />
      <div className="grid grid-cols-2 gap-4 px-20">
        <PercentageByBlock />
        <GapByOrigins />
      </div>
    </section>
  );
};

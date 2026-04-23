import { useMetrics } from "@/hooks/useMetrics";
import { SelectApp } from "../components";
import { GapByOrigins } from "../components/metrics/GapByOrigins";
import { GeneralEvaluations } from "../components/metrics/GeneralEvaluations";
import { MetricsHeader } from "../components/metrics/MetricsHeader";
import { PercentageByBlock } from "../components/metrics/PercentageByBlock";
import { QuestionsTable } from "../components/metrics/QuestionsTable";
import { SelectLevel } from "../components/metrics/SelectLevel";
import { useState } from "react";

export const MetricsPage = () => {
  const [level, setLevel] = useState("secundaria");
  const [appId, setAppId] = useState(null);

  const { getAccertsQuery } = useMetrics("6712e526aa2479c2a9e3d3b4");

  console.log(getAccertsQuery.data);
  return (
    <section className="w-full h-screen overflow-y-auto space-y-10">
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
      <QuestionsTable />
    </section>
  );
};

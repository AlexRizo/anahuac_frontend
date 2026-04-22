import { SelectApp } from "../components";
import { GeneralEvaluations } from "../components/metrics/GeneralEvaluations";
import { MetricsHeader } from "../components/metrics/MetricsHeader";
import { SelectLevel } from "../components/metrics/SelectLevel";
import { useState } from "react";

export const MetricsPage = () => {
  const [level, setLevel] = useState("secundaria");
  const [appId, setAppId] = useState(null);

  return (
    <section className="w-full space-y-10">
      <MetricsHeader />
      <div className="px-20 flex items-center justify-between">
        <SelectLevel level={level} setLevel={setLevel} />
        <SelectApp selectedApp={appId} setSelectedApp={setAppId}/>
      </div>
      <GeneralEvaluations />
    </section>
  );
};

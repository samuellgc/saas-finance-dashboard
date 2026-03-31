"use client";

import { useEffect, useState } from "react";
import { dashboardPeriodOptions } from "@/modules/dashboard/mocks/dashboard.mock";
import { dashboardService } from "@/modules/dashboard/services/dashboard.service";
import type {
  DashboardOverview,
  DashboardPeriodKey,
  DashboardService,
} from "@/modules/dashboard/types/dashboard.types";
import { emptyDashboardOverview } from "@/modules/dashboard/utils/dashboard.utils";

type UseDashboardOverviewOptions = {
  initialPeriod?: DashboardPeriodKey;
  service?: DashboardService;
};

const defaultDashboardPeriod: DashboardPeriodKey = "90d";

export function useDashboardOverview({
  initialPeriod = defaultDashboardPeriod,
  service = dashboardService,
}: UseDashboardOverviewOptions = {}) {
  const [selectedPeriod, setSelectedPeriod] = useState<DashboardPeriodKey>(initialPeriod);
  const [overview, setOverview] = useState<DashboardOverview>(emptyDashboardOverview);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);

    void service.getOverview(selectedPeriod).then(result => {
      if (!isActive) {
        return;
      }

      setOverview(result);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [selectedPeriod, service]);

  return {
    overview,
    isLoading,
    periodOptions: dashboardPeriodOptions,
    selectedPeriod,
    setSelectedPeriod,
  };
}

import { DASHBOARD_REFERENCE_DATE, dashboardTransactionsMock } from "@/modules/dashboard/mocks/dashboard.mock";
import type {
  DashboardPeriodKey,
  DashboardService,
  DashboardTransaction,
} from "@/modules/dashboard/types/dashboard.types";
import { buildDashboardOverview } from "@/modules/dashboard/utils/dashboard.utils";

type CreateDashboardServiceOptions = {
  transactions?: DashboardTransaction[];
  referenceDate?: Date;
  delayMs?: number;
};

function wait(delayMs: number) {
  if (delayMs <= 0) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });
}

export function createDashboardService({
  transactions = dashboardTransactionsMock,
  referenceDate = DASHBOARD_REFERENCE_DATE,
  delayMs = 180,
}: CreateDashboardServiceOptions = {}): DashboardService {
  return {
    async getOverview(period: DashboardPeriodKey) {
      await wait(delayMs);

      return buildDashboardOverview(transactions, period, referenceDate);
    },
  };
}

export const dashboardService = createDashboardService();

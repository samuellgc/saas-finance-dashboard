import { DASHBOARD_REFERENCE_DATE, dashboardTransactionsMock } from "@/modules/dashboard/mocks/dashboard.mock";
import type {
  DashboardPeriodKey,
  DashboardService,
  DashboardTransaction,
} from "@/modules/dashboard/types/dashboard.types";
import { buildDashboardOverview } from "@/modules/dashboard/utils/dashboard.utils";
import { delay } from "@/shared/utils/async";

type CreateDashboardServiceOptions = {
  transactions?: DashboardTransaction[];
  referenceDate?: Date;
  delayMs?: number;
};

export function createDashboardService({
  transactions = dashboardTransactionsMock,
  referenceDate = DASHBOARD_REFERENCE_DATE,
  delayMs = 180,
}: CreateDashboardServiceOptions = {}): DashboardService {
  return {
    async getOverview(period: DashboardPeriodKey) {
      await delay(delayMs);

      return buildDashboardOverview(transactions, period, referenceDate);
    },
  };
}

export const dashboardService = createDashboardService();

import { MainLayout } from "@/components/layout/main-layout";
import { KPICard } from "@/components/common/kpi-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { QualityChart } from "@/components/dashboard/quality-chart";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="총 생산량"
            value="12,345"
            change={12}
            changeLabel="전월 대비"
          />
          <KPICard
            title="불량률"
            value="1.8%"
            change={-0.5}
            changeLabel="전월 대비"
          />
          <KPICard
            title="설비 가동률"
            value="85%"
            change={2}
            changeLabel="전월 대비"
          />
          <KPICard
            title="자재 재고"
            value="2,345"
            change={-5}
            changeLabel="전월 대비"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <ProductionChart />
          </div>
          <div className="col-span-3">
            <QualityChart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

import { MainLayout } from "@/components/layout/main-layout";

export default function QualityPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">품질관리</h2>
        </div>
        <div className="grid gap-4">{/* 품질관리 컨텐츠 */}</div>
      </div>
    </MainLayout>
  );
}

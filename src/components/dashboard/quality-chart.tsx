"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1월", 불량률: 2.1 },
  { name: "2월", 불량률: 1.8 },
  { name: "3월", 불량률: 2.3 },
  { name: "4월", 불량률: 1.9 },
  { name: "5월", 불량률: 2.0 },
  { name: "6월", 불량률: 1.7 },
];

export function QualityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 불량률</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="불량률" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1월", 생산량: 4000 },
  { name: "2월", 생산량: 3000 },
  { name: "3월", 생산량: 2000 },
  { name: "4월", 생산량: 2780 },
  { name: "5월", 생산량: 1890 },
  { name: "6월", 생산량: 2390 },
];

export function ProductionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 생산량</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="생산량"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

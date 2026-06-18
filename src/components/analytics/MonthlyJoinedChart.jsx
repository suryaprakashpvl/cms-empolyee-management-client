import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * MonthlyHiresChart
 *
 * Props:
 *  - data        (array)   Array of { month: string, hires: number }
 *  - dataKey     (string)  Key in each data object for Y values (default: "hires")
 *  - color       (string)  Line + fill color (default: "#7F77DD")
 *  - height      (number)  Chart height in px (default: 210)
 *  - title       (string)  Card title
 *  - sub         (string)  Card subtitle
 *  - legendLabel (string)  Label shown in the legend strip
 *  - yMax        (number)  Y-axis upper bound (auto if omitted)
 *
 * Example data:
 *  [
 *    { month: "Jan", hires: 8  },
 *    { month: "Feb", hires: 12 },
 *    { month: "Mar", hires: 6  },
 *  ]
 */

function CustomTooltip({ active, payload, label, legendLabel }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 13,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ margin: 0, fontSize: 11, color: "#64748B" }}>{label}</p>
      <p style={{ margin: "2px 0 0", fontWeight: 600 }}>
        {payload[0].value} {legendLabel}
      </p>
    </div>
  );
}

export default function MonthlyHiresChart({
  data = [],
  dataKey = "hires",
  color = "#7F77DD",
  height = 210,
  title = "Monthly hires",
  sub = "New employees joined per month",
  legendLabel = "new hires",
  yMax,
}) {
  const gradientId = `grad-${color.replace("#", "")}`;
  const computedMax = yMax ?? Math.ceil(Math.max(...data.map((d) => d[dataKey])) * 1.2);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: 12,
        padding: "20px 20px 16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <h2 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
        {title}
      </h2>
      <p style={{ margin: "0 0 12px", fontSize: 12, color: "#94A3B8" }}>{sub}</p>

      {/* Legend strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <span
          style={{
            display: "inline-block",
            width: 18,
            height: 2,
            borderRadius: 2,
            background: color,
          }}
        />
        <span style={{ fontSize: 12, color: "#64748B" }}>{legendLabel}</span>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.18} />
              <stop offset="95%" stopColor={color} stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
            domain={[0, computedMax]}
          />
          <Tooltip
            content={<CustomTooltip legendLabel={legendLabel} />}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={{ fill: color, r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
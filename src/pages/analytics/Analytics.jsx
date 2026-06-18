import { useState, useEffect } from "react";
import StatCard        from "../../components/analytics/StatCard";
import DepartmentChart   from "../../components/analytics/DepartmentChart";
import StatusChart       from "../../components/analytics/StatusChart";
import MonthlyHiresChart from "../../components/analytics/MonthlyJoinedChart";
import { getAnalyticsData } from "../../services/analyticService";
import Navbar from '../../components/common/Navbar';

// ── Inline SVG icons (no extra dependency) ───────────────────────────────────
const IconUsers = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconCheck = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconClock = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconUserPlus = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
    <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

// ── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton({ width = "100%", height = 20, radius = 6 }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

// ── Error banner ─────────────────────────────────────────────────────────────
function ErrorBanner({ message, onRetry }) {
  return (
    <div
      style={{
        background: "#FEF2F2",
        border: "1px solid #FECACA",
        borderRadius: 10,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 24,
      }}
    >
      <p style={{ margin: 0, fontSize: 13, color: "#DC2626" }}>
        ⚠ Failed to load analytics: {message}
      </p>
      <button
        onClick={onRetry}
        style={{
          fontSize: 12,
          padding: "6px 14px",
          borderRadius: 6,
          border: "1px solid #FCA5A5",
          background: "#fff",
          color: "#DC2626",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Retry
      </button>
    </div>
  );
}

// ── KPI card skeleton row ────────────────────────────────────────────────────
function KPISkeletonRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 20 }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #F1F5F9", borderRadius: 12, padding: "20px 20px 16px" }}>
          <Skeleton width="60%" height={12} />
          <div style={{ marginTop: 10 }}><Skeleton width="45%" height={34} /></div>
          <div style={{ marginTop: 8 }}><Skeleton width="80%" height={10} /></div>
        </div>
      ))}
    </div>
  );
}

// ── Chart skeleton card ──────────────────────────────────────────────────────
function ChartSkeleton({ height = 300 }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #F1F5F9", borderRadius: 12, padding: "20px 20px 16px" }}>
      <Skeleton width="40%" height={14} />
      <div style={{ marginTop: 6 }}><Skeleton width="60%" height={11} /></div>
      <div style={{ marginTop: 20 }}><Skeleton width="100%" height={height} radius={8} /></div>
    </div>
  );
}

// ── Current month label helper ───────────────────────────────────────────────
const MONTH_NAMES = ["January","February","March","April","May","June",
                     "July","August","September","October","November","December"];
const currentMonthLabel = () => {
  const d = new Date();
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
};

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function EmployeeDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [year,      setYear]      = useState(new Date().getFullYear());

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await getAnalyticsData(year);
      setAnalytics(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [year]);

  // ── Derived KPI config (built from live API data) ──────────────────────────
  const buildKPIs = (summary) => {
    const activePct = summary?.total
      ? Math.round((summary.active / summary?.total) * 100)
      : 0;
    return [
      {
        label: "Total employees",
        value: summary?.total||analytics?.summary?.total||0,
        color: "#0F172A",
        icon:  <IconUsers />,
        sub:   "All headcount",
      },
      {
        label: "Active",
        value: summary?.active||analytics?.summary?.active||0,
        color: "#1D9E75",
        icon:  <IconCheck />,
        sub:   `${activePct}% of workforce`,
      },
      {
        label: "On leave",
        value: summary?.onLeave||analytics?.summary?.onLeave||0,
        color: "#EF9F27",
        icon:  <IconClock />,
        sub:   "Temporary absence",
      },
      {
        label: "Joined this month",
        value: summary?.joinedThisMonth||analytics?.summary?.joinedThisMonth||0,
        color: "#7F77DD",
        icon:  <IconUserPlus />,
        sub:   currentMonthLabel(),
      },
    ];
  };

  return (
    <>
        <Navbar />

      {/* shimmer keyframe injected once */}
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#F8FAFC",
          padding: "32px 24px",
          fontFamily: "'Inter', system-ui, sans-serif",
          color: "#1E293B",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#0F172A" }}>
                People analytics
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94A3B8" }}>
                Workforce overview · {year}
              </p>
            </div>

            {/* Year picker */}
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              style={{
                fontSize: 13,
                padding: "7px 12px",
                borderRadius: 8,
                border: "1px solid #E2E8F0",
                background: "#fff",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              {[2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && <ErrorBanner message={error} onRetry={load} />}

          {/* KPI Cards */}
          {loading ? (
            <KPISkeletonRow />
          ) : analytics ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 20 }}>
              {buildKPIs(analytics.summary).map((kpi) => (
                <StatCard key={kpi.label} {...kpi} />
              ))}
            </div>
          ) : null}

          {/* Charts row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14, marginBottom: 14 }}>
            {loading ? (
              <>
                <ChartSkeleton height={260} />
                <ChartSkeleton height={260} />
              </>
            ) : analytics ? (
              <>
                <DepartmentChart
                  data={analytics?.departments}
                  title="Department breakdown"
                  sub="Headcount by team"
                />
                <StatusChart
                  data={analytics?.status}
                  total={analytics?.summary?.total}
                  title="Employee status"
                  sub="Current workforce distribution"
                />
              </>
            ) : null}
          </div>

          {/* Monthly trend */}
          {loading ? (
            <ChartSkeleton height={210} />
          ) : analytics ? (
            <MonthlyHiresChart
              data={analytics?.monthlyHires?.months}
              dataKey="hires"
              color="#7F77DD"
              title="Monthly hires"
              sub={`New employees joined per month · ${year}`}
              legendLabel="new hires"
            />
          ) : null}

        </div>
      </div>
    </>
  );
}
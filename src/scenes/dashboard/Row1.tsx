import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  // Fallback sample data to ensure charts render even if API data is unavailable
  const defaultRevenue = [
    { name: "Jan", revenue: 20000 },
    { name: "Feb", revenue: 21000 },
    { name: "Mar", revenue: 22000 },
    { name: "Apr", revenue: 21500 },
    { name: "May", revenue: 22500 },
    { name: "Jun", revenue: 23000 },
    { name: "Jul", revenue: 23500 },
    { name: "Aug", revenue: 24000 },
    { name: "Sep", revenue: 23800 },
    { name: "Oct", revenue: 24500 },
    { name: "Nov", revenue: 25000 },
    { name: "Dec", revenue: 25500 },
  ];

  const defaultRevenueExpenses = [
    { name: "Jan", revenue: 20000, expenses: 14000 },
    { name: "Feb", revenue: 21000, expenses: 14500 },
    { name: "Mar", revenue: 22000, expenses: 15000 },
    { name: "Apr", revenue: 21500, expenses: 15250 },
    { name: "May", revenue: 22500, expenses: 15500 },
    { name: "Jun", revenue: 23000, expenses: 16000 },
    { name: "Jul", revenue: 23500, expenses: 16200 },
    { name: "Aug", revenue: 24000, expenses: 16500 },
    { name: "Sep", revenue: 23800, expenses: 16400 },
    { name: "Oct", revenue: 24500, expenses: 16800 },
    { name: "Nov", revenue: 25000, expenses: 17000 },
    { name: "Dec", revenue: 25500, expenses: 17250 },
  ];

  const defaultRevenueProfit = defaultRevenueExpenses.map(({ name, revenue, expenses }) => ({
    name,
    revenue,
    profit: Number((revenue - expenses).toFixed(2)),
  }));

  const revenue = useMemo(() => {
    if (!data || !data[0]) return defaultRevenue;
    const mapped = data[0].monthlyData.map(({ month, revenue }) => ({
      name: month.substring(0, 3),
      revenue,
    }));
    return mapped.length ? mapped : defaultRevenue;
  }, [data]);

  const revenueExpenses = useMemo(() => {
    if (!data || !data[0]) return defaultRevenueExpenses;
    const mapped = data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue,
      expenses,
    }));
    return mapped.length ? mapped : defaultRevenueExpenses;
  }, [data]);

  const revenueProfit = useMemo(() => {
    if (!data || !data[0]) return defaultRevenueProfit;
    const mapped = data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue,
      // ensure profit is numeric, not a string
      profit: Number((revenue - expenses).toFixed(2)),
    }));
    return mapped.length ? mapped : defaultRevenueProfit;
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenueArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary.light}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary.light}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpensesArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary.light}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary.light}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={["auto", "auto"]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenueArea)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.secondary.main}
              fillOpacity={1}
              fill="url(#colorExpensesArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.secondary.main} /* fallback to secondary.main, adjust as needed */
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenueBar" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary.light}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary.light}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenueBar)" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </DashboardBox>
    </>
  );
};

export default Row1;

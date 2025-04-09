
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PlusIcon, CalendarIcon, ReceiptIcon, UploadIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for charts
const expenseData = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 2000 },
  { name: "Apr", amount: 2780 },
  { name: "May", amount: 1890 },
  { name: "Jun", amount: 2390 },
];

const categoryData = [
  { name: "Venue", value: 40 },
  { name: "Catering", value: 30 },
  { name: "Marketing", value: 15 },
  { name: "Equipment", value: 15 },
];

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d"];

const upcomingEvents = [
  {
    id: 1,
    name: "Annual Conference",
    date: "April 15, 2025",
    budget: 12000,
    spent: 8500,
  },
  {
    id: 2,
    name: "Team Building Workshop",
    date: "April 22, 2025",
    budget: 5000,
    spent: 1200,
  },
  {
    id: 3,
    name: "Product Launch",
    date: "May 5, 2025",
    budget: 20000,
    spent: 5000,
  },
];

const recentExpenses = [
  {
    id: 1,
    description: "Venue Deposit",
    amount: 5000,
    date: "April 5, 2025",
    event: "Annual Conference",
  },
  {
    id: 2,
    description: "Catering Advance",
    amount: 2500,
    date: "April 2, 2025",
    event: "Annual Conference",
  },
  {
    id: 3,
    description: "Marketing Materials",
    amount: 1000,
    date: "March 28, 2025",
    event: "Product Launch",
  },
];

export default function DashboardPage() {
  // Mock user for demonstration
  const user = {
    name: "John Doe",
    role: "admin", // or "organizer"
  };
  
  const isAdmin = user.role === "admin";

  return (
    <AppShell>
      <PageHeader
        title={`Welcome back, ${user.name}`}
        description="Here's an overview of your expense management activities"
      >
        {isAdmin && (
          <Button asChild>
            <Link to="/events/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        )}
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Budget</CardDescription>
            <CardTitle className="text-3xl">$37,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +2.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spent</CardDescription>
            <CardTitle className="text-3xl">$14,700</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              39.7% of total budget
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Events</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              2 upcoming, 1 in progress
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Bills</CardDescription>
            <CardTitle className="text-3xl">7</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              4 awaiting approval
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Expense Trends</CardTitle>
            <CardDescription>Monthly expense breakdown</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={expenseData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))' 
                  }} 
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))' 
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events & Recent Expenses */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events in the next 30 days</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/events">
                View All
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <div className="font-medium">{event.name}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{event.date}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>Budget: ${event.budget.toLocaleString()}</div>
                    <div>Spent: ${event.spent.toLocaleString()}</div>
                  </div>
                  <Progress 
                    value={(event.spent / event.budget) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/expenses">
                View All
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-xs text-muted-foreground">{expense.event}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-medium">${expense.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{expense.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequent operations for your workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/expenses/new">
                  <ReceiptIcon className="mr-2 h-4 w-4" />
                  Record Expense
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/bills/upload">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Bill
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/reports">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  View Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

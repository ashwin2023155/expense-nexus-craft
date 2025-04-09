
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, SearchIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock expenses data
const expensesData = [
  {
    id: "1",
    description: "Venue Deposit",
    event: "Annual Conference 2025",
    category: "Venue",
    amount: 5000,
    date: "2025-04-05",
    status: "approved",
  },
  {
    id: "2",
    description: "Catering Advance",
    event: "Annual Conference 2025",
    category: "Catering",
    amount: 2500,
    date: "2025-04-10",
    status: "approved",
  },
  {
    id: "3",
    description: "Marketing Materials",
    event: "Product Launch Event",
    category: "Marketing",
    amount: 1500,
    date: "2025-04-15",
    status: "pending",
  },
  {
    id: "4",
    description: "Speaker Fees",
    event: "Annual Conference 2025",
    category: "Personnel",
    amount: 3500,
    date: "2025-05-01",
    status: "pending",
  },
  {
    id: "5",
    description: "Transportation",
    event: "Team Building Workshop",
    category: "Travel",
    amount: 800,
    date: "2025-04-18",
    status: "approved",
  },
];

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock user for demonstration
  const user = {
    name: "John Doe",
    role: "organizer", // or "admin"
  };
  
  const isAdmin = user.role === "admin";

  // Filter expenses based on search and filters
  const filteredExpenses = expensesData.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = eventFilter === "all" || expense.event === eventFilter;
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  // Extract unique event names for filter
  const eventOptions = [...new Set(expensesData.map(expense => expense.event))];

  return (
    <AppShell>
      <PageHeader
        title={isAdmin ? "All Expenses" : "My Expenses"}
        description={isAdmin ? "Review and manage all event expenses" : "Record and track your event expenses"}
      >
        {!isAdmin && (
          <Button asChild>
            <Link to="/expenses/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Record Expense
            </Link>
          </Button>
        )}
      </PageHeader>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {eventOptions.map((event) => (
                  <SelectItem key={event} value={event}>{event}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Records</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredExpenses.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>{expense.event}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>${expense.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={expense.status === "approved" ? "bg-green-500" : "bg-amber-500"}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </Badge>
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {expense.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline" className="h-8 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20">
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline" className="h-8">
                              <FileTextIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No expenses found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

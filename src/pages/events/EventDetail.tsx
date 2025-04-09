
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, UsersIcon, DollarSignIcon, ReceiptIcon, UploadIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock event data
const eventData = {
  id: "1",
  name: "Annual Conference 2025",
  type: "conference",
  status: "approved",
  startDate: "2025-06-15",
  endDate: "2025-06-17",
  venue: "Grand Convention Center",
  address: "123 Main St, Business District, City",
  budget: 25000,
  spent: 12500,
  createdBy: "John Doe",
  description: "The annual industry conference bringing together leaders and innovators from across the sector. This year's theme is 'Future Innovation' with keynote speakers, workshops, and networking opportunities.",
};

// Mock expenses
const expensesData = [
  {
    id: "e1",
    description: "Venue Deposit",
    amount: 5000,
    date: "2025-04-05",
    category: "Venue",
    status: "approved",
  },
  {
    id: "e2",
    description: "Catering Advance",
    amount: 2500,
    date: "2025-04-10",
    category: "Catering",
    status: "approved",
  },
  {
    id: "e3",
    description: "Marketing Materials",
    amount: 1500,
    date: "2025-04-15",
    category: "Marketing",
    status: "pending",
  },
  {
    id: "e4",
    description: "Speaker Fees",
    amount: 3500,
    date: "2025-05-01",
    category: "Personnel",
    status: "pending",
  },
];

// Mock bills
const billsData = [
  {
    id: "b1",
    description: "Venue Booking Invoice",
    amount: 5000,
    date: "2025-04-05",
    status: "approved",
    fileName: "venue_invoice.pdf",
  },
  {
    id: "b2",
    description: "Catering Deposit",
    amount: 2500,
    date: "2025-04-10",
    status: "approved",
    fileName: "catering_deposit.pdf",
  },
  {
    id: "b3",
    description: "Marketing Agency Invoice",
    amount: 1500,
    date: "2025-04-15",
    status: "pending",
    fileName: "marketing_invoice.pdf",
  },
];

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function EventDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock user for demonstration
  const user = {
    name: "John Doe",
    role: "organizer", // or "admin"
  };
  
  const isAdmin = user.role === "admin";
  
  // In a real app, we would fetch the event details using the id parameter
  console.log(`Fetching details for event with ID: ${id}`);

  return (
    <AppShell>
      <PageHeader
        title={eventData.name}
        description={`${eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1)} | ${formatDate(eventData.startDate)}`}
      >
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/events">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          {isAdmin ? (
            <Button asChild>
              <Link to={`/allocations`}>
                <DollarSignIcon className="mr-2 h-4 w-4" />
                Allocate Funds
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to={`/expenses/new`}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
          )}
        </div>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="bills">Bills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Complete information about this event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{eventData.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Event Information</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Date:</span>
                        <span>{formatDate(eventData.startDate)} - {formatDate(eventData.endDate)}</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Venue:</span>
                        <span>{eventData.venue}</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground mr-1">Address:</span>
                        <span>{eventData.address}</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <UsersIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Organizer:</span>
                        <span>{eventData.createdBy}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Budget Information</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Total Budget:</span>
                        <span>${eventData.budget.toLocaleString()}</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Spent:</span>
                        <span>${eventData.spent.toLocaleString()}</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Remaining:</span>
                        <span>${(eventData.budget - eventData.spent).toLocaleString()}</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="text-muted-foreground mr-1">Budget Utilization:</span>
                        <span>{Math.round((eventData.spent / eventData.budget) * 100)}%</span>
                      </li>
                    </ul>
                    <Progress className="mt-2 h-2" value={(eventData.spent / eventData.budget) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Event Status</CardTitle>
                <CardDescription>Current state and actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className="w-fit bg-green-500">{eventData.status.charAt(0).toUpperCase() + eventData.status.slice(1)}</Badge>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">Organizer:</span>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {eventData.createdBy.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{eventData.createdBy}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">Budget Usage:</span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{Math.round((eventData.spent / eventData.budget) * 100)}% Used</span>
                      <span>${eventData.spent.toLocaleString()} / ${eventData.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={(eventData.spent / eventData.budget) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                {isAdmin ? (
                  <>
                    <Button className="w-full" asChild>
                      <Link to="/allocations">
                        <DollarSignIcon className="mr-2 h-4 w-4" />
                        Allocate Funds
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full" asChild>
                      <Link to="/expenses/new">
                        <ReceiptIcon className="mr-2 h-4 w-4" />
                        Record Expense
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/bills/upload">
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Upload Bill
                      </Link>
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Event Expenses</CardTitle>
                <CardDescription>Financial records for this event</CardDescription>
              </div>
              {!isAdmin && (
                <Button asChild>
                  <Link to="/expenses/new">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Expense
                  </Link>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expensesData.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>${expense.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={expense.status === "approved" ? "bg-green-500" : "bg-amber-500"}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bills" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Event Bills</CardTitle>
                <CardDescription>Receipts and invoices for expenses</CardDescription>
              </div>
              {!isAdmin && (
                <Button asChild>
                  <Link to="/bills/upload">
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload Bill
                  </Link>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billsData.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.description}</TableCell>
                      <TableCell>{bill.fileName}</TableCell>
                      <TableCell>{formatDate(bill.date)}</TableCell>
                      <TableCell>${bill.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={bill.status === "approved" ? "bg-green-500" : "bg-amber-500"}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

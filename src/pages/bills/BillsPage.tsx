
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, SearchIcon, FileTextIcon, UploadIcon, DownloadIcon, CheckIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock bills data
const billsData = [
  {
    id: "1",
    description: "Venue Booking Invoice",
    event: "Annual Conference 2025",
    uploadedBy: "John Doe",
    amount: 5000,
    date: "2025-04-05",
    status: "approved",
    fileName: "venue_invoice.pdf",
  },
  {
    id: "2",
    description: "Catering Deposit",
    event: "Annual Conference 2025",
    uploadedBy: "John Doe",
    amount: 2500,
    date: "2025-04-10",
    status: "approved",
    fileName: "catering_deposit.pdf",
  },
  {
    id: "3",
    description: "Marketing Agency Invoice",
    event: "Product Launch Event",
    uploadedBy: "John Doe",
    amount: 1500,
    date: "2025-04-15",
    status: "pending",
    fileName: "marketing_invoice.pdf",
  },
  {
    id: "4",
    description: "Speaker Contract",
    event: "Annual Conference 2025",
    uploadedBy: "John Doe",
    amount: 3500,
    date: "2025-05-01",
    status: "pending",
    fileName: "speaker_contract.pdf",
  },
  {
    id: "5",
    description: "Transportation Receipts",
    event: "Team Building Workshop",
    uploadedBy: "Alice Smith",
    amount: 800,
    date: "2025-04-18",
    status: "approved",
    fileName: "transport_receipts.pdf",
  },
];

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function BillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock user for demonstration
  const user = {
    name: "John Doe",
    role: "organizer", // or "admin"
  };
  
  const isAdmin = user.role === "admin";

  // Filter bills based on search and filters
  const filteredBills = billsData.filter(bill => {
    const matchesSearch = bill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = eventFilter === "all" || bill.event === eventFilter;
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  // Extract unique event names for filter
  const eventOptions = [...new Set(billsData.map(bill => bill.event))];

  return (
    <AppShell>
      <PageHeader
        title={isAdmin ? "All Bills" : "My Bills"}
        description={isAdmin ? "Review and approve bill uploads" : "Upload and track bills for your events"}
      >
        {!isAdmin && (
          <Button asChild>
            <Link to="/bills/upload">
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Bill
            </Link>
          </Button>
        )}
      </PageHeader>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bills..."
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
            <CardTitle>Bill Records</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBills.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Event</TableHead>
                    {isAdmin && <TableHead>Uploaded By</TableHead>}
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.description}</TableCell>
                      <TableCell>{bill.event}</TableCell>
                      {isAdmin && <TableCell>{bill.uploadedBy}</TableCell>}
                      <TableCell>{bill.fileName}</TableCell>
                      <TableCell>{formatDate(bill.date)}</TableCell>
                      <TableCell>${bill.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={bill.status === "approved" ? "bg-green-500" : "bg-amber-500"}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                          {isAdmin && bill.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" className="h-8 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                                <CheckIcon className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20">
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No bills found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

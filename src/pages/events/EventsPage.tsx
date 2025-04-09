import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for event listing
const mockEvents = [
  {
    id: "1",
    name: "Annual Conference 2025",
    type: "conference",
    status: "approved",
    startDate: "2025-06-15",
    endDate: "2025-06-17",
    venue: "Grand Convention Center",
    budget: 25000,
    spent: 12500,
    createdBy: "John Doe",
  },
  {
    id: "2",
    name: "Team Building Workshop",
    type: "workshop",
    status: "pending",
    startDate: "2025-05-10",
    endDate: "2025-05-11",
    venue: "Mountain Retreat",
    budget: 8000,
    spent: 2000,
    createdBy: "Alice Smith",
  },
  {
    id: "3",
    name: "Product Launch Event",
    type: "launch",
    status: "approved",
    startDate: "2025-04-25",
    endDate: "2025-04-25",
    venue: "City Tech Hub",
    budget: 15000,
    spent: 7500,
    createdBy: "John Doe",
  },
  {
    id: "4",
    name: "Marketing Summit",
    type: "conference",
    status: "rejected",
    startDate: "2025-07-08",
    endDate: "2025-07-10",
    venue: "Harbor Conference Center",
    budget: 18000,
    spent: 0,
    createdBy: "Jane Wilson",
  },
  {
    id: "5",
    name: "Charity Fundraiser",
    type: "other",
    status: "approved",
    startDate: "2025-05-20",
    endDate: "2025-05-20",
    venue: "Community Hall",
    budget: 5000,
    spent: 1500,
    createdBy: "Alice Smith",
  },
];

// Type for event
type Event = {
  id: string;
  name: string;
  type: string;
  status: "approved" | "pending" | "rejected";
  startDate: string;
  endDate: string;
  venue: string;
  budget: number;
  spent: number;
  createdBy: string;
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock user for demonstration
  const user = {
    name: "John Doe",
    role: "admin", // or "organizer"
  };
  
  const isAdmin = user.role === "admin";

  // Filter events based on search and filters
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppShell>
      <PageHeader
        title="Events Management"
        description="View, create, and manage your events"
      >
        <Button asChild>
          <Link to="/events/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </PageHeader>

      <div className="mb-6">
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              {isAdmin && <TabsTrigger value="pending">Pending Approval</TabsTrigger>}
            </TabsList>

            <div className="flex gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="w-full pl-8 sm:w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" title="Filter Events">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="launch">Product Launch</SelectItem>
                <SelectItem value="college">College Event</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        {getStatusBadge(event.status)}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {event.type.replace('-', ' ')}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="font-medium">Date: </span> 
                          {formatDate(event.startDate)}
                          {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Venue: </span>
                          {event.venue}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Budget: </span>
                          ${event.budget.toLocaleString()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Budget Utilization</span>
                            <span>{Math.round((event.spent / event.budget) * 100)}%</span>
                          </div>
                          <Progress value={(event.spent / event.budget) * 100} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" asChild className="w-full">
                        <Link to={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <CalendarPlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No events found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                      ? "Try adjusting your filters"
                      : "Create your first event to get started"}
                  </p>
                  <Button asChild>
                    <Link to="/events/new">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Create Event
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            {/* Similar content as 'all' but filtered for upcoming events */}
            <div className="text-center py-10 text-muted-foreground">
              Upcoming events filtered view would display here
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            {/* Similar content as 'all' but filtered for past events */}
            <div className="text-center py-10 text-muted-foreground">
              Past events filtered view would display here
            </div>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="pending" className="mt-0">
              {/* Similar content as 'all' but filtered for pending approval */}
              <div className="text-center py-10 text-muted-foreground">
                Events pending approval would display here
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppShell>
  );
};

export default EventsPage;

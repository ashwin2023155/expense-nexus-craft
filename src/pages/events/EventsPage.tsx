
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, SearchIcon, FilterIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Mock data
const events = [
  {
    id: 1,
    name: "Annual Conference",
    date: "April 15, 2025",
    status: "upcoming",
    budget: 12000,
    spent: 8500,
    organizer: "John Doe",
  },
  {
    id: 2,
    name: "Team Building Workshop",
    date: "April 22, 2025",
    status: "upcoming",
    budget: 5000,
    spent: 1200,
    organizer: "Jane Smith",
  },
  {
    id: 3,
    name: "Product Launch",
    date: "May 5, 2025",
    status: "upcoming",
    budget: 20000,
    spent: 5000,
    organizer: "Mark Johnson",
  },
  {
    id: 4,
    name: "Holiday Party",
    date: "December 20, 2025",
    status: "planning",
    budget: 8000,
    spent: 1000,
    organizer: "Sarah Lee",
  },
  {
    id: 5,
    name: "Quarterly Meeting",
    date: "March 31, 2025",
    status: "completed",
    budget: 3000,
    spent: 2800,
    organizer: "John Doe",
  },
  {
    id: 6,
    name: "Tech Conference 2025",
    date: "September 15, 2025",
    status: "planning",
    budget: 15000,
    spent: 0,
    organizer: "Alex Turner",
  },
];

// Status badge styling
const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-500/20 text-blue-500";
    case "completed":
      return "bg-green-500/20 text-green-500";
    case "planning":
      return "bg-purple-500/20 text-purple-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter events based on search and tab filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase()) ||
                          event.organizer.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || event.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Mock user for demonstration
  const user = {
    role: "admin", // or "organizer"
  };
  
  const isAdmin = user.role === "admin";

  return (
    <AppShell>
      <PageHeader
        title="Events Management"
        description="Create, view and manage all your events"
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

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Manage all your organization's events
              </CardDescription>
            </div>
            <div className="flex w-full items-center space-x-2 md:w-auto">
              <div className="relative w-full md:w-auto">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8 md:w-[200px] lg:w-[300px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              {event.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(event.status)}
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>${event.budget.toLocaleString()}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                          <TableCell>
                            <div className="w-full max-w-xs">
                              <div className="flex justify-between text-xs font-medium mb-1">
                                <span>${event.spent.toLocaleString()}</span>
                                <span>${event.budget.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(event.spent / event.budget) * 100} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/events/${event.id}`}>
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No events found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="space-y-4">
              {/* This content is dynamically filtered by the tab selection */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              {event.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(event.status)}
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>${event.budget.toLocaleString()}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                          <TableCell>
                            <div className="w-full max-w-xs">
                              <div className="flex justify-between text-xs font-medium mb-1">
                                <span>${event.spent.toLocaleString()}</span>
                                <span>${event.budget.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(event.spent / event.budget) * 100} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/events/${event.id}`}>
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No events found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="planning" className="space-y-4">
              {/* Same table structure for planning tab */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              {event.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(event.status)}
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>${event.budget.toLocaleString()}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                          <TableCell>
                            <div className="w-full max-w-xs">
                              <div className="flex justify-between text-xs font-medium mb-1">
                                <span>${event.spent.toLocaleString()}</span>
                                <span>${event.budget.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(event.spent / event.budget) * 100} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/events/${event.id}`}>
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No events found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {/* Same table structure for completed tab */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              {event.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(event.status)}
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>${event.budget.toLocaleString()}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                          <TableCell>
                            <div className="w-full max-w-xs">
                              <div className="flex justify-between text-xs font-medium mb-1">
                                <span>${event.spent.toLocaleString()}</span>
                                <span>${event.budget.toLocaleString()}</span>
                              </div>
                              <Progress 
                                value={(event.spent / event.budget) * 100} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/events/${event.id}`}>
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No events found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppShell>
  );
}

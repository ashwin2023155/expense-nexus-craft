
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SearchIcon, DollarSignIcon, PlusIcon } from "lucide-react";

// Sample data for allocations
const allocationsData = [
  {
    id: "1",
    eventId: "1",
    eventName: "Annual Conference 2025",
    organizer: "John Doe",
    totalBudget: 25000,
    allocated: 25000,
    remaining: 12500,
    status: "approved",
  },
  {
    id: "2",
    eventId: "2",
    eventName: "Team Building Workshop",
    organizer: "Alice Smith",
    totalBudget: 8000,
    allocated: 8000,
    remaining: 6000,
    status: "approved",
  },
  {
    id: "3",
    eventId: "3",
    eventName: "Product Launch Event",
    organizer: "John Doe",
    totalBudget: 15000,
    allocated: 15000,
    remaining: 7500,
    status: "approved",
  },
  {
    id: "4",
    eventId: "5",
    eventName: "Charity Fundraiser",
    organizer: "Alice Smith",
    totalBudget: 5000,
    allocated: 5000,
    remaining: 3500,
    status: "approved",
  },
];

// Form schema for allocating funds
const allocateFormSchema = z.object({
  eventId: z.string({
    required_error: "Please select an event",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount greater than 0",
  }),
  notes: z.string().optional(),
});

const AllocationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter allocations based on search
  const filteredAllocations = allocationsData.filter(allocation =>
    allocation.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allocation.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get form control
  const form = useForm<z.infer<typeof allocateFormSchema>>({
    resolver: zodResolver(allocateFormSchema),
    defaultValues: {
      eventId: "",
      amount: "",
      notes: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof allocateFormSchema>) => {
    console.log(values);
    // In a real app, this would call an API to allocate funds
    toast.success("Funds allocated successfully", {
      description: `$${values.amount} allocated to event`,
    });
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <AppShell>
      <PageHeader
        title="Fund Allocations"
        description="Manage and track fund allocations for events"
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Allocate Funds
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Funds</DialogTitle>
              <DialogDescription>
                Allocate budget to an event. The funds will be available for the organizer to use.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="eventId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an event" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allocationsData.map((allocation) => (
                            <SelectItem key={allocation.eventId} value={allocation.eventId}>
                              {allocation.eventName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Additional notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Allocate Funds</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search allocations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Allocations</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAllocations.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Organizer</TableHead>
                    <TableHead>Total Budget</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAllocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell className="font-medium">{allocation.eventName}</TableCell>
                      <TableCell>{allocation.organizer}</TableCell>
                      <TableCell>${allocation.totalBudget.toLocaleString()}</TableCell>
                      <TableCell>${allocation.allocated.toLocaleString()}</TableCell>
                      <TableCell>${allocation.remaining.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          allocation.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <DollarSignIcon className="mr-2 h-4 w-4" />
                          Add Funds
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No allocations found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default AllocationsPage;

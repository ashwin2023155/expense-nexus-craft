
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileIcon, ImageIcon, Loader2Icon, UploadCloudIcon } from "lucide-react";

// Mock events data
const mockEvents = [
  { id: "1", name: "Annual Conference 2025" },
  { id: "2", name: "Team Building Workshop" },
  { id: "3", name: "Product Launch Event" },
];

// Mock expenses data
const mockExpenses = [
  { id: "1", title: "Venue Deposit", event: "Annual Conference 2025", amount: 5000 },
  { id: "2", title: "Catering Advance", event: "Annual Conference 2025", amount: 2500 },
  { id: "3", title: "Marketing Materials", event: "Product Launch Event", amount: 1500 },
  { id: "4", title: "Transportation", event: "Team Building Workshop", amount: 800 },
];

const BillsUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedExpense, setSelectedExpense] = useState("");
  const [billDescription, setBillDescription] = useState("");
  
  // Filter expenses based on selected event
  const filteredExpenses = selectedEvent 
    ? mockExpenses.filter(expense => 
        expense.event === mockEvents.find(event => event.id === selectedEvent)?.name
      )
    : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const isFormComplete = selectedFile && selectedEvent && selectedExpense && billDescription;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormComplete) {
      toast.error("Please complete all fields", {
        description: "All fields are required to upload a bill",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Bill uploaded successfully", {
        description: "Your bill has been uploaded and will be reviewed",
      });
      
      navigate("/bills");
    } catch (error) {
      console.error("Error uploading bill:", error);
      toast.error("Upload failed", {
        description: "There was an error uploading your bill. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader
        title="Upload Bill"
        description="Upload a bill or receipt for an expense"
      />
      
      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                selectedFile ? 'border-primary/20 bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <UploadCloudIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Upload your bill or receipt</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Drag and drop your file here, or click to browse your files
                  </p>
                  <Input
                    type="file"
                    id="bill-upload"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('bill-upload')?.click()}
                  >
                    Browse Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported file types: JPG, PNG, PDF (Max size: 10MB)
                  </p>
                </div>
              ) : (
                <div className="py-4">
                  <div className="flex items-center justify-center mb-4">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Bill preview"
                          className="max-h-[200px] rounded-md object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-32 h-32 bg-muted rounded-md">
                        <FileIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="flex items-center">
                      {selectedFile.type.startsWith('image/') ? (
                        <ImageIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <FileIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="font-medium">{selectedFile.name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="event">Event</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger id="event">
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEvents.map(event => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expense">Expense</Label>
                <Select 
                  value={selectedExpense} 
                  onValueChange={setSelectedExpense}
                  disabled={!selectedEvent || filteredExpenses.length === 0}
                >
                  <SelectTrigger id="expense">
                    <SelectValue placeholder={
                      !selectedEvent 
                        ? "Select an event first" 
                        : filteredExpenses.length === 0 
                          ? "No expenses found" 
                          : "Select an expense"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredExpenses.map(expense => (
                      <SelectItem key={expense.id} value={expense.id}>
                        {expense.title} (${expense.amount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Bill Description</Label>
              <Textarea
                id="description"
                placeholder="Provide additional details about this bill"
                className="min-h-[100px]"
                value={billDescription}
                onChange={(e) => setBillDescription(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/bills")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormComplete || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Bill"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
};

export default BillsUpload;


import { useParams } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();

  return (
    <AppShell>
      <PageHeader
        title="Event Details"
        description="View detailed information about this event"
      >
        <Button variant="outline" asChild>
          <Link to="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="pt-6">
          <p className="text-center py-10 text-muted-foreground">
            Detailed information for Event ID: {id} would display here
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
};

export default EventDetail;

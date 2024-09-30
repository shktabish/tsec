import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react"

// Example meeting data
const meetings = [
  {
    id: 1,
    subject: "Project Kickoff",
    status: "Scheduled",
    date: "2024-10-01",
    time: "10:00 AM",
    duration: "1h",
  },
  {
    id: 2,
    subject: "Design Review",
    status: "Completed",
    date: "2024-09-28",
    time: "2:00 PM",
    duration: "30m",
  },
  {
    id: 3,
    subject: "Sprint Planning",
    status: "In Progress",
    date: "2024-09-30",
    time: "3:00 PM",
    duration: "1h 30m",
  },
  {
    id: 4,
    subject: "Retrospective",
    status: "Scheduled",
    date: "2024-10-05",
    time: "11:00 AM",
    duration: "45m",
  },
];

// Helper function to assign color classes based on status
const getStatusColor = (status) => {
  switch (status) {
    case "Scheduled":
      return "bg-blue-500 text-white";
    case "Completed":
      return "bg-green-500 text-white";
    case "In Progress":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function MeetsCarousel() {
  return (
    <div className="h-full flex flex-col justify-around" >
        <div className="text-2xl font-semibold" >Upcoming Mentor Meets</div>
        <Carousel className="w-full max-w-6xl">
        <CarouselContent>
            {meetings.map((meeting) => (
            <CarouselItem key={meeting.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                <Card key={meeting.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span className="text-lg">{meeting.subject}</span>
                        <Badge className={`${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                        </Badge>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="flex items-center mb-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <ClockIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        {/* <div className="flex justify-between items-center mt-4">
            <CarouselPrevious />
            <CarouselNext />
        </div> */}
        </Carousel>
    </div>
  );
}

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { Link } from 'react-router-dom';

// Helper function to assign color classes based on status
const getStatusColor = (status) => {
  switch (status) {
    case "Scheduled":
      return "bg-[#021b31] text-white";
    case "Completed":
      return "bg-green-500 text-white";
    case "In Progress":
      return "bg-yellow-500 text-white";
    default:
      return "bg-[#0d1a42] text-white";
  }
};

export default function MeetsCarousel() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const response = await api.get("/sessions")
      console.log(response.data.data) 
      setMeetings(response.data.data)
    }

    fetchMeetings();
  }, []);

  const handleClick = (link) => {
    window.open("http://localhost:5173/" + link + "?type=group-call", '_blank');
  }

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
                        <Badge className={`${getStatusColor(meeting.status)} py-1`}>
                        {meeting.status}
                        </Badge>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div>
                    <div className="flex items-center mb-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span>{meeting.date.split('T')[0]}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <ClockIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                    <div onClick={() => handleClick(meeting.roomId)} className="font-semibold cursor-pointer" >Join Meet</div>
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

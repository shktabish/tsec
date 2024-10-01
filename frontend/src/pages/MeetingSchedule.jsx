import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react"
import { useNavigate } from 'react-router-dom'

const getStatusColor = (status) => {
  switch (status) {
    case 'scheduled': return 'bg-[#f0f8ff] text-black py-1 px-3'
    case 'completed': return 'bg-green-500 hover:bg-green-600'
    case 'cancelled': return 'bg-red-500 hover:bg-red-600'
    default: return 'bg-gray-500 hover:bg-gray-600'
  }
}

export default function MeetingSchedule() {
  const [meetings, setMeetings] = useState([])  // Start with an empty array
  const [isOpen, setIsOpen] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    subject: '',
    date: '',
    time: '',
    duration: '',
    status: 'scheduled',
    roomLink: '',
    roomId: '',
  })
  const [roomId, setRoomId] = useState("");
  const [roomLink, setRoomLink] = useState(""); // State to store the room link

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch all sessions when the component mounts
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/sessions');
        const fetchedSessions = response.data.data; // Adjust based on your API response structure
        const mappedSessions = fetchedSessions.map((session) => ({
          id: session._id,  
          subject: session.subject || "No Subject", 
          date: session.date.split('T')[0] || "No Date", // Extracting only the date part
          time: session.time || "No Time",          
          duration: session.duration || "No Duration", 
          status: session.status || "scheduled",  
          meetLink: session.meetLink,
          roomId: session.roomId
        }));  
        setMeetings(mappedSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    

    fetchSessions();
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMeeting(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setNewMeeting(prev => ({ ...prev, status: value }))
  }

  const handleClick = () => {
    console.log("clicked")
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    const generatedRoomId = randomId + timestamp;
    setRoomId(generatedRoomId);
    
    // Create the group call URL and store it in state
    const generatedRoomLink = `room/${generatedRoomId}?type=group-call`;
    console.log(generatedRoomLink)
    setRoomLink(window.location.protocol + "//" + window.location.host + "/" + generatedRoomLink);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Prepare data to send to the backend
    const sessionData = {
      student_ids: ["66fa51d25ca9f7a55b89a682"], // Replace with actual student IDs
      mentor_id: "66fa5bc7319cef189f4e8f1f", // Replace with actual mentor ID
      subject: newMeeting.subject,
      date: newMeeting.date,
      time: newMeeting.time,
      duration: parseInt(newMeeting.duration), // Convert to integer
      meetLink: roomLink,
      roomId: roomId
    }

    try {
      // Send a POST request to create a new session
      const response = await axios.post('http://localhost:8000/api/v1/sessions', sessionData);
      const createdSession = response.data.data;

      // Update meetings state with the new session
      setMeetings(prev => [...prev, { ...createdSession, id: createdSession._id }]); // Use _id as id

      // Reset form fields
      setIsOpen(false);
      setNewMeeting({
        subject: '',
        date: '',
        time: '',
        duration: '',
        status: 'scheduled'
      });
    } catch (error) {
      console.error('Error creating session:', error);
    }
  }

  // Helper function to calculate if the meeting can be started
  const isStartMeetDisabled = (meetingDate, meetingTime) => {
    const meetingDateTime = new Date(`${meetingDate}T${meetingTime}`);
    const currentTime = new Date();
    const timeDiffInMinutes = (meetingDateTime - currentTime) / (1000 * 60); // Difference in minutes
    return timeDiffInMinutes > 15; // Disable if more than 15 minutes
  };

  const startMeet = (meeting) => {
    console.log(meeting)
    navigate(`/${meeting.roomId}?type=group-call`)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Meeting Schedule</h1>

        {/* Add Meeting Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Meeting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Meeting</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  className="bg-white"
                  id="subject"
                  name="subject"
                  value={newMeeting.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  className="bg-white"
                  id="date"
                  name="date"
                  type="date"
                  value={newMeeting.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  className="bg-white"
                  id="time"
                  name="time"
                  type="time"
                  value={newMeeting.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (in minutes)</Label>
                <Input
                  className="bg-white"
                  id="duration"
                  name="duration"
                  value={newMeeting.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={handleSelectChange} defaultValue={newMeeting.status} className="bg-white" >
                  <SelectTrigger className="bg-white" >
                    <SelectValue placeholder="Select status" className='bg-white' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div onClick={handleClick} className='border border-[#e5e5e5] rounded-lg w-max px-4 py-2 cursor-pointer hover:border-[#0a5399] font-semibold' >Generate Link</div>
                <a href={meetings} className='mt-2 hover:underlines' >{roomLink}</a>
              </div>
              <Button type="submit" className="w-full">Add Meeting</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Meeting List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg">{meeting.subject}</span>
                <Badge className={getStatusColor(meeting.status)}>
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
                <span>{meeting.time} ({meeting.duration} minutes)</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => startMeet(meeting)} disabled={isStartMeetDisabled(meeting.date, meeting.time)}>
                Start Meet
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

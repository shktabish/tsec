import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react"

const initialMeetings = [
  { id: 1, subject: "Project Kickoff", date: "2024-10-01", time: "09:00", duration: "1 hour", status: "scheduled" },
  { id: 2, subject: "Weekly Team Sync", date: "2024-10-02", time: "10:30", duration: "30 minutes", status: "scheduled" },
  { id: 3, subject: "Client Presentation", date: "2024-10-03", time: "14:00", duration: "2 hours", status: "scheduled" },
  { id: 4, subject: "Budget Review", date: "2024-10-04", time: "11:00", duration: "1 hour", status: "cancelled" },
  { id: 5, subject: "Product Demo", date: "2024-10-05", time: "15:30", duration: "45 minutes", status: "scheduled" },
]

const getStatusColor = (status) => {
  switch (status) {
    case 'scheduled': return 'bg-blue-500 hover:bg-blue-600'
    case 'completed': return 'bg-green-500 hover:bg-green-600'
    case 'cancelled': return 'bg-red-500 hover:bg-red-600'
    default: return 'bg-gray-500 hover:bg-gray-600'
  }
}

export default function MeetingSchedule() {
  const [meetings, setMeetings] = useState(initialMeetings)
  const [isOpen, setIsOpen] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    subject: '',
    date: '',
    time: '',
    duration: '',
    status: 'scheduled'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMeeting(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setNewMeeting(prev => ({ ...prev, status: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = meetings.length > 0 ? Math.max(...meetings.map(m => m.id)) + 1 : 1
    setMeetings(prev => [...prev, { id, ...newMeeting }])
    setIsOpen(false)
    setNewMeeting({
      subject: '',
      date: '',
      time: '',
      duration: '',
      status: 'scheduled'
    })
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
                  id="time"
                  name="time"
                  type="time"
                  value={newMeeting.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={newMeeting.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={handleSelectChange} defaultValue={newMeeting.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
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
        ))}
      </div>
    </div>
  )
}
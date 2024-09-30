import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

const initialTeachers = [
  {
    id: 1,
    name: "John Peterson",
    role: "Teacher",
    skills: ["Python", "C++"],
    experience: 15,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Elevan Georgi",
    role: "Teacher",
    skills: ["Python", "JavaScript"],
    experience: 6,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Jeff Sinister",
    role: "Consultant",
    skills: ["Python", "Swift"],
    experience: 4,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Alex Morning",
    role: "Teacher",
    skills: ["Python", "Java"],
    experience: 8,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Andrew Maclaren",
    role: "Lector",
    skills: ["Python", "Ruby"],
    experience: 26,
    image: "/placeholder.svg",
  },
]

export default function Component() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [experienceRange, setExperienceRange] = useState([0, 30])

  const handleExperienceChange = (value) => {
    setExperienceRange(value)
  }

  useEffect(() => {
    let filteredTeachers = initialTeachers.filter((teacher) => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesExperience = teacher.experience >= experienceRange[0] && teacher.experience <= experienceRange[1]
      return matchesSearch && matchesExperience
    })

    filteredTeachers.sort((a, b) => {
      const aHasSkill = a.skills.includes(sortBy)
      const bHasSkill = b.skills.includes(sortBy)
      if (aHasSkill && !bHasSkill) return -1
      if (!aHasSkill && bHasSkill) return 1
      return b.experience - a.experience
    })

    setTeachers(filteredTeachers)
  }, [searchQuery, sortBy, experienceRange])

  return (
    <div className="container mx-auto p-4 bg-gray-100 text-black min-h-screen">
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <Input
            className="flex-grow"
            placeholder="Search by name..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder="Sort By Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="C++">C++</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="Swift">Swift</SelectItem>
              <SelectItem value="Ruby">Ruby</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Label className="text-sm font-medium">Experience (years):</Label>
          <Slider
            className="w-[200px]"
            value={experienceRange}
            onValueChange={handleExperienceChange}
            min={0}
            max={30}
            step={1}
          />
          <span className="text-sm">
            {experienceRange[0]} - {experienceRange[1]} years
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher) => (
          <Sheet key={teacher.id}>
            <SheetTrigger asChild>
              <Card className="bg-gray-800 cursor-pointer" onClick={() => setSelectedTeacher(teacher)}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <img
                    alt={teacher.name}
                    className="rounded-full"
                    height="64"
                    src={teacher.image}
                    style={{
                      aspectRatio: "64/64",
                      objectFit: "cover",
                    }}
                    width="64"
                  />
                  <div>
                    <CardTitle>{teacher.name}</CardTitle>
                    <p className="text-sm text-gray-400">{teacher.role}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {teacher.skills.map((skill) => (
                      <span key={skill} className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-400">{teacher.experience} years of experience</p>
                </CardFooter>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">{teacher.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <img
                  alt={teacher.name}
                  className="rounded-full mx-auto"
                  height="128"
                  src={teacher.image}
                  style={{
                    aspectRatio: "128/128",
                    objectFit: "cover",
                  }}
                  width="128"
                />
                <div>
                  <h3 className="font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teacher.skills.map((skill) => (
                      <span key={skill} className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Experience</h3>
                  <p>{teacher.experience} years</p>
                </div>
                <div>
                  <h3 className="font-semibold">Dialogue</h3>
                  <p>Zoom</p>
                </div>
                <div>
                  <h3 className="font-semibold">On this platform</h3>
                  <p>14 October, 2023</p>
                </div>
                <div>
                  <h3 className="font-semibold">Teacher description</h3>
                  <p className="text-sm text-gray-400">
                    With a rich tapestry of {teacher.experience} years in education, I am a seasoned teacher deeply
                    immersed in the world of programming, with {teacher.skills.join(" and ")} as my languages of choice.
                  </p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Connect</Button>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  )
}
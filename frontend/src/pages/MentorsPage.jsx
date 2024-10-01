import React, { useState } from 'react';
import { Search, Bookmark, Share2 } from 'lucide-react';
import api from '@/utils/axios';
import { useNavigate } from 'react-router-dom';

const teachersData = [
  { id: "66fa7e6a5425f590f5a9cdd7", name: 'Mentor Doe', role: 'Teacher', skills: ['Python', 'C++'], hourRate: 24, experience: 18 },
  { id: 1, name: 'John Peterson', role: 'DevOps', skills: ['Python', 'C++'], hourRate: 24, experience: 15 },
  { id: 2, name: 'Elevan Georgi', role: 'Data Analyst', skills: ['Python', 'JavaScript'], hourRate: 19, experience: 6 },
  { id: 3, name: 'Jeff Sinister', role: 'Consultant', skills: ['Python', 'Swift'], hourRate: 14, experience: 4 },
  { id: 4, name: 'Alex Morning', role: 'Teacher', skills: ['Python', 'Java'], hourRate: 22, experience: 8 },
  { id: 5, name: 'Andrew Maclaren', role: 'Lecturer', skills: ['Python', 'Ruby'], hourRate: 34, experience: 26 },
];

const TeacherCard = ({ teacher }) => (
  <div className="bg-[#FFF] text-black rounded-lg p-4 mb-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-black font-bold">{teacher.name}</h3>
        <p className="text-black">{teacher.role}</p>
      </div>
      <Bookmark className="text-[#0D1A42]" />
    </div>
    <div className="mt-2">
      {teacher.skills.map((skill, index) => (
        <span key={index} className="rounded-full border border-solid bg-background px-2 py-1 text-sm mr-2">
          {skill}
        </span>
      ))}
    </div>
    <div className="mt-4 flex justify-between items-center text-black">
      <span>{teacher.experience} years of experience</span>
    </div>
  </div>
);

const TeacherDetails = ({ teacher }) => {
  console.log(teacher);
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Connecting with mentor:", teacher.id);
    try {
      const response = await api.get(`/chat/chat/${teacher.id}`);
      console.log(response.data);
      navigate(`/chat`);
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  return (
    <div className="bg-[#0d1a42] p-4 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-white text-xl font-bold">{teacher.name}</h2>
          <p className="text-gray-400">{teacher.role}</p>
        </div>
        <div className="flex space-x-2">
          <Share2 className="text-[hsl(210,100%,96%)]" />
          <Bookmark className="text-[hsl(210,100%,96%)]" />
        </div>
      </div>
      <div className="mb-4">
        {teacher.skills.map((skill, index) => (
          <span key={index} className="bg-[hsl(210,100%,96%)] text-black rounded-full px-2 py-1 text-sm mr-2">
            {skill}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-400">Language</p>
          <p className="text-white">English</p>
        </div>
        <div>
          <p className="text-gray-400">Experience</p>
          <p className="text-white">{teacher.experience} years</p>
        </div>
        <div>
          <p className="text-gray-400">On this platform</p>
          <p className="text-white">14 October, 2023</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-white font-bold mb-2">Teacher description</h3>
        <p className="text-gray-400">
          With a rich tapestry of {teacher.experience} years in education, I am a seasoned teacher deeply immersed in the world of programming, with {teacher.skills[0]} as my language of choice.
        </p>
        <p className="text-gray-400 mt-2">
          My journey is woven with a passion for imparting knowledge, fostering curiosity, and molding the next generation of tech enthusiasts.
        </p>
      </div>
      <div className="flex justify-end items-center">
        <button onClick={handleClick} className="bg-[hsl(210,100%,96%)] text-black px-4 py-2 rounded-lg">
          Connect With Mentor
        </button>
      </div>
    </div>
  );
};

const TeacherSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = teachersData.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="text-white p-6 min-h-screen">
      <div className="flex mb-6">
        <div className="flex-1 flex items-center bg-white rounded-l-lg px-4">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Python"
            className="bg-transparent border-none focus:outline-none text-black w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-[#0D1A42] text-white px-4 py-2 rounded-lg ml-4">
          Search
        </button>
      </div>

      <div className="flex">
        <div className="w-2/3 pr-6">
          {filteredTeachers.map(teacher => (
            <div key={teacher.id} onClick={() => setSelectedTeacher(teacher)}>
              <TeacherCard teacher={teacher} />
            </div>
          ))}
        </div>
        <div className="w-1/3">
          {selectedTeacher && <TeacherDetails teacher={selectedTeacher} />}
        </div>
      </div>
    </div>
  );
};

export default TeacherSearch;

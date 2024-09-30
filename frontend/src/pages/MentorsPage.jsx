import React, { useState } from 'react';
import { Search, DollarSign, Clock } from 'lucide-react';

const MentorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hourRate, setHourRate] = useState([8, 39]);
  const [sortBy, setSortBy] = useState('mostExperienced');
  const [readiness, setReadiness] = useState('available');
  const [experience, setExperience] = useState(['4-8', '9-14', '15+']);
  const [dialogue, setDialogue] = useState('Skype');

  // Mock data for demonstration
  const teachers = [
    { name: 'John Peterson', role: 'Teacher', skills: ['Python', 'C++'], hourRate: 24, experience: 15 },
    { name: 'Elevan Georgi', role: 'Teacher', skills: ['Python', 'JavaScript'], hourRate: 19, experience: 6 },
    { name: 'Jeff Sinister', role: 'Consultant', skills: ['Python', 'Swift'], hourRate: 14, experience: 4 },
    { name: 'Alex Morning', role: 'Teacher', skills: ['Python', 'Java'], hourRate: 22, experience: 6 },
    { name: 'Andrew Maclaren', role: 'Lector', skills: ['Python', 'Ruby'], hourRate: 34, experience: 26 },
  ];

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white px-4 py-2 rounded-l-md flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-purple-600 px-4 py-2 rounded-r-md">
            <Search size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2">Sort By</label>
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-md w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="mostExperienced">Most Experienced</option>
              <option value="az">A-Z</option>
              <option value="lowHourRate">Low Hour Rate</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Hour Rate</label>
            <div className="flex items-center">
              <DollarSign size={16} className="mr-2" />
              <input
                type="range"
                min="8"
                max="39"
                value={hourRate[1]}
                onChange={(e) => setHourRate([hourRate[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Readiness</label>
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-md w-full"
              value={readiness}
              onChange={(e) => setReadiness(e.target.value)}
            >
              <option value="available">Available</option>
              <option value="hired">Hired</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Experience</label>
            <select
              multiple
              className="bg-gray-800 text-white px-4 py-2 rounded-md w-full"
              value={experience}
              onChange={(e) => setExperience(Array.from(e.target.selectedOptions, option => option.value))}
            >
              <option value="1-3">1-3 years</option>
              <option value="4-8">4-8 years</option>
              <option value="9-14">9-14 years</option>
              <option value="15+">15+ years</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
              <div>
                <h3 className="font-bold">{teacher.name}</h3>
                <p className="text-gray-400">{teacher.role}</p>
              </div>
            </div>
            <div className="flex mb-2">
              {teacher.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="bg-purple-600 text-xs px-2 py-1 rounded-full mr-2">{skill}</span>
              ))}
            </div>
            <div className="flex items-center">
              <DollarSign size={16} className="mr-1" />
              <span className="mr-4">{teacher.hourRate}/h</span>
              <Clock size={16} className="mr-1" />
              <span>{teacher.experience} years of experience</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsPage;
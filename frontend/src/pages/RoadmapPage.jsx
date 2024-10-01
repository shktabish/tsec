import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { BookOpen, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EnhancedRoadmap from '@/components/EnhancedRoadmap';

const roadmapData = [
  { id: 1, title: "React", skills: "JavaScript, HTML, CSS", isNew: false },
  { id: 2, title: "Node.js", skills: "JavaScript, Express, NPM", isNew: false },
  { id: 3, title: "Python", skills: "OOP, Data Structures, Algorithms", isNew: false },
  { id: 4, title: "Machine Learning", skills: "Statistics, Linear Algebra, Python", isNew: true },
  { id: 5, title: "Docker", skills: "Containerization, Linux, Networking", isNew: false },
  { id: 6, title: "GraphQL", skills: "API Design, JavaScript, Database", isNew: false },
  { id: 7, title: "Rust", skills: "Systems Programming, Memory Safety", isNew: true },
  { id: 8, title: "Kubernetes", skills: "Container Orchestration, DevOps", isNew: false },
  { id: 9, title: "AWS", skills: "Cloud Computing, Scalability", isNew: false },
  { id: 10, title: "TypeScript", skills: "Static Typing, JavaScript", isNew: false },
  { id: 11, title: "Blockchain", skills: "Cryptography, Distributed Systems", isNew: true },
  { id: 12, title: "Vue.js", skills: "JavaScript, Reactive Programming", isNew: false }
];

export default function RoadmapPage() {
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmap, setRoadmap] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate(); 

  const handleGenerateRoadmap = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: skills,
          goal: goals,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch roadmap');
      }

      const data = await response.json();
      setRoadmap(data.roadmap);
      setShowRoadmap(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Individuals Roadmap</h1>
      <div className='w-[70%] mx-auto text-center text-gray-600 mb-12'>
        AspireEd is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {roadmapData.map((item) => (
          <div
            key={item.id}
            className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <BookOpen className="absolute top-4 right-4 text-blue-500" size={24} />
            {item.isNew && (
              <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-semibold text-black bg-[#f0f8ff] rounded-full">
                New
              </span>
            )}
          </div>
        ))}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <div className="relative p-6 bg-white border-2 border-dashed border-blue-500 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-50 mx-auto max-w-md">
            <h3 className="text-xl font-semibold text-blue-500 text-center">Create Your Own Roadmap</h3>
            <BookOpen className="absolute top-4 right-4 text-blue-500" size={24} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Your Roadmap</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma-separated)
              </label>
              <Input
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Python, Data Science, SQL"
                className="w-full bg-white"
              />
            </div>
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                Goals (comma-separated)
              </label>
              <Input
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g. Full-stack developer, Data Scientist"
                className="w-full bg-white"
              />
            </div>
            <Button onClick={handleGenerateRoadmap} className="w-full">
              Generate Roadmap
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showRoadmap && <EnhancedRoadmap roadmap={roadmap} />}
    </div>
  );
}
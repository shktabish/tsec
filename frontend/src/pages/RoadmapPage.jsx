import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function RoadmapPage() {
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmap, setRoadmap] = useState([]);

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
      setRoadmap(data.roadmap); // Directly using the received roadmap
      setShowRoadmap(true);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };

  const handleQuizClick = (skillsArray) => {
    navigate('/quiz', { state: { skills: skillsArray } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Generate Your Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <Input
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Python, Data Science, SQL"
            />
          </div>
          <div>
            <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
              Goals (comma-separated)
            </label>
            <Input
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Full-stack developer, Data Scientist"
            />
          </div>
          <Button onClick={handleGenerateRoadmap} className="w-full">
            Generate Roadmap
          </Button>
        </CardContent>
      </Card>

      {showRoadmap && (
        <div className="relative mt-8">
          <div className="absolute left-1/2 top-0 h-full border-l-2 border-gray-300"></div>
          <div className="flex flex-col space-y-4">
            {roadmap.map((step, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start relative`}>
                <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <Card className="p-4">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">{step.description}</p>
                      <p className="text-sm text-gray-500">Skills: {step.skills.join(', ')}</p>
                      <div className="mt-4 flex space-x-2">
                        <Button className="flex-1" onClick={() => window.open(step.resource, '_blank')}>
                          Resources
                        </Button>
                        <Button className="flex-1" onClick={() => handleQuizClick(step.skills)}>
                          Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

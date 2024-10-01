import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronRight, BookOpen, Trophy } from 'lucide-react';

const RoadmapStep = ({ step, index, totalSteps }) => (
  <div className="flex items-start mb-8">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0d1a42] flex items-center justify-center text-white font-bold text-lg relative z-50 mt-5">
      {index + 1}
    </div>
    <div className="ml-4 flex-grow">
      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-[#0d1a42] to-[#a8d2fa] text-white">
          <CardTitle className="text-xl font-bold flex items-center">
            <Trophy className="mr-2" size={20} />
            {step.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-gray-600 mb-3">{step.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {step.skills.map((skill, skillIndex) => (
              <span key={skillIndex} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={() => window.open(step.resource, '_blank')}
            >
              <BookOpen className="mr-2" size={16} />
              Resources
            </Button>
            <Button className="flex items-center">
              Take Quiz
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const EnhancedRoadmap = ({ roadmap }) => (
  <div className="max-w-3xl mx-auto mt-12 px-4">
    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Your Learning Roadmap</h2>
    <div className="relative">
      <div className="absolute left-6 top-0 h-full w-0.5 bg-blue-300" aria-hidden="true"></div>
      {roadmap.map((step, index) => (
        <RoadmapStep key={index} step={step} index={index} totalSteps={roadmap.length} />
      ))}
    </div>
  </div>
);

export default EnhancedRoadmap;
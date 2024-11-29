// components/TemplateSelector.tsx
'use client'
import React from 'react';
import { ResumeData } from './ResumeForm';

interface Template {
  id: string;
  name: string;
  data: ResumeData;
}

const templates: Template[] = [
  {
    id: 'template1',
    name: 'Professional',
    data: {
      personalInfo: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      education: [{ institution: 'University of Example', degree: 'BS in Computer Science', graduationYear: 2020 }],
      experience: [{
        company: 'Tech Corp',
        position: 'Software Developer',
        startDate: '2020-01',
        endDate: 'Present',
        responsibilities: ['Developed web applications', 'Collaborated with cross-functional teams']
      }],
      skills: ['JavaScript', 'React', 'Node.js']
    }
  },
  {
    id: 'template2',
    name: 'Creative',
    data: {
      personalInfo: { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
      education: [{ institution: 'Design Institute', degree: 'BFA in Graphic Design', graduationYear: 2019 }],
      experience: [{
        company: 'Creative Agency',
        position: 'UI/UX Designer',
        startDate: '2019-06',
        endDate: 'Present',
        responsibilities: ['Created user-centered designs', 'Conducted user research and testing']
      }],
      skills: ['Figma', 'Adobe Creative Suite', 'User Research']
    }
  },
  // Add more templates as needed
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: ResumeData) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <div 
          key={template.id} 
          className="border p-4 rounded cursor-pointer hover:bg-gray-700"
          onClick={() => onSelectTemplate(template.data)}
        >
          <h3 className="font-bold text-white ">{template.name}</h3>
          <p className='text-white'>Click to use this template</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
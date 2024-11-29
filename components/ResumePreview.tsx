// components/ResumePriview.tsx
'use client'
import React from 'react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white shadow-lg p-8 font-serif border rounded-lg">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
        <p className="text-sm">
          {data.personalInfo.email} | {data.personalInfo.phone}
        </p>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">Professional Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">Professional Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{exp.position}</h3>
              <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-sm font-semibold mb-1">{exp.company}</p>
            <ul className="list-disc list-inside text-sm">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <span className="text-sm text-gray-600">{edu.graduationYear}</span>
            </div>
            <p className="text-sm">{edu.institution}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-2">Skills</h2>
        <ul className="list-disc list-inside text-sm columns-2">
          {data.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResumePreview;
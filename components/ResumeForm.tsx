//components/ResumeForm.tsx
'use client'
import React, { useState } from 'react';
import { PlusCircle, MinusCircle, ChevronDown, ChevronUp } from 'lucide-react';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Education {
  institution: string;
  degree: string;
  graduationYear: number;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
//   name: string;
}

interface ResumeFormProps {
  initialData: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onUpdate }) => {
  const [formData, setFormData] = useState<ResumeData>(initialData);
  const [errors, setErrors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (section: keyof ResumeData, field: string, value: string | number) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: section === 'personalInfo'
        ? { ...prevData.personalInfo, [field]: value }
        : section === 'skills'
          ? [...prevData.skills, value as string]
          : prevData[section]
    }));
  };

  const handleArrayChange = (section: 'education' | 'experience', index: number, field: string, value: string | number | string[]) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: prevData[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section: 'education' | 'experience') => {
    setFormData(prevData => ({
      ...prevData,
      [section]: [
        ...prevData[section],
        section === 'education'
          ? { institution: '', degree: '', graduationYear: new Date().getFullYear() }
          : { company: '', position: '', startDate: '', endDate: '', responsibilities: [''] }
      ]
    }));
  };

  const removeArrayItem = (section: 'education' | 'experience', index: number) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index)
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index)
    }));
  };

  const addResponsibility = (index: number) => {
    handleArrayChange('experience', index, 'responsibilities', [...formData.experience[index].responsibilities, '']);
  };

  const handleResponsibilityChange = (expIndex: number, respIndex: number, value: string) => {
    const responsibilities = formData.experience[expIndex].responsibilities.map((resp, i) => i === respIndex ? value : resp);
    handleArrayChange('experience', expIndex, 'responsibilities', responsibilities);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    if (!formData.personalInfo.name) newErrors.push('Name is required.');
    if (!formData.personalInfo.email) newErrors.push('Email is required.');
    if (!formData.personalInfo.phone) newErrors.push('Phone is required.');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
    }
  };

  const renderSectionHeader = (title: string, section: keyof typeof expandedSections) => (
    <div className="flex items-center justify-between cursor-pointer mb-4" onClick={() => toggleSection(section)}>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {expandedSections[section] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-8">

      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Please correct the following errors:</strong>
          <ul className="mt-2 list-disc list-inside">
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}

      <section>
        {renderSectionHeader("Personal Information", "personalInfo")}
        {expandedSections.personalInfo && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.personalInfo.name}
              onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
      </section>

      <section>
        {renderSectionHeader("Education", "education")}
        {expandedSections.education && (
          <div className="space-y-6">
            {formData.education.map((edu, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm space-y-4">
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Graduation Year"
                  value={edu.graduationYear}
                  onChange={(e) => handleArrayChange('education', index, 'graduationYear', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('education', index)}
                  className="flex items-center text-red-600 hover:text-red-800 transition duration-200"
                >
                  <MinusCircle size={20} className="mr-2" /> Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('education')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
            >
              <PlusCircle size={20} className="mr-2" /> Add Education
            </button>
          </div>
        )}
      </section>

      <section>
        {renderSectionHeader("Experience", "experience")}
        {expandedSections.experience && (
          <div className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm space-y-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                    className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                    className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Responsibilities:</h4>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Responsibility"
                        value={resp}
                        onChange={(e) => handleResponsibilityChange(index, respIndex, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayChange('experience', index, 'responsibilities', exp.responsibilities.filter((_, i) => i !== respIndex))}
                        className="text-red-600 hover:text-red-800 transition duration-200"
                      >
                        <MinusCircle size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addResponsibility(index)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    <PlusCircle size={20} className="mr-2" /> Add Responsibility
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayItem('experience', index)}
                  className="flex items-center text-red-600 hover:text-red-800 transition duration-200"
                >
                  <MinusCircle size={20} className="mr-2" /> Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('experience')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
            >
              <PlusCircle size={20} className="mr-2" /> Add Experience
            </button>
          </div>
        )}
      </section>

      <section>
        {renderSectionHeader("Skills", "skills")}
        {expandedSections.skills && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="mr-2">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <MinusCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a new skill"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    if (target.value.trim()) {
                      handleInputChange('skills', '', target.value.trim());
                      target.value = '';
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Add a new skill"]') as HTMLInputElement;
                  if (input.value.trim()) {
                    handleInputChange('skills', '', input.value.trim());
                    input.value = '';
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </section>

      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition duration-200 w-full"
      >
        Update Resume
      </button>
    </form>
  );
};

export default ResumeForm;

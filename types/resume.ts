'use client'
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
    [x: string]: any;
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
  }
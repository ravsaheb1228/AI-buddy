'use client'

import { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider } from '@react-pdf/renderer';
import TemplateSelector from '@/components/TemplateSelector';
import TemplateEditor, { ResumeData } from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { Heading } from '@/components/heading';
import { FileText } from 'lucide-react';

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface ResumePDFProps {
  data: ResumeData;
}

// Define PDF Document component
const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.personalInfo.name}</Text>
        <Text style={styles.text}>{data.personalInfo.email} | {data.personalInfo.phone}</Text>
        
        <Text style={styles.subtitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index}>
            <Text style={styles.text}>{exp.position} at {exp.company}</Text>
            <Text style={styles.text}>{exp.startDate} - {exp.endDate}</Text>
            <Text style={styles.text}>{exp.responsibilities}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index}>
            <Text style={styles.text}>{edu.degree} from {edu.institution}</Text>
            <Text style={styles.text}>{edu.graduationYear}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>Skills</Text>
        <Text style={styles.text}>{data.skills.join(', ')}</Text>
      </View>
    </Page>
  </Document>
);

const Home: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const handleSelectTemplate = (template: ResumeData) => {
    setResumeData(template);
  };

  const handleUpdateResume = (newData: ResumeData) => {
    setResumeData(newData);
  };

  return (
    <div className="container mx-auto p-4 mt-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="w-full max-w-2xl text-white">
        <Heading
          title={"Resume builder"}
          description={"Try our resume builder."}
          icon={FileText}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-500/10"
        />
      </div>
      {!resumeData ? (
        <TemplateSelector onSelectTemplate={handleSelectTemplate} />
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* Adjusted flex layout for small screens */}
          <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
            <TemplateEditor initialData={resumeData} onUpdate={handleUpdateResume} />
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <ResumePreview data={resumeData} />
            <BlobProvider document={<ResumePDF data={resumeData} />}>
              {({ url, loading }) => (
                <a
                  href={url || ''}
                  download="resume.pdf"
                  className={`mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Loading document...' : 'Download Resume'}
                </a>
              )}
            </BlobProvider>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

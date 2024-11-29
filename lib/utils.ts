import { Message } from "ai";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

export function formatResponse(text: string): string {
  const sections = text.split('\n').filter(section => section.trim() !== '');
  let formattedText = '';
  let inList = false;

  sections.forEach(section => {
    // Handle bold text
    section = section.replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold;">$1</span>');

    // Handle headings
    if (section.startsWith('**') && section.endsWith('**')) {
      formattedText += `<h2 style="color: #000000;">${section.replace(/^\*\*|\*\*$/g, '').trim()}</h2>`;
    } else if (section.startsWith('* ')) {
      // Handle unordered lists
      if (!inList) {
        formattedText += '<ul style="color: #000000;">';
        inList = true;
      }
      formattedText += `<li>${section.replace(/^\* /, '').trim()}</li>`;
    } else {
      if (inList) {
        formattedText += '</ul>';
        inList = false;
      }
      // Handle paragraphs
      formattedText += `<p style="color: #000000;">${section}</p>`;
    }
  });

  // Close any open list tags
  if (inList) {
    formattedText += '</ul>';
  }

  return formattedText;
}


interface Data {
  sources: string[];
}

// Maps the sources with the right ai-message
export const getSources = (data: Data[], role: string, index: number) => {
  if (role === "assistant" && index >= 2 && (index - 2) % 2 === 0) {
    const sourcesIndex = (index - 2) / 2;
    if (data[sourcesIndex] && data[sourcesIndex].sources) {
      return data[sourcesIndex].sources;
    }
  }
  return [];
};

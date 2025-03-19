import zap from "../public/zap.svg";
import shieldcheck from "../public/shield-check.svg";
import template from "../public/layout-template.svg";
import code from "../public/code-xml.svg";
import graph from "../public/graph.svg";
import download from "../public/download.svg";

export const navLinks = [
  {
    id: 1,
    name: "ATS",
    link: "/resume-upload",
  },
  {
    id: 2,
    name: "analysis",
    link: "/analysis/id",
  },
];

export const hero = [
  {
    id: 1,
    name: "Resume Templates",
    number: "100+",
  },
  {
    id: 2,
    name: "Resume Created",
    number: "2.5M+",
  },
  {
    id: 3,
    name: "Interview Success",
    number: "92%",
  },
  {
    id: 4,
    name: "Customer Rating",
    number: "4.9/5",
  },
];

export const features = [
  {
    id: 1,
    name: "AI Content Generation",
    description:
      "Our AI analyzes your experience and skills to generate powerful bullet points and descriptions that highlight your achievements.",
    points: [
      "Achievement-focused content",
      "Industry-specific terminology",
      "Quantifiable results emphasis",
    ],
    image: zap,
  },
  {
    id: 2,
    name: "ATS Optimization",
    description:
      "Get past Applicant Tracking Systems with our AI that optimizes your resume for relevant keywords and formatting.",
    points: [
      "Job description matching",
      "ATS-friendly formatting",
      "Keyword optimization score",
    ],
    image: shieldcheck,
  },
  {
    id: 3,
    name: "Professional Templates",
    description:
      "Choose from 100+ professionally designed templates that are tailored for specific industries and career levels.",
    points: [
      "Industry-specific designs",
      "Customizable layouts",
      "Modern and traditional options",
    ],
    image: template,
  },
  {
    id: 4,
    name: "Custom Tailoring",
    description:
      "Our AI tailors your resume for each job application, highlighting the most relevant skills and experiences.",
    points: [
      "Job-specific customization",
      "Skills prioritization",
      "Smart content rearrangement",
    ],
    image: code,
  },
  {
    id: 5,
    name: "Real-Time Analysis",
    description:
      "Get instant feedback on your resume with suggestions to improve content, formatting, and overall impact.",
    points: [
      "Improvement suggestions",
      "Content strength scoring",
      "Grammar and style checking",
    ],
    image: graph,
  },
  {
    id: 6,
    name: "Multi-Format Export",
    description:
      "Export your resume in multiple formats including PDF, DOCX, and plain text for different application requirements.",
    points: [
      "PDF, DOCX, & TXT formats",
      "Cloud storage integration",
      "Direct sharing options",
    ],
    image: download,
  },
];

export const works = [
  {
    id: 1,
    title: "Input your Information",
    description:
      "Start by entering your basic details and work experience. Our smart forms guide you through the process, suggesting content improvements along the way.",
    points: [
      "Simple guided interface",
      "Smart content suggestions",
      "LinkedIn profile import",
    ],
  },

  {
    id: 2,
    title: "AI Enhancement & Optimization",
    description:
      "Our AI analyzes your resume, enhances your content, and optimizes it for ATS systems. It highlights your achievements and adds industry-specific keywords.",
    points: [
      "Automated content enhancement",
      "Keyword optimization for ATS",
      "Real-time improvement suggestions",
    ],
  },
  {
    id: 3,
    title: "Choose Template & Export",
    description:
      "Select from our professionally designed templates and customize colors and layout. Export your polished resume in multiple formats ready for job applications.",
    points: [
      "100+ professional templates",
      "Multiple export formats",
      "Unlimited resume versions",
    ],
  },
];

export const pricing = [
  {
    id: 1,
    title: "Free",
    price1: "$0",
    price2: "$0",
    duration1: "Forever",
    duration2: "Forever",
    description:
      "Perfect for testing our platform and creating a basic resume.",
    points: [
      "1 Resume",
      "Basic AI Content Generation",
      "5 basic templates",
      "PDF Export",
    ],
    button: "Get Started",
  },
  {
    id: 2,
    title: "Premium",
    price1: "$14",
    price2: "$50",
    duration1: "per month",
    duration2: "per year",
    description:
      "Ideal for job seekers who want to stand out with advanced features.",
    points: [
      "Unlimited Resumes",
      "Advanced AI Content Generation",
      "All templates",
      "ATS Optimization",
      "Multiple Export Formats",
    ],
    button: "Get Premium",
  },
  {
    id: 3,
    title: "Business",
    price1: "$25",
    price2: "$100",
    duration1: "per month",
    duration2: "per year",
    description:
      "Perfect for teams and businesses that need advanced features and priority support.",
    points: [
      "Everything in Premium",
      "5 User Team Access",
      "Priority Support",
      "Advanced Analytics",
    ],
    button: "Contact Sales",
  },
];

export const navigation = [
  {
    id: 1,
    name: "home",
    link: "/#home",
  },
  {
    id: 2,
    name: "Features",
    link: "/#features",
  },
  {
    id: 3,
    name: "Works",
    link: "/#works",
  },
  {
    id: 4,
    name: "Pricing",
    link: "/#pricing",
  },
];

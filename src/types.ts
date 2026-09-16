export type ActiveSection = 
  | 'garage' 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'experience' 
  | 'education'
  | 'events' 
  | 'gallery' 
  | 'resume' 
  | 'contact';

export type VisualFilter = 'amber' | 'cyber' | 'blueprint' | 'monochrome' | 'high_contrast';
export type AnimationSpeed = 'normal' | 'overdrive' | 'slomo' | 'precision';

export interface VisualSettings {
  filter: VisualFilter;
  animationSpeed: AnimationSpeed;
  lightIntensity: number;
  hireMeMode: boolean;
  customCursor: boolean;
  shadowsEnabled: boolean;
  autoRotateSpanner: boolean;
  themeMode?: ThemeMode;
}

export interface ProfileData {
  name: string;
  title: string;
  shortIntro: string;
  tagline: string;
  bio: string;
  location: string;
  phone: string;
  email: string;
  linkedIn: string;
  github: string;
  portfolioUrl?: string;
  avatarUrl: string;
  yearsExperience: string;
  projectsCompleted: string;
  codeEfficiency: string;
}

export interface AboutData {
  philosophy: string;
  shortBio: string;
  background: string;
  interests: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
  coreValues: Array<{
    title: string;
    desc: string;
  }>;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
  specialization: string;
  grade?: string;
  achievements: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
  credentialId?: string;
  category?: string;
}

export type ToolCategory = string;

export type ThemeMode =
  | 'emerald'       // Obsidian & Mint / Emerald (Deep slate + electric emerald)
  | 'cobalt'        // Hyper Cobalt (Deep navy + royal cobalt blue)
  | 'violet'        // Neo Violet (Midnight obsidian + cyberpunk orchid/violet)
  | 'glacier'       // Nordic Glacier (Frosted graphite + icy cyan/teal)
  | 'crimson'       // Bordeaux Noir (Velvet noir + ruby crimson)
  | 'copper'        // Industrial Copper (Warm matte titanium + brushed copper)
  | 'paper'         // Editorial Paper Light (Clean gallery eggshell + onyx/sapphire)
  | 'mono'          // Swiss Monochrome (Minimalist pure black + stark white)
  | 'system'
  | 'light'
  | 'dark';

export interface SkillTool {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  iconName: string;
  toolType: 'wrench' | 'hammer' | 'screwdriver' | 'meter' | 'gear' | 'chip' | string;
  description: string;
  experienceYears: string;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  date: string;
  featured: boolean;
  imageUrl: string;
  stats?: Array<{
    key: string;
    value: string;
  }>;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  carMilestone?: string;
  companyUrl?: string;
  link?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  company?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  software: string[];
  status?: string;
}

export interface SoftwareItem {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  purpose: string;
  experienceYears: string;
  iconName: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  location: string;
  category: 'Google' | 'Hackathon' | 'TCS Expo' | 'Workshop' | 'Conference' | 'Keynote Speaker' | string;
  shortDesc: string;
  fullDesc: string;
  coverImage: string;
  photos: string[];
  externalLink?: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Projects' | 'Workshops' | 'College' | 'Tech' | string;
  imageUrl: string;
  caption: string;
  date: string;
}

export interface ResumeData {
  fileName: string;
  lastUpdated: string;
  summary: string;
  downloadUrl?: string;
  customUploadedBase64?: string;
  skillsSummary: string[];
  keyHighlights: string[];
}

export interface RecentActivity {
  id: string;
  type: 'project' | 'event' | 'resume' | 'skill' | 'experience' | 'profile' | 'milestone';
  title: string;
  timestamp: string;
  description: string;
}

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  education: EducationItem[];
  certifications?: CertificationItem[];
  skills: SkillTool[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  team?: TeamMember[];
  software?: SoftwareItem[];
  events: EventItem[];
  gallery: GalleryItem[];
  resume: ResumeData;
  recentActivities: RecentActivity[];
  adminPasscode: string;
  visualSettings?: VisualSettings;
}

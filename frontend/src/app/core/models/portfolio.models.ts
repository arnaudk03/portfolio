export interface LocalizedText {
  fr: string;
  en: string;
}

export interface ProjectChallenge {
  fr: string;
  en: string;
}

export interface ProjectResult {
  fr: string;
  en: string;
}

export interface Project {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  architecture: LocalizedText;
  technologies: string[];
  categories: string[];
  layers: string[];
  features: LocalizedText[];
  challenges: ProjectChallenge[];
  results: ProjectResult[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface SkillCategory {
  id: string;
  title: LocalizedText;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  year: string;
  title: LocalizedText;
  company: LocalizedText;
  description: LocalizedText;
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  icon?: string;
  credentialUrl?: string;
}

export interface Publication {
  title: LocalizedText;
  slug: string;
  summary: LocalizedText;
  date: string;
  tags: string[];
  readTime: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
}

export interface GithubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  repos: GithubRepo[];
}

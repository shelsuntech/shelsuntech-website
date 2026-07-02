export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  visualType: 'finance' | 'healthcare' | 'retail' | 'logistics';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface TechItem {
  icon: string;
  name: string;
}

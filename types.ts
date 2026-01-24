export interface Organization {
  name: string;
  role: string;
  description: string;
  url?: string;
}

export interface LinkItem {
  label: string;
  url: string;
  displayUrl: string;
}

export interface Competency {
  area: string;
  details: string;
}
export interface Event {
  id?: string;
  title: string;
  image: string;
  date: Date;
  locationName: string;
  locationX: number;
  locationY: number;
  link: string;
  hidden?: boolean;
}

export interface Article {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt?: Date;
  image: string;
  authorName: string;
  hidden?: boolean;
}

export interface Marker {
  name: string;
  hidden: boolean;
  link: string;
  x: number;
  y: number;
}

export interface Participant {
  school: string;
  teachers: string;
  coordinates: string;
  isApproved?: boolean;
}

export interface ParticipantsTotal {
  schools: number;
  participants: number;
}

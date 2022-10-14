export interface Event {
  id?: string;
  title: string;
  image: string;
  date: Date;
  locationName: string;
  locationX: number;
  locationY: number;
  link: string;
}

export interface Marker {
  name: string;
  x: number;
  y: number;
}

export interface Event {
  title: string;
  image: string;
  date: string;
  location: {
    name: string;
    x: number;
    y: number;
  };
  link: string;
}

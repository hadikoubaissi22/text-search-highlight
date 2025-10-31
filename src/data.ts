export interface Article {
  id: number;
  title: string;
  date: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "What is a Front-End Developer",
    date: "Oct 31, 2025",
    content:
      "A Front-End Developer is someone who creates websites and web applications. The difference between Front-End and Back-End is that Front-End refers to how a web page looks, while back-end refers to how it works. You can think of Front-End as client-side and Back-End as server-side."
  },

  {
    id: 2,
    title: "Backend Development",
    date: "Oct 31, 2025",
    content:
      "Backend development handles the server-side logic, database, and core functionality of web applications. It ensures smooth communication between the server and client"
  }
];

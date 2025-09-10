import { Counts, ForumCardData, UserInformation } from "@/types/user";
import { ReactNode, useState, useEffect } from "react";
import { mockUserInformation, mockUserCounts, mockForumData, simulateApiDelay } from "../mockData";

export const staticUserProfile: UserInformation = mockUserInformation;



export interface ProfileImageProps {
  disableButton?: ReactNode;
}

// user data activity
export interface DataBlockProps {
  number: number | string;
  text: string;
  color: string;
}
// export const activityData = {
//   like: 10,
//   question: 5,
//   answer: 70,
//   comment: 3,
//   content: 20,
// };
export const arabicToKhmer = (num: number) => {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return num
    .toString()
    .split("")
    .map((digit) => khmerDigits[parseInt(digit)])
    .join("");
};


export const CardsData = () => {
  const [forumData, setForumData] = useState<ForumCardData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay with static data
    const fetchData = async () => {
      try {
        // Simulate loading delay
        await simulateApiDelay(1000);
        
        // Use static forum data
        setForumData(mockForumData);
      } catch (error) {
        console.error("Error loading forum data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { forumData, loading, error };
};

export const forumCardData: ForumCardData[] = mockForumData;

// Static counts data
const staticCounts: Counts = mockUserCounts;

export const useFetchCounts = () => {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await simulateApiDelay(800);
        
        setCounts(staticCounts);
      } catch (error) {
        console.error("Error loading counts:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { counts, loading, error };
}; // Mock Data
export const cardsData = [
  // {
  //   id: 1,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "Linuxoid",
  //   timestamp: "12-Nov-2024 1:38PM",
  //   title: "What is a difference between Java and JavaScript?",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.",
  //   tags: ["java", "javascript", "programming"],
  //   views: 125,
  //   comments: 15,
  //   upvotes: 155,
  // },
  // {
  //   id: 2,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "TechGuru",
  //   timestamp: "12-Nov-2024 2:15PM",
  //   title: "Understanding React Hooks: UseEffect Explained",
  //   content:
  //     "Discover the power of useEffect hook in React and how it manages side effects in functional components.",
  //   tags: ["react", "javascript", "hooks"],
  //   views: 232,
  //   comments: 24,
  //   upvotes: 189,
  // },
  // {
  //   id: 3,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "DevMaster",
  //   timestamp: "12-Nov-2024 3:20PM",
  //   title: "Python vs JavaScript: Which to Learn First?",
  //   content:
  //     "A comprehensive comparison of Python and JavaScript for beginners starting their programming journey.",
  //   tags: ["python", "javascript", "beginners"],
  //   views: 543,
  //   comments: 45,
  //   upvotes: 278,
  // },
  // {
  //   id: 4,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "CodeNinja",
  //   timestamp: "12-Nov-2024 4:05PM",
  //   title: "Getting Started with TypeScript",
  //   content:
  //     "Learn the basics of TypeScript and how it improves JavaScript development with static typing.",
  //   tags: ["typescript", "javascript", "webdev"],
  //   views: 321,
  //   comments: 28,
  //   upvotes: 198,
  // },
  // {
  //   id: 5,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "WebWizard",
  //   timestamp: "12-Nov-2024 4:45PM",
  //   title: "CSS Grid vs Flexbox: Which One to Use?",
  //   content:
  //     "An in-depth comparison of CSS Grid and Flexbox for layout design in modern web development.",
  //   tags: ["css", "webdev", "design"],
  //   views: 412,
  //   comments: 35,
  //   upvotes: 210,
  // },
  // {
  //   id: 6,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "DataDude",
  //   timestamp: "12-Nov-2024 5:30PM",
  //   title: "Introduction to Machine Learning with Python",
  //   content:
  //     "A beginner's guide to machine learning concepts and how to implement them using Python.",
  //   tags: ["python", "machinelearning", "data"],
  //   views: 678,
  //   comments: 50,
  //   upvotes: 345,
  // },
  // {
  //   id: 7,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "CloudCrafter",
  //   timestamp: "12-Nov-2024 6:15PM",
  //   title: "Getting Started with AWS",
  //   content:
  //     "Learn the basics of Amazon Web Services and how to deploy your first application on the cloud.",
  //   tags: ["aws", "cloud", "devops"],
  //   views: 523,
  //   comments: 40,
  //   upvotes: 290,
  // },
  // {
  //   id: 8,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "AIEnthusiast",
  //   timestamp: "12-Nov-2024 7:00PM",
  //   title: "Understanding Neural Networks",
  //   content:
  //     "A comprehensive guide to neural networks and their applications in artificial intelligence.",
  //   tags: ["ai", "neuralnetworks", "deeplearning"],
  //   views: 789,
  //   comments: 60,
  //   upvotes: 410,
  // },
  // {
  //   id: 9,
  //   avatar:
  //     "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
  //   username: "FrontendFanatic",
  //   timestamp: "12-Nov-2024 7:45PM",
  //   title: "Building Responsive Websites with Bootstrap",
  //   content:
  //     "Learn how to create responsive and mobile-friendly websites using the Bootstrap framework.",
  //   tags: ["bootstrap", "webdev", "responsive"],
  //   views: 345,
  //   comments: 25,
  //   upvotes: 220,
  // },
];

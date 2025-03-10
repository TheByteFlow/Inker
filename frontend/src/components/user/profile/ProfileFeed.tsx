import { FC, useState } from "react";
import BlogCard from "../common/BlogCard";
import { ArrowBigUp,ArrowBigDown, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
const TAB_OPTIONS = ["Posts", "Archieve", "Saved"] as const;
export const dummyPosts = [
  {
    title: "Mastering JavaScript Closures",
    tags: ["javascript", "functional-programming", "advanced"],
    date: "Jan 15",
    minute: 5,
    imageURL:
      "https://tse1.mm.bing.net/th?id=OIP.kkJ4tBMv2tT9OqxmUWlQFgHaEK&pid=Api&P=0&h=180",
    upvotes: 23,
    downvotes: 4,
  },
  {
    title: "Understanding React's Reconciliation Algorithm",
    tags: ["react", "performance", "virtual-dom",'sdfdf'],
    date: "Mar 10",
    minute: 8,
    imageURL:
      "https://tse1.mm.bing.net/th?id=OIP.lyFjc5YkrtksZ1LbAsPuGAHaD4&pid=Api&P=0&h=180",
    upvotes: 30,
    downvotes: 1,
  },
  {
    title: "Git Commands That Might Save You One Day",
    tags: ["productivity", "git", "+1"],
    date: "Feb 20",
    minute: 7,
    imageURL:
      "https://i.morioh.com/2023/08/18/a0ecc9b5.webp",
    upvotes: 15,
    downvotes: 2,
  },
  {
    title: "Building Scalable Node.js Applications",
    tags: ["nodejs", "backend", "scalability"],
    date: "Dec 05",
    minute: 10,
    imageURL:
      "https://tse4.mm.bing.net/th?id=OIP.W1ZnAvRNWYSyBsBc0NdwpgHaER&pid=Api&P=0&h=180",
    upvotes: 18,
    downvotes: 3,
  },
  {
    title: "A Beginner’s Guide to MongoDB Indexing",
    tags: ["mongodb", "database", "performance"],
    date: "Nov 22",
    minute: 6,
    imageURL: "https://i.morioh.com/2023/08/18/a0ecc9b5.webp",
    upvotes: 12,
    downvotes: 5,
  },
];

const ProfileFeed: FC = () => {
  const [activeTab, setActiveTab] = useState<"Posts" | "Archieve" | "Saved">(
    "Posts"
  );

  return (
    <div className="mt-4 lg:m-0 lg:border flex-1 max-w-[900px]">
      <div className="flex gap-4 justify-around border-b text-gray-600 sticky top-0 bg-white dark:bg-black">
        {TAB_OPTIONS.map((tab) => (
          <div className="relative">
            <button
              key={tab}
              className={`px-5 py-2 rounded-lg text-md dark:hover:bg-neutral-500/10 hover:bg-gray-200/30 ${
                activeTab === tab
                  ? "font-semibold dark:text-white "
                  : "font-medium"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 w-12 -translate-x-1/2 border-b-2 dark:border-white border-black"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center  p-4 h-[85vh] lg:overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle:'none'}}>
        {dummyPosts.length>0?(
          dummyPosts.map((post, index) => (
            <div
              key={index}
              className="p-2 m-1 border-2 rounded-lg max-w-[300px] flex flex-col justify-between relative"
            > 
              <button>
          <EllipsisVertical className="rounded-xl hover:cursor-pointer absolute right-2 top-2"/>
        </button>
             <Link to={`/blog/${index}`}>
                <BlogCard post={post} />
              </Link>  
              
              <div className="flex ml-auto mt-3 px-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 w-fit rounded-md ">
                <button className="flex items-center gap-1 text-sm  hover:cursor-pointer">
                  <ArrowBigUp strokeWidth={1}/> {post.upvotes}
                </button>
                <button className="flex items-center gap-1 text-sm  hover:cursor-pointer ml-2">
                  <ArrowBigDown strokeWidth={1}/> 
                </button>
              </div>
            </div>
          ))
        ):(
          <p className="text-gray-600 text-center text-2xl font-medium  col-span-3 mt-14">No posts available !</p>
        )}
      </div>
    </div>
  );
};

export default ProfileFeed;

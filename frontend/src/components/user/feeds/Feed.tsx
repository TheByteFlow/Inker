import { Link } from "react-router-dom";
import { dummyPosts } from "../profile/ProfileFeed";
import BlogCard from "../common/BlogCard";
import {
  FaRegComment,
  FaRegBookmark,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import char from "../../../assets/char3.jpeg";
import { ArrowBigDown, ArrowBigUp, EllipsisVertical } from "lucide-react";

const Feeds = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Filter box</h1>
      {dummyPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full relative p-2"
              >
                <button>
                  <EllipsisVertical className="rounded-xl hover:cursor-pointer absolute right-1 top-3" />
                </button>

                <div className="flex w-full items-center">
                  <img
                    src={char}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <span className="font-medium">Akshay</span>
                </div>

                <Link
                  to={`/blog/${index}`}
                  className="flex-grow"
                  aria-label={`Read post ${post.title || "Untitled"}`}
                >
                  <div className="p-1">
                    <BlogCard post={post} />
                  </div>
                </Link>
                <div className="flex justify-between items-center px-4 py-3 border-gray-100 dark:border-gray-700">
                  <div className="flex items-center px-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 w-fit rounded-md">
                    <button className="flex items-center gap-1 text-sm hover:cursor-pointer">
                      <ArrowBigUp strokeWidth={1} /> {post.upvotes}
                    </button>
                    <button className="flex items-center gap-1 text-sm hover:cursor-pointer ml-2">
                      <ArrowBigDown strokeWidth={1} />
                    </button>
                  </div>

                  <div className="flex ">
                    <button
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-1 rounded-full"
                      aria-label="Comment on post"
                    >
                      <FaRegComment className="w-5 h-5" />
                      <span className="text-sm">{10}</span>
                    </button>

                    <button
                      className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 p-1 rounded-full"
                      aria-label="Save post"
                    >
                      <FaRegBookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination UI */}
          <nav className="flex justify-center mt-10" aria-label="Pagination">
            <ul className="flex items-center space-x-1">
              {/* Previous Button */}
              <li>
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
                  <FaChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>
              </li>

              {/* Page Numbers */}
              <li>
                <button className="px-4 py-2 rounded-md text-sm font-medium border">
                  1
                </button>
              </li>
              <li>
                <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                  2
                </button>
              </li>
              <li>
                <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                  3
                </button>
              </li>

              {/* Ellipsis */}
              <li>
                <span className="px-2 py-2 text-gray-500 dark:text-gray-400">
                  ...
                </span>
              </li>

              {/* Next Button */}
              <li>
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300">
                  Next
                  <FaChevronRight className="ml-2 h-4 w-4" />
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
            No posts available yet
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Check back later for new content
          </p>
        </div>
      )}
    </section>
  );
};

export default Feeds;

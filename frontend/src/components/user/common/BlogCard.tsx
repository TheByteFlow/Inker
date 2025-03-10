import { FC } from "react";

interface BlogCardProps {
  post: {
    title: string;
    tags: string[];
    date: string;
    minute: number;
    imageURL: string;
  };
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="max-w-[400px] w-full rounded-lg justify-items-stretch">
        <h2 className="text-lg font-bold text-x dark:text-white text-gray-800 w-[80%] hover:cursor-pointer line-clamp-2">
          {post.title}
        </h2>

      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags.map((tag, index) => (  
          <span
            key={index}
            className="px-2 py-[1px] text-xs border dark:border-gray-700 rounded-md text-gray-400  hover:cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <img
          src={post.imageURL}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md  hover:cursor-pointer"
        />
      </div>
      <p className="text-gray-400 text-xs mt-2">
        {post.date} • {post.minute}m read time
      </p>
    </div>
  );
};

export default BlogCard;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { CardContent, CardTitle } from "@/components/ui/card";
import { useBlogStore } from "@/store/blogStore";
import { Blog } from "@/types";
import { toast } from "sonner";
import Loader from "../../common/Loader";
import { formatBlogTimestamp } from "@/utils/formateDate";
import ViewBlogActionBar from "./ViewBlogActionBar";
import "./blog.css";

export default function ViewBlog() {
  const { blogId } = useParams<{ blogId: string }>();
  const { getBlogById, isLoading } = useBlogStore();
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (blogId) {
      const fetchBlogDetails = async (blogId: string) => {
        const res = await getBlogById(blogId);
        if (res) {
          setCurrentBlog(res);
        } else {
          toast.error("Blog not found");
        }
      };
      fetchBlogDetails(blogId);
    } else {
      toast.error("Blog ID is not provided");
    }
  }, [blogId, getBlogById]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="max-w-[200px]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen md:p-4 max-w-screen">
      {currentBlog ? (

          <div className="relative block w-full max-w-3xl mx-auto rounded-xl bg-background">

            <ViewBlogActionBar 
            blogId={currentBlog?._id} 
            comments={currentBlog?.comments} 
            upVotes={currentBlog?.upVotes} 
            downVotes={currentBlog?.downVotes}
            authorId={currentBlog?.authorId} 
            hasUpVoted={currentBlog?.hasUpVoted}
            hasDownVoted={currentBlog?.hasDownVoted} />

            <CardTitle className="text-3xl font-bold text-foreground mt-5">
              {currentBlog.title}
            </CardTitle>

            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none text-foreground">
                <MDEditor.Markdown
                  source={currentBlog.content}
                  className="custom-md dark:custom-md-dark"
                />
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                By {currentBlog.authorName} |{" "}
                {currentBlog.createdAt
                  ? formatBlogTimestamp(currentBlog.createdAt)
                  : "Date Unknown"}
              </p>
            </CardContent>

          </div>
      ) : (
        <div className="text-center text-2xl text-foreground">Blog not found!</div>
      )}
    </div>
  );
}

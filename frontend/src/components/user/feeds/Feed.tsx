import {Link} from "react-router-dom";
import BlogCard from "../common/BlogCard";
import {} from "react-icons/fa";
import {useSidebar} from "@/components/ui/sidebar";
import {useBlogStore} from "@/store/blogStore";
import {useEffect, useState} from "react";
import Pagination from "@/components/user/common/Pagination";
import useAuthStore from "@/store/authStore";
import Loader from "../common/Loader";
import BlogAuthorInfo from "./BlogAuthorInfo";
import EmptyFeedMessage from "./EmptyFeedMessage";
import BlogActionBar from "@/components/user/feeds/BlogActionBar.tsx";

const Feeds = () => {
    const {feeds, fetchAllBlogs} = useBlogStore()
    const {isAuthenticated, accessToken, isLoading} = useAuthStore()
    const {state} = useSidebar()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (isAuthenticated && accessToken) fetchAllBlogs(currentPage)
    }, [fetchAllBlogs, isAuthenticated, accessToken, currentPage])

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="max-w-[200px]"/>
            </div>
        );
    }


    return (
        <section className="w-full mx-auto  xl:max-w-7xl 2xl:border-x">
            {feeds?.blogs.length > 0 ? (

                <>
                    <div
                        className={`grid ${state === 'expanded' ? "xl:grid-cols-3  md:grid-cols-2 " : "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"} grid-cols-1 gap-4 h-fit justify-center  mt-5 p-2`}>
                        {feeds.blogs.map((blog, index) => (
                            <article
                                key={index}
                                className="bg-white dark:bg-transparent border border-muted rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mx-auto flex flex-col h-full relative p-2 w-full max-w-[400px]"
                            >

                                <BlogAuthorInfo authorName={blog?.authorName}
                                                authorProfilePicture={blog?.authorProfilePicture}/>

                                <Link
                                    to={`/blog/${blog._id}`}
                                    className="flex-grow"
                                    aria-label={`Read post ${blog.title || "Untitled"}`}
                                >
                                    <div className="p-1">
                                        <BlogCard blog={blog}/>
                                    </div>
                                </Link>

                                <BlogActionBar
                                    blogId={blog._id}
                                    comments={blog.comments}
                                    upVotes={blog.upVotes}
                                    downVotes={blog.downVotes}
                                    hasUpVoted={blog.hasUpVoted}
                                    hasDownVoted={blog.hasDownVoted}
                                    authorId={blog.authorId}/>
                            </article>
                        ))}
                    </div>

                    <Pagination onPageChange={onPageChange} currentPage={currentPage} totalPages={feeds?.totalPages}/>
                </>

            ) : (
                <EmptyFeedMessage/>
            )}
        </section>
    );
};

export default Feeds;

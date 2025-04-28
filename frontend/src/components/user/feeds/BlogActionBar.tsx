import {useVote} from "@/hooks/useVote.tsx";
import useAuthStore from "@/store/authStore.ts";
import {useBlogStore} from "@/store/blogStore.ts";
import {showConfirmDialog} from "@/store/slices/confirmDialogSlice.ts";
import {useBlogEditorStore} from "@/store/useBlogEditorStore.ts";
import {ArrowBigDown, ArrowBigUp, ArrowLeft, Clipboard, MessageCircle, Pencil, Trash2} from "lucide-react";
import {FC} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "sonner";

interface ViewBlogActionBarProps {
    blogId: string;
    comments: number;
    upVotes: number;
    downVotes: number;
    authorId: string;
    hasDownVoted: boolean;
    hasUpVoted: boolean;
}

const ViewBlogActionBar: FC<ViewBlogActionBarProps> = ({
                                                           blogId,
                                                           comments,
                                                           upVotes,
                                                           downVotes,
                                                           authorId,
                                                           hasDownVoted,
                                                           hasUpVoted,
                                                       }) => {


    const location = useLocation();
    const isViewBlog = location.pathname.startsWith("/blog");
    const {deleteBlog} = useBlogStore();
    const {setEditingBlog} = useBlogEditorStore();
    const {user} = useAuthStore();

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {
        localUpVotes,
        localDownVotes,
        localHasUpVoted,
        localHasDownVoted,
        handleUpVote,
        handleDownVote,
    } = useVote(blogId, hasUpVoted, hasDownVoted, upVotes, downVotes);

    const handleDelete = () => {
        deleteBlog(blogId, user?._id as string);
    };

    const handleEditNavigator = async () => {
        const val = await setEditingBlog(blogId);
        if (val) {
            navigate(`/blog/edit`);
        }
    };

    return (
        <div
            className={`${isViewBlog
                ? "sticky top-[75px] md:top-[73px]  border-b justify-end "
                : " border-t justify-between mt-2"
            } bg-white dark:bg-black flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 py-2 px-2 sm:px-4 overflow-x-auto sm:overflow-visible`}
        >
            <div
                onClick={() => navigate(-1)}
                className={`text-muted-foreground hover:text-foreground mr-auto ${isViewBlog ? "" : "hidden"} `}
                aria-label="Back to Blogs"
            >
                <ArrowLeft className="h-3 w-3 sm:h-5 sm:w-5"/>
            </div>

            {user?._id === authorId && (
                <div className="flex items-center gap-2 justify-center rounded border px-2 text-xs sm:text-sm">
                    <Trash2
                        className="w-4 h-4 sm:w-[17px] sm:h-[17px] cursor-pointer"
                        strokeWidth={1}
                        onClick={() =>
                            dispatch(
                                showConfirmDialog({
                                    title: "Are you sure you want to delete?",
                                    description: "You will not be able to recover it.",
                                    confirmText: "Delete",
                                    cancelText: "Cancel",
                                    onConfirm: () => handleDelete(),
                                })
                            )
                        }
                    />
                    <div className="h-[20px] sm:h-[25px] bg-muted-foreground/30 w-[1.5px]"/>
                    <Pencil
                        className="w-4 h-4 sm:w-[17px] sm:h-[17px] cursor-pointer"
                        strokeWidth={1}
                        onClick={handleEditNavigator}
                    />
                </div>
            )}

            <div
                className={`flex items-center justify-center p-1 rounded-md border hover:bg-muted cursor-pointer ${isViewBlog ? "" : "hidden"
                }`}
                onClick={() => {
                    navigator.clipboard.writeText(`http://inker-dev.vercel.app/blog/${blogId}`);
                    toast.success("Blog link copied!");
                }}
                title="Copy blog link"
            >
                <Clipboard className="w-3 h-3 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1}/>
            </div>

            <div
                className="flex items-center justify-center gap-1 p-1 text-xs sm:text-sm border px-2 rounded-md hover:bg-muted cursor-pointer">
                <span className="hidden xs:inline">{comments}</span>
                <MessageCircle className="w-3 h-3 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1}/>
            </div>

            <div
                className="flex items-center gap-2 justify-center rounded border  px-2 text-xs sm:text-sm cursor-pointer"
                onClick={handleDownVote}>
                {localDownVotes}
                <div className="h-[20px] sm:h-[25px] bg-muted-foreground/30 w-[1.5px]"/>
                <ArrowBigDown
                    size={17}
                    strokeWidth={1}
                    color={localHasDownVoted ? "#FFAA01" : "#464545"}
                    fill={localHasDownVoted ? "#FFAA01" : "none"}
                />

            </div>

            <div
                className="flex items-center gap-2 justify-center rounded border px-2 text-xs sm:text-sm cursor-pointer"
                onClick={handleUpVote}>
                {localUpVotes}
                <div className="h-[20px] sm:h-[25px] bg-muted-foreground/30 w-[1.5px]"/>
                <ArrowBigUp
                    size={17}
                    strokeWidth={1}
                    color={localHasUpVoted ? "#FFAA01" : "#464545"}
                    fill={localHasUpVoted ? "#FFAA01" : "none"}
                />
            </div>
        </div>
    );
};

export default ViewBlogActionBar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, UserRound, Newspaper, Search, SquareActivity } from "lucide-react";

const BottomNavigation = () => {
	const [activeTab, setActiveTab] = useState("feeds");

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
			<div className="grid h-full max-w-lg grid-cols-5 mx-auto">
				<Link to="/home" className="inline-flex flex-col items-center justify-center px-5" onClick={() => handleTabChange("feeds")}>
					<Newspaper className={`w-6 h-6 mb-1 ${activeTab === "feeds" ? "text-black" : "text-gray-500"}`} />
					<span className="text-xs text-gray-500">Feeds</span>
				</Link>

				<Link to="/explore" className="inline-flex flex-col items-center justify-center px-5" onClick={() => handleTabChange("explore")}>
					<Search className={`w-6 h-6 mb-1 ${activeTab === "explore" ? "text-black" : "text-gray-500"}`} />
					<span className="text-xs text-gray-500">Explore</span>
				</Link>

				<Link to="/blog/create" className="inline-flex flex-col items-center justify-center px-5" onClick={() => handleTabChange("create")}>
					<div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
						<Plus className="w-6 h-6 text-white" />
					</div>
				</Link>

				<Link to="/activity" className="inline-flex flex-col items-center justify-center px-5" onClick={() => handleTabChange("activity")}>
					<SquareActivity className={`w-6 h-6 mb-1 ${activeTab === "activity" ? "text-black" : "text-gray-500"}`} />
					<span className="text-xs text-gray-500">Activity</span>
				</Link>

				<Link to="/profile" className="inline-flex flex-col items-center justify-center px-5" onClick={() => handleTabChange("profile")}>
					<UserRound className={`w-6 h-6 mb-1 ${activeTab === "profile" ? "text-black" : "text-gray-500"}`} />
					<span className="text-xs text-gray-500">Profile</span>
				</Link>
			</div>
		</div>
	);
};

export default BottomNavigation;

import { FC } from "react";
import EmailInput from "@/components/user/editProfile/EmailInput";
import PictureInput from "@/components/user/editProfile/PictureInput";
import UsernameInput from "@/components/user/editProfile/UsernameInput";
import UpdateProfile from "@/components/user/editProfile/UpdateProfile";


const EditProfile: FC = () => {

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 p-4 md:p-6 min-h-screen overflow-y-auto mt-0 md:mt-0">
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-1 border-b gap-4">
            <h1 className="text-xl md:text-2xl font-semibold">Profile</h1>
          </div>
          <p className="text-gray-500 text-[10px] md:text-xs ">
            Manage your account settings and set e-mail preferences. This is how
            others will see you on the site.
          </p>

          <div className="space-y-4 mt-6">
            <PictureInput />
            <UsernameInput />
            <EmailInput />
            <UpdateProfile />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default EditProfile;

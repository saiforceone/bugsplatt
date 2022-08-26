import {FC} from "react";
import { HiUserCircle } from "react-icons/hi";
import { FECommonUserData } from "../../../interfaces";

interface TeamUserCardProps {
  user: FECommonUserData,
  actions?: React.ReactNode
}

export const TeamUserCard: FC<TeamUserCardProps> = ({actions, user}) => {
  return (
    <div className="default-row bg-slate-100 mb-2 p-2 rounded">
      <HiUserCircle className="self-center h-5 w-6 mr-4" />
      <div className="flex flex-1 flex-col">
        <h3 className="font-semibold text-slate-800">{user.firstName} {user.lastName}</h3>
        <p className="text-slate-600">{user.emailAddress}</p>
      </div>
      {actions && (
        <div className="default-row">          
          {actions}
        </div>
      )}
    </div>
  );
};

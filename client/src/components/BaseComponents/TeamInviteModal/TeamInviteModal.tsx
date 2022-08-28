import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  HiCheckCircle,
  HiMail,
  HiOutlineCheck,
  HiTrash,
  HiUserGroup,
} from "react-icons/hi";
import { useLazyGetAvailableUsersQuery } from "../../../data/rtkApis/userProfileApi";
import { FECommonUserData, FETeam } from "../../../interfaces";
import { IStandardModal } from "../../Modals/modal.interfaces";
import { ModalWrapper } from "../../Modals/ModalWrapper/ModalWrapper";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { NoResultCard } from "../NoResultCard/NoResultCard";
import { ProgressLoader } from "../ProgressLoader/ProgressLoader";
import { Tag } from "../Tag/Tag";
import { TeamUserCard } from "../TeamUserCard/TeamUserCard";
import { TextInput } from "../TextInput/TextInput";

interface TeamInviteModalProps extends IStandardModal {
  actionInProgress: boolean;
  onExecAction: (data: FECommonUserData[]) => void;
  team: FETeam;
}

const userIsSelected = (
  user: FECommonUserData,
  userList: FECommonUserData[]
): boolean => {
  return !!userList.find((el) => el._id === user._id);
};

export const TeamInviteModal: FC<TeamInviteModalProps> = ({
  actionInProgress,
  modalHeaderProps,
  onExecAction,
  team,
  visible,
}) => {
  // State
  const [filterText, setFilterText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<FECommonUserData[]>([]);

  // Hooks
  const [usersTrigger, usersResultObj] = useLazyGetAvailableUsersQuery();

  useEffect(() => {
    if (visible) usersTrigger();
    if (!visible) setSelectedUsers([]);
  }, [visible]);

  const toggleSelectedUser = useCallback(
    (user: FECommonUserData) => {
      let _selectedUsers = [...selectedUsers];

      if (!userIsSelected(user, selectedUsers)) {
        _selectedUsers.push(user);
        return setSelectedUsers(_selectedUsers);
      }

      _selectedUsers = _selectedUsers.filter((u) => u._id !== user._id);
      setSelectedUsers(_selectedUsers);
    },
    [selectedUsers]
  );

  const availableUsers: FECommonUserData[] = useMemo(() => {
    try {
      const {
        data: { data },
      } = usersResultObj as { [key: string]: any };
      return (data as FECommonUserData[]).filter(
        (el) =>
          el.firstName.includes(filterText) || el.lastName.includes(filterText)
      );
    } catch (e) {
      return [];
    }
  }, [filterText, usersResultObj]);

  return (
    <ModalWrapper
      modalHeaderProps={{
        ...modalHeaderProps,
        title: "Invite To Team",
      }}
      visible={visible}
    >
      <div className="modal--container">
        <Tag
          icon={<HiUserGroup className="default-tag--icon" />}
          labelText={team.teamName}
          size="small"
        />
        <p className="text-lg text-slate-700 my-5">
          Use the field below to filter the user you would like to invite to
          this team and then click the user.
        </p>
        <TextInput
          placeholder="Filter by first or last name"
          onChange={(e) => setFilterText(e.target.value)}
          value={filterText}
        />
        <div className="h-52 overflow-auto">
          {availableUsers.length ? (
            availableUsers.map((user) => {
              const userSelected = userIsSelected(user, selectedUsers);
              return (
                <TeamUserCard
                  key={`user-${user._id}`}
                  user={user}
                  actions={
                    <>
                      <DefaultButton
                        active
                        extraCss={userSelected ? "bg-red-800" : ""}
                        icon={
                          userSelected ? (
                            <HiTrash className="default-tag--icon" />
                          ) : (
                            <HiCheckCircle className="default-tag--icon" />
                          )
                        }
                        label={userSelected ? "Unselect" : "Select"}
                        onClick={() => toggleSelectedUser(user)}
                      />
                    </>
                  }
                />
              );
            })
          ) : (
            <NoResultCard primaryText="No users available" />
          )}
        </div>
        <div className="modal--row justify-center">
          {actionInProgress ? (
            <ProgressLoader visible />
          ) : (
            <DefaultButton
              active
              icon={<HiMail className="default-tag--icon" />}
              label="Invite To Team"
              onClick={() => {
                onExecAction(selectedUsers);
              }}
            />
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

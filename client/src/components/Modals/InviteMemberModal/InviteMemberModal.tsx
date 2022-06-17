import { useCallback, useState } from "react";
import "../Modals.css";
import "./InviteMemberModal.css";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { TextInput } from "../../BaseComponents/TextInput/TextInput";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { HiMail, HiTrash } from "react-icons/hi";
import { NoResultCard } from "../../BaseComponents/NoResultCard/NoResultCard";

export interface InviteMemberModalProps {
  onClose: () => void;
  onSendInvites: (invites: string[]) => void;
  teamName: string;
  visible: boolean;
}

export const InviteMemberModal = ({
  onClose,
  onSendInvites,
  teamName,
  visible,
}: InviteMemberModalProps) => {
  const [inviteAddress, setInviteAddress] = useState("");
  const [invites, setInvites] = useState<string[]>([]);

  const addInvite = useCallback(() => {
    
    const _invites = [...invites];
    _invites.push(inviteAddress);
    setInvites(_invites);
    setInviteAddress("");
  }, [inviteAddress]);

  const onRemoveInvite = useCallback(
    (index: number) => {
      console.log("remove index: ", index);
      const _invites = [...invites];
      _invites.splice(index, 1);
      setInvites(_invites);
    },
    [invites]
  );

  const onExecuteSendInvites = useCallback(() => {
    if (!invites.length) {
      return alert('Invitees have not been specified');
    }
    onSendInvites(invites);
  }, [invites]);

  return (
    <ModalWrapper
      modalHeaderProps={{
        onClose,
        title: "Invite Team Members",
      }}
      visible={visible}
    >
      <div className="modal--container">
        <div className="modal--row">
          <Tag
            labelText={`Team: ${teamName ? teamName : "N/A"}`}
            size="small"
          />
        </div>
        <div className="modal--row">
          <p>
            Use the field below to input the email address of the users you
            would like to invite to this team and then press "Enter"
          </p>
        </div>
        <div className="modal--row">
          <TextInput
            labelText="User's Email Address"
            placeholder="user@example.com"
            onChange={(e) => setInviteAddress(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addInvite();
              }
            }}
            value={inviteAddress}
          />
        </div>
        <div className="modal--row">
          <h3>
            Users to be invited: {invites?.length ? invites.length : "None"}
          </h3>
        </div>
        <div >
          {invites.length ? (<div className="modal--row flex-wrap">
            {invites.map((invite, index) => (
              <Tag
                actionElements={
                  <HiTrash
                    className="self-center ml-2"
                    onClick={() => onRemoveInvite(index)}
                  />
                }
                extraCss="mr-1 mt-1"
                key={`invite-${invite}-${index}`}
                labelText={invite}
                size="small"
              />
            ))}
            </div>
          ) : (
            <NoResultCard primaryText="No members to invite" />
          )}
        </div>
        <div className="modal--row justify-center mt-4">
          <DefaultButton
            active
            icon={<HiMail className="default--icon" />}
            label="Send Invites"
            onClick={onExecuteSendInvites}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

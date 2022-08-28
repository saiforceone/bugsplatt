import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { IStandardModal } from "../modal.interfaces";
import { FETeam, NewTeamData } from "../../../interfaces";
import { TextInput } from "../../BaseComponents/TextInput/TextInput";
import { TextArea } from "../../BaseComponents/TextArea/TextArea";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { ProgressLoader } from "../../BaseComponents/ProgressLoader/ProgressLoader";

const DEFAULT_TEAM_DATA: NewTeamData = {
  teamName: "",
  teamDescription: "",
  teamImage: "",
  teamImageData: undefined,
};

interface TeamFormModalProps extends IStandardModal {
  actionInProgress: boolean;
  onExecAction: (data: NewTeamData) => void;
  team?: FETeam;
}

export const TeamFormModal: FC<TeamFormModalProps> = ({
  actionInProgress,
  modalHeaderProps,
  onExecAction,
  team,
  visible,
}) => {
  const [teamData, setTeamData] = useState<NewTeamData>(
    () => DEFAULT_TEAM_DATA
  );

  // Hooks
  useEffect(() => {
    if (!visible) {
      setTeamData(() => DEFAULT_TEAM_DATA);
    }
  }, [visible]);

  useEffect(() => {
    if (team) {
      const data: NewTeamData = {
        teamDescription: team.teamDescription,
        teamName: team.teamName,
        teamImage: team.teamImage,
      };
      setTeamData(data);
    }
  }, [team]);

  const onChangeFormData = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTeamData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [teamData]
  );

  const onSubmitData = useCallback(() => {
    if (
      !teamData.teamName.trim().length ||
      !teamData.teamDescription.trim().length
    ) {
      return;
    }
    onExecAction(teamData);
  }, [teamData]);

  return (
    <ModalWrapper modalHeaderProps={modalHeaderProps} visible={visible}>
      <div className="modal--container">
        <TextInput
          labelText="Team Name"
          name="teamName"
          onChange={(e) => onChangeFormData(e)}
          value={teamData.teamName}
        />
        <TextArea
          labelText="Team Description"
          name="teamDescription"
          onChange={(e) => onChangeFormData(e)}
          value={teamData.teamDescription}
        />
        <div className="modal--row justify-center mt-4">
          {actionInProgress ? (
            <ProgressLoader visible />
          ) : (
            <DefaultButton
              active
              label={`${team ? "Update" : "Create"} Team`}
              onClick={() => {
                onSubmitData();
              }}
            />
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

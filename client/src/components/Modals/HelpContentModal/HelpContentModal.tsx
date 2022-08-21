import { FC } from "react";
import { FEHelpContent } from "../../../interfaces";
import { DATE_FORMATS, FormattingUtils } from "../../../utils/FormattingUtils";
import { StackedLabel } from "../../BaseComponents/StackedLabel/StackedLabel";
import { IStandardModal } from "../modal.interfaces";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

interface HelpContentModalProps extends IStandardModal {
  helpContent: FEHelpContent;
}

export const HelpContentModal: FC<HelpContentModalProps> = ({
  modalHeaderProps,
  visible,
  helpContent,
}) => {
  return (
    <ModalWrapper modalHeaderProps={modalHeaderProps} visible={visible}>
      <div className="modal--container">
        <StackedLabel content={helpContent.content} label="Details" />
        <StackedLabel
          content={FormattingUtils.formatDate(
            helpContent.createdAt,
            DATE_FORMATS["MEDIUM_DATE_TIME"]
          )}
          label="Published"
        />
        <StackedLabel
          content={FormattingUtils.formatDate(
            helpContent.updatedAt,
            DATE_FORMATS["MEDIUM_DATE_TIME"]
          )}
          label="Last Updated"
        />
      </div>
    </ModalWrapper>
  );
};

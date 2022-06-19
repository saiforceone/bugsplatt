import { ChangeEvent, useRef } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { DefaultButton } from "../DefaultButton/DefaultButton";

const DEFAULT_ACCEPT = 'image/*,.pdf,.txt';

export interface HiddenFileInputProps {
  accept?: string;
  buttonText: string;
  onAddFile: (file: File) => void;
}

export const HiddenFileInput = ({
  accept,
  buttonText,
  onAddFile,
}: HiddenFileInputProps) => {

  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          if (target && target.files) {
            onAddFile(target.files[0]);
          }
        }}
        accept={accept ? accept : DEFAULT_ACCEPT}
        ref={fileInput}
        style={{ display: "none" }}
        type="file"
      />
      <DefaultButton
        active
        label={buttonText}
        icon={<HiDocumentAdd className="default--icon" />}
        onClick={() => {
          fileInput.current?.click();
        }}
      />
    </div>
  )
}
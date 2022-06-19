import { HiDocument, HiX } from 'react-icons/hi';
import { IconButton } from '../IconButton/IconButton';
import './FileAttachmentCard.css';

export interface FileAttachmentCardProps {
  fileName: string;
  fileSize: string;
  removeAction: () => void;
}

export const FileAttachmentCard = ({
  fileName,
  fileSize,
  removeAction
}: FileAttachmentCardProps) => {

  return (
    <div className='file-attachment-card'>
      <div className='file-attachment-card--icon-container'>
        <HiDocument className='default--icon self-center text-white h-5 w-5' />
      </div>
      <div className='file-attachment-card--content'>
        <h4 className='file-attachment-card--file-name'>{fileName}</h4>
        <small className='file-attachment-card--file-size'>{fileSize}</small>
      </div>
      <IconButton
        active
        icon={<HiX className='default--icon self-center' />}
        isCloseButton
        onClick={removeAction}
      />
    </div>
  );
}

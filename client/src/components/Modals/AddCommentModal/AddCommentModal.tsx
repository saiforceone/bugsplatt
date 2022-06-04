import { useCallback, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { TextArea } from '../../BaseComponents/TextArea/TextArea';
import { DefaultButton } from '../../BaseComponents/DefaultButton/DefaultButton';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import '../Modals.css';

export interface AddCommentModalProps {
  issueName: string;
  onAddComment: (comment: string) => void;
  onClose: () => void;
  visible: boolean;
}

export const AddCommentModal = ({
  issueName,
  onAddComment,
  onClose,
  visible
}: AddCommentModalProps): JSX.Element => {

  const [commentText, setCommentText] = useState<string>('');
  const onHandleAddComment = useCallback(() => {
    if (commentText.trim().length < 3) {
      return alert('Unable to add an empty comment');
    }
    onAddComment(commentText);
  }, [commentText])

  return (
    <ModalWrapper visible={visible}>
      <div className='modal--container'>
        <ModalHeader
          onClose={onClose}
          subtitle='Use the field below to add a comment for this issue...'
          title='Add Comment'
        />
        <div className="modal--row">
          <TextArea
            id='add-comment-field'
            labelText='Add a comment'
            onChange={e => setCommentText(e.target.value)}
            placeholder='Type you comment for this issue here...'
            value={commentText}
          />
        </div>
        <div className='modal--row justify-center'>
          <DefaultButton active label='Add Comment' onClick={onHandleAddComment} buttonSize='medium' icon={<HiPlusCircle className='default-icon' />} />
        </div>
      </div>
    </ModalWrapper>
  );
};

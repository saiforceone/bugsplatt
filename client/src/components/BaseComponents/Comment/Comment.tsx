import './comment.css';
import { Tag } from '../Tag/Tag';

export interface CommentProps {
  commentText: string;
  commentAuthor: string;
  commentDate?: string;
}

export const Comment = ({
  commentText,
  commentAuthor,
  commentDate
}: CommentProps) => {
  return (
    <div className='comment--container'>
      <p className='comment--content'>{commentText}</p>
      <div className='comment--bottom-row'>
        <Tag labelText={`${commentAuthor}${commentDate ? ' @ ' + commentDate : ''}`} size='small' />
      </div>
    </div>
  );
};

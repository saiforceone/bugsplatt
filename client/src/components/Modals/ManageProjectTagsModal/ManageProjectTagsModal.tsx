import React, {FC, useCallback, useEffect, useState} from 'react';
import {ModalWrapper} from '../ModalWrapper/ModalWrapper';
import {IStandardModal} from '../modal.interfaces';
import {TextInput} from '../../BaseComponents/TextInput/TextInput';
import {NoResultCard} from '../../BaseComponents/NoResultCard/NoResultCard';
import {Tag} from '../../BaseComponents/Tag/Tag';
import {DefaultButton} from '../../BaseComponents/DefaultButton/DefaultButton';
import {useUpdateProjectMutation} from '../../../data/rtkApis/projectApi';
import {HiTrash} from 'react-icons/hi';
import {ProgressLoader} from '../../BaseComponents/ProgressLoader/ProgressLoader';

interface ManageProjectTagsModalProps extends IStandardModal {
  projectId: string;
  projectName: string;
  projectTags: string[];
  execPostAction: () => void;
}

export const ManageProjectTagsModal: FC<ManageProjectTagsModalProps> = (
  {
    projectId,
    projectName,
    projectTags,
    visible,
    modalHeaderProps,
    execPostAction
  }
) => {

  const [updateProjTrigger, updateProjResult] = useUpdateProjectMutation();
  const [tagText, setTagText] = useState('');
  const [tags, setTags] = useState(() => [...projectTags]);

  const addTag = useCallback(() => {
    const trimmedTagText = tagText.trim();
    if (!trimmedTagText.length) return;
    if (tags.includes(trimmedTagText)) return;
    const _tags = [...tags];
    _tags.push(trimmedTagText);
    setTags(_tags);
    setTagText('');
  }, [projectTags, tags, tagText]);

  const removeTagAtIndex = useCallback((tagIndex: number) => {
    const _tags = [...tags];
    _tags.splice(tagIndex, 1);
    setTags(_tags);
  }, [projectTags, tags]);

  useEffect(() => {
    if (updateProjResult.isSuccess) {
      execPostAction();
    }
  }, [updateProjResult]);

  return (
    <ModalWrapper
      modalHeaderProps={{
        ...modalHeaderProps,
        title: `Manage Tags for: ${projectName}`
      }}
      visible={visible}
    >
      <div className="modal--container">
        <div className="modal--row">
          <TextInput
            labelText="Add a new tag"
            placeholder="Type some text and press 'Enter' to add it as a tag"
            onChange={e => setTagText(e.target.value)}
            onKeyUp={e => {
              if (e.key === "Enter") {
                console.log('try to add the tag with text: ', tagText);
                addTag();
              }
            }}
            value={tagText}
          />
        </div>
        <hr/>
        <div className="my-4">
          {tags.length ? (
            <div className="modal--row">
              {tags.map((tag, tagIndex) => <Tag
                key={`project-tag-${tag}`}
                extraCss="mr-1 mb-1" labelText={tag} size={'small'} actionElements={<HiTrash className="self-center ml-2 text-amber-400" onClick={() => removeTagAtIndex(tagIndex)} />}
              />)}
            </div>
          ) : <NoResultCard
            primaryText="No Tags Added"
            secondaryText="Look like there haven't been any tags added for this project yet. Use the field above ⬆️"
          />}
        </div>
        <div className="modal--row justify-center">
          {updateProjResult.isLoading ? (<ProgressLoader visible={true} />) : <DefaultButton active label="Save Project Tags" onClick={() => {
            console.log('attempt to commit changes');
            updateProjTrigger({_id: projectId, tags})
          }}/>}
        </div>
      </div>
    </ModalWrapper>
  );
};

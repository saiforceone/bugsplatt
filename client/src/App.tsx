import { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import LoginButton from './components/shared/LoginButton';
import LogoutButton from './components/shared/LogoutButton';
import { ProjectModal } from './components/Modals/ProjectModal/ProjectModal';
import { useLazyGetCommentsQuery } from './data/rtkApis/commentApi';
import { useLazyGetProjectsQuery, useLazyGetProjectWithIdQuery } from './data/rtkApis/projectApi';
import { useLazyGetIssuesQuery, useUpdateIssueMutation, useAddIssueMutation, useDeleteIssueMutation } from './data/rtkApis/issueApi';
import {setAuthToken} from './data/slices/authSlice';
import {useAppSelector} from './data/hooks/useAppSelector'

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // TEMP CODE
  const dispatch = useDispatch();
  const authStore = useAppSelector((state) => state.auth);

  const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();
  // TODO: need a way to force waiting for the token before executing queries
  const [trigger, result, lastPromiseInfo] = useLazyGetCommentsQuery();
  const [triggerProjects] = useLazyGetProjectsQuery();
  const [triggerSingleProject] = useLazyGetProjectWithIdQuery()
  const [triggerUpdateIssue, {isLoading: isUpdatingIssue}] = useUpdateIssueMutation();
  const [triggerAddIssue, {isLoading: isCreatingIssue}] = useAddIssueMutation();
  const [triggerDeleteIssue] = useDeleteIssueMutation();
  // END TEMP CODE


  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenWithPopup({
          audience: 'https://bugsplatt-api.io',
        });
        console.log('token is: ', token);
        setAccessToken(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenWithPopup, isAuthenticated]);

  /**
   * TEMPORARY CODE
   */
  useEffect(() => {
    dispatch(setAuthToken(accessToken));
  }, [accessToken])

  useEffect(() => {
    console.log('auth token in redux set');
    console.log('authStore:', authStore);
    if (authStore.authToken) {
      trigger();
      // triggerProjects();
      triggerSingleProject("6275ee2c0e2d632d52abcf7d");

      // triggerUpdateIssue({_id: "6275ede80e2d632d52abcf6f", expectedCloseDate: "2022-08-01"});
      // triggerAddIssue({
      //   "createdBy": "622c0d168787b80069099f79",
      //   "assignedTo": "622c0d168787b80069099f79",
      //   "associatedProject": "6275ede70e2d632d52abcf6c",
      //   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //   "expectedCloseDate": "2022-08-01T00:00:00.000Z",
      //   "priority": "omg-wtf",
      //   "status": "active",
      //   "tags": [
      //       "tag 1",
      //       "tag 2"
      //   ],
      //   "title": "From RTK Query Post",
      //   "watchedBy": [
      //       "622c0d168787b80069099f79"
      //   ],
      // })
      // triggerDeleteIssue("62d0e57b597f82d81c84afc6");
    }
  }, [authStore.authToken]);
  /**
   * END TEMP CODE
   */

  return (
    <div className="App">
      {isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.nickname}</h2>
        </div>
      )}
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <button onClick={() => setModalVisible(!modalVisible)}>Show/Hide Modal</button>
      <ProjectModal 
        onCloseModal={() => setModalVisible(false)}
        onGoToProject={() => {}}
        createdAt={''}
        createdBy={'john batman'}
        issueDetails={{
          currentValue: 10,
          maxValue: 12,
          label: 'Issues'
        }}
        issues={[
          {
            resourceId: 'iss-1',
            issueTitle: 'Issue #1',
            issueDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
          }, {
            resourceId: 'iss-2',
            issueTitle: 'Issue #2',
            issueDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
          },
          {
            resourceId: 'iss-1',
            issueTitle: 'Issue #1',
            issueDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
          }, {
            resourceId: 'iss-2',
            issueTitle: 'Issue #2',
            issueDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
          }
        ]}
        projectDesc={'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'}
        projectName={'Project One'}
        projectTags={['one']}
        projectType={'web'}
        resourceId={'1234'}
        teamName={'blah'}
        visible={modalVisible}
      />
    </div>
  )
}

export default App

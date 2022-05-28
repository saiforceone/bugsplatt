import { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'
import LoginButton from './components/shared/LoginButton';
import LogoutButton from './components/shared/LogoutButton';
import { ProjectModal } from './components/Modals/ProjectModal/ProjectModal';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();

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

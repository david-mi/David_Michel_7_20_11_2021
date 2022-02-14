import { useContext } from 'react';
import axios from 'axios';

import { refreshData } from '../../Context/loginContext';

import { DislikeIcon } from '../../icons-logos/icons';

const apiMessage = 'http://localhost:3000/api/messages';

function MessageDislike(props) {

  const { USER_ID, token } = JSON.parse(localStorage.getItem('payload'));
  const { showDislikeUsers, setShowDislikeUsers, dislikeList, messageId } = props.data;

  const { refreshToogle, setRefreshToogle } = useContext(refreshData);

  const hasDisliked = () => {
    if (!dislikeList.length) return false;
    return dislikeList.find(({ User }) => User.userLiked == USER_ID);
  };

  const sendDislike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    const dislike = await axios.post(`${apiMessage}/${messageId}/dislike`, null, { headers });
    console.log(dislike.data.message);
    setRefreshToogle((e) => !e);
  };

  return (
    <div className='dislike-container'>
      <span className='dislike-btn' onClick={sendDislike}><DislikeIcon hasDisliked={hasDisliked} /></span>
      <span className='dislikeNb'
        onMouseOver={() => setShowDislikeUsers(true)}
        onMouseLeave={() => setShowDislikeUsers(false)}>
        {dislikeList.length}
      </span>
      {showDislikeUsers && dislikeList.length
        ? (
          <ul className='disliked-list'>
            {dislikeList.map(({ User }, idx) => (
              <li key={idx}>
                {User.firstname} {User.lastname} ({User.username})
              </li>
            ))}
          </ul>
        )
        : null
      }
    </div>
  );
}

export default MessageDislike;
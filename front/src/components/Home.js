// LIBRARIES
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from "react-jwt";

// CONTEXT
import { loginContext, refreshData } from '../Context/loginContext';

// PAGES & COMPONENTS
import Header from '../pages/Header';
import Title from '../pages/Title';
import MessagesInfos from './Messages/MessagesInfos';
import MessagePost from './Messages/MessagePost';

const apiMessage = 'http://localhost:3000/api/messages';

const Home = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);

  const [messages, setMessages] = useState(null);
  const [refreshToogle, setRefreshToogle] = useState(false);

  const getMessages = async () => {
    const { token } = JSON.parse(localStorage.getItem('payload'));
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await axios.get(apiMessage + '/all', { headers });
    const data = res.data;
    setMessages(data);
    console.log('mdr');
  };

  useEffect(getMessages, [refreshToogle]);


  return (
    <>
      <Header />
      <Title name="Accueil" />
      <refreshData.Provider value={{ refreshToogle, setRefreshToogle }}>
        <MessagePost />
        <div className='messages__container container slide'>
          {messages
            ? messages
              .sort((prev, next) => next.id - prev.id)
              .map((msg, idx) => <MessagesInfos data={msg} key={idx} />)
            : <p>Aucun message à afficher pour le moment</p>
          }
        </div>
      </refreshData.Provider>
    </>
  );
};

export default Home;

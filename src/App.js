import './App.css';
import Modal from './components/modalWindow/ModalWindow';
import { useState } from 'react';
import { getToken,} from './http/index'
import Body from './components/body/Body'
import logo from './pycel.png'


function App() {
  getToken()

  const [modalActiv, setModalActive] = useState(false);
  return (    
    <div>            
      <div id="navbar">
        <a onClick={() => setModalActive(true)}>БОТ для поиска сообщений из БАРС</a>
       <img className='img' src={logo}/>
      </div>
      <Body/>
      <div className='footer'>
        <p>Разработчик Садыков Руслан Разимович</p>
        <p>2023 г</p>        
        </div>
      <Modal key={1} activ={modalActiv} setActiv={setModalActive} />
    </div>
  );
}

export default App;

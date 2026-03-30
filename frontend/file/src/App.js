
import './App.css';
import{Route, Routes}from 'react-router-dom'
import Signin from './components/Signin';
import Chat from './components/Chat';


function App() {
  return (
   
  
  <Routes>
    <Route path="/" Component={Signin} exact/>
    <Route path="/chat" Component={Chat} exact/>

    </Routes>
  
  

  
  );
}

export default App;

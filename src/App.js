import './index.css';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import { useState } from 'react';

function App() {
  const [screen1, setScreen1]=useState(true);
  const[coinName, setCoinName]=useState('');
  
  const handleClick1=(name)=>{
    setScreen1(false);
    setCoinName(name)
   }

   const handleClick2=()=>{
    setScreen1(true);
   }

  
  return (
   
    <div className="App">
      {(screen1===true) ? <Screen1 handleClick1={handleClick1}/> : <Screen2 handleClick2={handleClick2} name={coinName}/>}
  </div>
  );
}

export default App;

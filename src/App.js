import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Popup from './components/Popup';

function App() {
  const [name, setName] = useState('');
  const [animal, setAnimal] = useState('');
  const [fact, setFact] = useState('');
  const [currentPopup, setCurrentPopup] = useState(1);

  const handleConfirm = () => {
    if (currentPopup < 3) {
      setTimeout(() => {
        setCurrentPopup(currentPopup + 1);
      }, 500);
    } else {
      // All popups complete, proceed to 'About Me' page logic
    }
  };
  

  return (
      <>
      <ThreeBackground />
    <div className="container vh-100" style={{ border: '0px solid blue' }}>
      <div className="row d-flex h-100 justify-content-center align-content-center" style={{ border: '0px solid red' }}>
        <div className="justify-content-center align-items-end d-flex" style={{ border: '0px solid green' }}>
          <Popup
            title="What's your name?"
            isOpen={currentPopup === 1}
            onClose={() => setCurrentPopup(0)}
            onConfirm={handleConfirm}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </Popup>

          <Popup
            title="What's your favorite animal?"
            isOpen={currentPopup === 2}
            onClose={() => setCurrentPopup(1)}
            onConfirm={handleConfirm}>
            <input value={animal} onChange={(e) => setAnimal(e.target.value)} />
          </Popup>

          <Popup
            title="What's a fun fact about yourself?"
            isOpen={currentPopup === 3}
            onClose={() => setCurrentPopup(2)}
            onConfirm={handleConfirm}>
            <input value={fact} onChange={(e) => setFact(e.target.value)} />
          </Popup>

          {/* Render About Me page here based on the state */}
        </div>
      </div>
    </div>


    </>
  );
}

export default App;

import React from 'react';
import './App.scss';
import { ContactAddForm } from './components/ContactAddForm/ContactAddForm';

function App() {
  return (
    <div className="App">
      <div className="contacts">
        <div className="container">
          <div className="contacts__title">
              Contacts
          </div>
          <ContactAddForm />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.scss';
import { ContactAddForm } from './components/ContactAddForm/ContactAddForm';

function App() {
  return (
    <div className="App">
      <div className="contacts">
        <div className="container">
          <div className="contacts__header header">
            <h1 className="header__title">
              Contacts
            </h1>
            <ContactAddForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

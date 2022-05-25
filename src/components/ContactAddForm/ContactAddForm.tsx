import React, { useEffect, useState } from 'react'
import { Contact } from '../../types';
import './ContactAddForm.scss';

export const ContactAddForm: React.FC = React.memo(() => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts') || '[]'));
  const [toggledInput, setToggledInput] = useState(false);
  const [nameFromInput, setNameFromInput] = useState('');
  const [phoneFromInput, setPhoneFromInput] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const contact: Contact = {
      id: +new Date(),
      name: nameFromInput,
      phoneNumber: phoneFromInput
    };

    if(nameFromInput && phoneFromInput) {
      setNameFromInput('');
      setPhoneFromInput('');
    }

    setContacts([...contacts, contact]);
    setToggledInput(false);
  }

  return (
    <>
      <div
        className='header__add'
        onClick={() => setToggledInput(true)}
      >
        {!toggledInput &&
          <p className='header__add-text'>Add Contact</p>
        }
      </div>
      {toggledInput && (
        <form 
          className='header__form'
          onSubmit={addContact}
        >
          <input
            className='header__name'
            type="text"
            placeholder="Name"
            value={nameFromInput}
            onChange={(e) => setNameFromInput(e.target.value)}
            required={true}
          />
          <input
            className='header__phone'
            type="text"
            placeholder="Phone number"
            value={phoneFromInput}
            onChange={(e) => setPhoneFromInput(e.target.value)}
            required={true}
          />
          <div className="header__buttons">
            <button
              onClick={() => setToggledInput(false)}
              className='header__button'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='header__button'
            >
              Add
            </button>
          </div>
        </form>
      )}
    </>
  )
})

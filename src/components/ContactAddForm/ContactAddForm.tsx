import React, { useEffect, useState } from 'react'
import { Contact } from '../../types';
import { ContactsList } from '../ContactsList/ContactsList';

export const ContactAddForm: React.FC = React.memo(() => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts') || '[]'));
  const [toggledInput, setToggledInput] = useState(false);
  const [nameFromInput, setNameFromInput] = useState('');
  const [phoneFromInput, setPhoneFromInput] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

    if (nameFromInput && phoneFromInput) {
      setNameFromInput('');
      setPhoneFromInput('');
    }

    setContacts([...contacts, contact]);
    setToggledInput(false);
  }

  const updateContact = (newName: string, newPhone: string, id: number) => {
    setContacts(
      contacts.map((item: Contact) => {
        if (item.id === id) {
          return {
            ...item,
            name: newName,
            phoneNumber: newPhone,
          };
        }

        return item;
      }),
    );
  };

  return (
    <>
      <div
        className='contacts__add'
        onClick={() => setToggledInput(true)}
      >
        {!toggledInput &&
          <p className='contacts__add-text'>Add Contact</p>
        }
      </div>
      {toggledInput && (
        <form
          className='contacts__form'
          onSubmit={addContact}
        >
          <input
            className='contacts__input'
            type="text"
            placeholder="Name"
            value={nameFromInput}
            onChange={(e) => setNameFromInput(e.target.value)}
            required={true}
          />
          <input
            className='contacts__input'
            type="text"
            placeholder="Phone number"
            value={phoneFromInput}
            onChange={(e) => setPhoneFromInput(e.target.value)}
            required={true}
          />
          <div className="contacts__buttons">
            <button
              type='submit'
              className='contacts__button'
            >
              Add
            </button>
            <button
              onClick={() => setToggledInput(false)}
              className='contacts__button'
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <ContactsList constacts={contacts} saveChanges={updateContact} selectId={setSelectedId}/>
    </>
  )
})

import React, { useState } from 'react'
import { Contact } from '../../types';

type Props = {
  contacts: Contact[];
  saveChanges: (newName: string, newPhone: string, id: number | null) => void;
  deleteContact: (id: number | null) => void;
}

export const ContactsList: React.FC<Props> = React.memo((
  {
    contacts,
    saveChanges,
    deleteContact,
  }
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempPhone, setTempPhone] = useState('');

  const handleEditClick = (id: number, name: string, phone: string) => {
    setIsEditing(true);
    setSelectedId(id);
    setTempName(name);
    setTempPhone(phone);
  }

  const cancelEdit = () => {
    setIsEditing(false);
    setTempName('');
    setTempPhone('');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, newName: string, newPhone: string, id: number | null) => {
    event.preventDefault();

    saveChanges(newName, newPhone, id);

    setTempName('');
    setTempPhone('');
    setIsEditing(false);
  }

  return (
    <>
      {!contacts.length && (
        <p className='contacts__empty'>No Contacts yet</p>
      )}
      <ul className='contacts__list'>
        {contacts.map((item) => (
          <li
            key={item.id}
            className='contacts__item'
          >
            <p className='contacts__name'>
              <b>Name:</b> {item.name}
            </p>
            <p className='contacts__phone'>
              <b>Phone:</b> {item.phoneNumber}
            </p>
            <div className="buttons-wrapper">
              <button
                className='contacts__button'
                onClick={() => handleEditClick(item.id, item.name, item.phoneNumber)}
              >
                Edit
              </button>
              <button
                className='contacts__button'
                onClick={() => deleteContact(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isEditing && (
        <form className="contacts__edit-form" onSubmit={(e) => handleSubmit(e, tempName, tempPhone, selectedId)}>
          <input
            type="text"
            className='contacts__edit-input'
            placeholder='Name'
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            required={true}
          />
          <input
            type="text"
            className='contacts__edit-input'
            placeholder='Number'
            value={tempPhone}
            onChange={(e) => setTempPhone(e.target.value)}
            required={true}
          />
          <div className="buttons-wrapper">
            <button
              className='contacts__edit-cancel'
              onClick={() => cancelEdit()}
            >
              Cancel
            </button>
            <button
              className='contacts__edit-save'
              type='submit'
            >
              Save
            </button>
          </div>
        </form>
      )}
    </>
  )
});

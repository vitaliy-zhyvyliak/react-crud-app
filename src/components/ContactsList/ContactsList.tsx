import React, { useState } from 'react'
import { Contact } from '../../types';

type Props = {
  constacts: Contact[];
  saveChanges: (newName: string, newPhone: string, id: number | null) => void;
  deleteContact: (id: number | null) => void;
}

export const ContactsList: React.FC<Props> = React.memo((
  {
    constacts,
    saveChanges,
    deleteContact,
  }
) => {
  const [tempName, setTempName] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);


  const handleEditClick = (id: number) => {
    setIsEditing(true);
    setSelectedId(id);
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
      <ul className='contacts__list'>
        {constacts.map((item) => (
          <li
            key={item.id}
            className='contacts__item'
          >
            <p className='contacts__name'>
              {item.name}
            </p>
            <p className='contacts__phone'>
              {item.phoneNumber}
            </p>
            <div className="buttons-wrapper">
              <button
                className='contacts__edit'
                onClick={() => handleEditClick(item.id)}
              >
                Edit
              </button>
              <button
                className='contacts__delete'
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
            <button className='contacts__edit-cancel' onClick={() => setIsEditing(false)}>Cancel</button>
            <button className='contacts__edit-save' type='submit'>Save</button>
          </div>
        </form>
      )}
    </>
  )
});

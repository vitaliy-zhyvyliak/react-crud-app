import React, { useState } from 'react'
import { Contact } from '../../types';

type Props = {
  constacts: Contact[];
  saveChanges: (newName: string, newPhone: string, id: number) => void;
  selectId: (id: number) => void;
}

export const ContactsList: React.FC<Props> = React.memo((
  {
    constacts,
    saveChanges,
    selectId,
  }
) => {
  const [tempName, setTempName] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (id: number) => {
    setIsEditing(true);
    selectId(id);
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
            <button
              className='contacts__edit'
              onClick={() => handleEditClick(item.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {isEditing && (
        <div className="contacts__edit-form">
          <input type="text" className='contacts__edit-input' placeholder='Name'/>
          <input type="text" className='contacts__edit-input' placeholder='Number'/>
        </div>
      )}
    </>
  )
});

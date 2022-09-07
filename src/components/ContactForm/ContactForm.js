import { useState } from 'react';
import { useAddContactMutation } from 'Redux/contacts/contactsApi';
import { useFetchContactsQuery } from 'Redux/contacts/contactsApi';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const { data } = useFetchContactsQuery();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact, { isLoading }] = useAddContactMutation();

  const onSubmitForm = async e => {
    e.preventDefault();
    if (
      data.find(contact => contact.name?.toLowerCase() === name?.toLowerCase())
    ) {
      return;
    }
    await addContact({ name, phone });
    setName('');
    setPhone('');
  };

  return (
    <form className={s.form} onSubmit={onSubmitForm}>
      <label className={s.label}>
        Name
        <input
          onChange={e => setName(e.target.value)}
          type="text"
          name="name"
          value={name}
          placeholder="Name Lastname"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          onChange={e => setPhone(e.target.value)}
          type="tel"
          name="number"
          value={phone}
          placeholder="XXX-XX-XX"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <div>
        <button type="submit" disabled={isLoading}>
          Add contact
        </button>
      </div>
    </form>
  );
}

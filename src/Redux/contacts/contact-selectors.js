export const getFilter = state => state.contact.filter;
export const getContacts = state => state.contact.items;
export const getVisibleContacts = state =>
   getContacts(state).filter(contact =>
      contact.name.toLowerCase().includes(getFilter(state).toLocaleLowerCase())
   );

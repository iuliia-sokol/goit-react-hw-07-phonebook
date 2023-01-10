import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import Notiflix from 'notiflix';
import { notifySettings } from '../utils/notifySettings';
import { defaultContacts } from '../utils/defaultContacts';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: defaultContacts,
    isLoading: false,
    error: null,
  },
  reducers: {
    // addContact: (state, { payload }) => {
    //   const { name, number } = payload;
    //   const id = nanoid();
    // const includesName = state.find(
    //   contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    // );
    // if (includesName) {
    //   return Notiflix.Notify.warning(
    //     `${name} is already in contacts`,
    //     notifySettings
    //   );
    //   } else {
    //     const contact = { id, name, number };
    //     state.push(contact);
    // Notiflix.Notify.success(
    //   `${name} was successfully added to your contacts`,
    //   notifySettings
    //     );
    //   }
    // },
    // removeContact: (state, { payload }) => {
    //   // console.log(payload);
    //   const { name, id } = payload;
    // Notiflix.Notify.info(
    //   `${name} was successfully deleted from your contacts`,
    //   notifySettings
    // );
    //   return state.filter(contact => contact.id !== id);
    // },
  },

  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },
    [fetchContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [addContact.pending]: state => {
      state.isLoading = true;
    },
    [addContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(payload);
      Notiflix.Notify.success(
        `${payload.name} was successfully added to your contacts`,
        notifySettings
      );
    },
    [addContact.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [deleteContact.pending]: state => {
      state.isLoading = true;
    },
    [deleteContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(item => item.id !== payload);
      Notiflix.Notify.info(
        `${payload.name} was successfully deleted from your contacts`,
        notifySettings
      );
    },
    [deleteContact.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

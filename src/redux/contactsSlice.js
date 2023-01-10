import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import Notiflix from 'notiflix';
import { notifySettings } from '../utils/notifySettings';
// import { defaultContacts } from '../utils/defaultContacts';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(fetchContacts.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(addContact.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addContact.fulfilled, (state, { payload }) => {
      state.items.push(payload);
      state.isLoading = false;
      state.error = null;
      Notiflix.Notify.success(
        `${payload.name} was successfully added to your contacts`,
        notifySettings
      );
    });

    builder.addCase(addContact.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
    builder.addCase(deleteContact.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state, { payload }) => {
      state.items = state.items.filter(contact => contact.id !== payload);
      state.isLoading = false;
      state.error = null;
      Notiflix.Notify.info(
        `${payload.name} was successfully deleted from your contacts`,
        notifySettings
      );
    });

    builder.addCase(deleteContact.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setloading: () => { },
    contacts: [],
    setContacts: {},
    filteredContacts: [],
    groups: [],
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    contactSearch: () => { },
    // errors: [],
    // setErrors: () => { }
});
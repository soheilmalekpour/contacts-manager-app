import "./App.css";
import _ from "lodash";
import { useImmer } from 'use-immer';
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { AddContact, Contacts, EditContact, Navbar, ViewContact } from "./components/Index";
import { createContact, deleteContact, getAllContacts, getAllGroups, updateContact } from "./services/contactService";
import { confirmAlert } from "react-confirm-alert";
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "./helpers/colors";
import { ContactContext } from "./context/contactContext";
import { ToastContainer, toast } from 'react-toastify';
import { contactSchema } from "./validations/contactValidation";

const App = () => {

  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [groups, setGroups] = useImmer([]);
  // const [errors, setErrors] = useImmer([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        // setContacts(contactsData.filter((contact) => {
        //   let q = searchParams.get('q');
        //   if (!q) return true;
        //   return contact.fullname.toLowerCase().includes(q.toLowerCase())
        //     ||
        //     contact.email.toLowerCase().includes(q.toLowerCase())
        //     ||
        //     contact.job.toLowerCase().includes(q.toLowerCase())
        //     ||
        //     contact.mobile.toLowerCase().includes(q.toLowerCase());
        // }));
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      }
      catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    }

    fetchData();
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((draft) => !draft);
      // await contactSchema.validate(contact, { abortEarly: false });
      const { status, data } = await createContact(values);
      if (status === 201) {
        setContacts(draft => { draft.push(data) });
        setFilteredContacts(draft => { draft.push(data) });

        // setErrors({});
        setLoading((draft) => !draft);
        toast.success("مخاطب با موفقیت ساخته شد");
        navigate('/contacts');
      }
    }
    catch (err) {
      // console.error(err.inner);
      // setErrors(err.inner);
      setLoading((draft) => !draft);
    }
  }

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: '1em',
            }}
            className="p-4">
            <h1 style={{ color: YELLOW }}>حذف مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              آیا از حذف مخاطب {contactFullname} اطمینان داری؟
            </p>
            <button onClick={() => {
              removeContact(contactId);
              onClose();
            }}
              className="btn mx-2"
              style={{ background: PURPLE }}>
              بله، حذف کن
            </button>
            <button onClick={onClose} className="btn" style={{ backgroundColor: COMMENT }}>
              انصراف
            </button>
          </div>
        );
      }
    })
  }

  const removeContact = async (contactId) => {
    const contactsCopy = [...contacts];
    try {
      setLoading(true);

      setContacts(draft => draft.filter(c => c.id != contactId))
      setFilteredContacts(draft => draft.filter(c => c.id != contactId))

      const { status } = await deleteContact(contactId);

      if (status != 200) {
        setContacts(contactsCopy);
        setFilteredContacts(contactsCopy);
      }
      toast.success("مخاطب با موفقیت حذف شد");
      setLoading(false);
    }
    catch (err) {
      console.error(err);
      setContacts(contactsCopy);
      setFilteredContacts(contactsCopy);
      setLoading(false);
    }
  }

  const contactSearch = _.debounce((q) => {
    if (!q) return setFilteredContacts([...contacts]);

    setFilteredContacts(draft =>
      draft.filter((c) => {
        return c.fullname.toLowerCase().includes(q.toLowerCase())
          ||
          c.email.toLowerCase().includes(q.toLowerCase())
          ||
          c.job.toLowerCase().includes(q.toLowerCase())
          ||
          c.mobile.toLowerCase().includes(q.toLowerCase());
      }));
  }, 1000);

  // const contactSearch = _.debounce((q) => {
  //   setFilteredContacts(contacts.filter((contact) => {
  //     return contact.fullname.toLowerCase().includes(q.toLowerCase())
  //       ||
  //       contact.email.toLowerCase().includes(q.toLowerCase())
  //       ||
  //       contact.job.toLowerCase().includes(q.toLowerCase())
  //       ||
  //       contact.mobile.toLowerCase().includes(q.toLowerCase());
  //   }));
  // }, 1000);

  // let filterTimeout;
  // const contactSearch = (q) => {
  //   clearTimeout(filterTimeout);
  //   filterTimeout = setTimeout(() => {
  //     setFilteredContacts(contacts.filter((contact) => {
  //       return contact.fullname.toLowerCase().includes(q.toLowerCase())
  //         ||
  //         contact.email.toLowerCase().includes(q.toLowerCase())
  //         ||
  //         contact.job.toLowerCase().includes(q.toLowerCase())
  //         ||
  //         contact.mobile.toLowerCase().includes(q.toLowerCase());
  //     }));
  //   }, 1000);
  // }

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contacts,
      setContacts,
      filteredContacts,
      setFilteredContacts,
      groups,
      updateContact,
      // errors,
      // setErrors,
      contactSearch,
      deleteContact: confirmDelete,
      createContact: createContactForm
    }}>
      <div className="App">
        <ToastContainer rtl="true" position="bottom-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={'/contacts'} />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;

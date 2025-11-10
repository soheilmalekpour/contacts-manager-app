import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Spinner from "../Spinner";
import { Contact } from "../Index";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
// import NotFound from '../../assets/no-found.gif';

const Contacts = () => {

  const { loading, filteredContacts, deleteContact } = useContext(ContactContext);

  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 text-end pt-4">
                <Link to='/contacts/add' className="btn mx-2" style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? <Spinner /> : (
        <section className="container">
          <div className="row">
            {/* Contact */}
            {filteredContacts.length > 0 ? filteredContacts.map(c => (<Contact
              key={c.id}
              contact={c}
              deleteContact={() => deleteContact(c.id, c.fullname)}
            // deleteContact={deleteContact}
            />)) : (
              <div className="text-center py-5" style={{ backgroundColor: CURRENTLINE }}>
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطب یافت نشد
                </p>
                {/* <img src={NotFound} alt="یافت نشد" className="w-25" /> */}
                <img src={require('../../assets/no-found.gif')} alt="یافت نشد" className="w-25" />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;

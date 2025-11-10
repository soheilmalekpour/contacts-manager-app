import { useSearchParams } from "react-router-dom";
import { PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const SearchContact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { contactSearch } = useContext(ContactContext);

  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
        // value={searchParams.get('q')}
        // onChange={(event) => {
        //   let q = event.target.value;
        //   if (q) {
        //     setSearchParams({ q });
        //   }
        //   else {
        //     setSearchParams({});
        //   }
        // }}
        onChange={e => contactSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchContact;

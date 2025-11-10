import { useImmer } from "use-immer";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    getContact,
    updateContact,
} from "../../services/contactService";
import { Spinner } from "../Index";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { ContactContext } from "../../context/contactContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { toast } from "react-toastify";

const EditContact = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const { contacts, setContacts, setFilteredContacts, loading, setLoading, groups } = useContext(ContactContext);

    const [contact, setContact] = useImmer({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                setContact(contactData);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // const submitForm = async (event) => {
    //     event.preventDefault();
    //     const allContacts = [...contacts];
    //     try {
    //         setLoading(true);
    //         const contactIndex = allContacts.findIndex(c => c.id == contactId);
    //         allContacts[contactIndex] = { ...contact };
    //         setContacts(allContacts);
    //         setFilteredContacts(allContacts);
    //         const { data, status } = await updateContact(contact, contactId);
    //         if (status === 200) {
    //             setLoading(false);
    //             navigate("/contacts");
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         setContacts(allContacts);
    //         setLoading(false);
    //     }
    // };

    const submitForm = async (values) => {
        try {
            setLoading(true);

            const { data, status } = await updateContact(values, contactId);

            if (status === 200) {
                setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id == contactId);
                    draft[contactIndex] = { ...data };
                });
                setFilteredContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id == contactId);
                    draft[contactIndex] = { ...data };
                });
                setLoading(false);
                toast.success("مخاطب با موفقیت ویرایش شد");
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{ color: ORANGE }}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: ORANGE }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                            >
                                <div className="col-md-8">
                                    <Formik
                                        initialValues={contact}
                                        validationSchema={contactSchema}
                                        onSubmit={values => {
                                            submitForm(values);
                                        }}>

                                        <Form>
                                            <div className="mb-2">
                                                <Field
                                                    name="fullname"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="نام و نام خانوادگی"
                                                />
                                                <ErrorMessage component="div" className="text-info text-end small" name="fullname" />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="photo"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="آدرس تصویر"
                                                />
                                                <ErrorMessage component="div" className="text-info text-end small" name="photo" />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="mobile"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="شماره موبایل"
                                                />
                                                <ErrorMessage component="div" className="text-info text-end small" name="mobile" />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="آدرس ایمیل"
                                                />
                                                <ErrorMessage component="div" className="text-info text-end small" name="email" />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="job"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="شغل"
                                                />
                                                <ErrorMessage component="div" className="text-info text-end small" name="job" />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    as="select"
                                                    name="group"
                                                    className="form-control">
                                                    {groups.length > 0 && groups.map((group) => (<option key={group.id} value={group.id}>{group.name}</option>))}
                                                </Field>
                                                <ErrorMessage component="div" className="text-info text-end small" name="group" />
                                            </div>
                                            <div className="mx-2">
                                                <Field
                                                    type="submit"
                                                    className="btn"
                                                    style={{ backgroundColor: PURPLE }}
                                                    value="ثبت مخاطب"
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{ backgroundColor: COMMENT }}
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{ border: `1px solid ${PURPLE}` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/man-taking-note.png")}
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;

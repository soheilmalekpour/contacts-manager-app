import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { contactSchema } from "../../validations/contactValidation";
import { Spinner } from "../Index";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { useContext, useEffect } from "react";
import { ContactContext } from "../../context/contactContext";

const AddContact = () => {

    const { loading, groups, createContact } = useContext(ContactContext);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <img
                            src={require("../../assets/man-taking-note.png")}
                            height="400px"
                            style={{
                                position: "absolute",
                                zIndex: "-1",
                                top: "130px",
                                left: "100px",
                                opacity: "50%",
                            }}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p
                                        className="h4 fw-bold text-center"
                                        style={{ color: GREEN }}
                                    >
                                        ساخت مخاطب جدید
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: GREEN }} />
                            <div className="row mt-5">
                                <div className="col-md-4">

                                    {/* {errors?.map((err, i) => (
                                        <p key={i} className="text-info">{err.message}</p>
                                    ))} */}

                                    <Formik
                                        initialValues={{
                                            fullname: '',
                                            photo: '',
                                            mobile: '',
                                            email: '',
                                            job: '',
                                            group: ''
                                        }}
                                        validationSchema={contactSchema}
                                        onSubmit={values => {
                                            createContact(values);
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
                                                    <option value="" disabled selected>انتخاب گروه</option>
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
                            </div>
                        </div>
                    </section>
                </>
            )
            }
        </>
    );
};

export default AddContact;

import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("نام و نام خانوادگی الزامی میباشد."),
    photo: Yup.string().required('تصویر مخاطب الزامی میباشد.').url("آدرس معتبر نیست."),
    mobile: Yup.number().required('شماره تلفن الزامی میباشد'),
    email: Yup.string().email('فرمت ایمیل معتبر نیست.').required('ایمیل مخاطب الزامی میباشد.'),
    job: Yup.string().nullable(),
    group: Yup.string().required('انتخاب گروه الزامی میباشد')
});
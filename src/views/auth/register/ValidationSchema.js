import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must be no more than 50 characters')
        .required('Username is required'),
    pregnancyDate: Yup.date()
        .required('Pregnancy date is required')
        .max(new Date(), 'Pregnancy date cannot be in the future'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export const initialValues = {
    username: '',
    pregnancyDate: '',
    email: '',
    password: '',
};
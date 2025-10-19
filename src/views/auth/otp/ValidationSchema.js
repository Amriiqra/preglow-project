import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    verificationCode: Yup.string()
        .length(4, 'Verification code must be exactly 4 digits')
        .required('Verification code is required'),
});

export const initialValues = {
    verificationCode: '',
};
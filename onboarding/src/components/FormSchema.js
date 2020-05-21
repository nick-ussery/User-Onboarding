import * as yup from 'yup';



const FormSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(3, 'The username must be at least 3 characters long')
        .required('Username is required'),
    email: yup.string()
        .email()
        .trim()
        .required(),
    password: yup.string()
        .trim()
        .required()
        .min(6, "Minimum password length is 6 characters"),
    termsOfService: yup.bool()
        .required()
})

export default FormSchema
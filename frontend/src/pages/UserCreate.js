import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  id: Yup.number()
    .required('Required'),
  age: Yup.number()
    .required('Required'),
  nationality: Yup.string()
    .required()
});

export const UserCreate = ({ onUserAdd }) => {
  return (
    <Formik
      initialValues={{ id: '', firsName: '', lastName: '', nationality: '', age: '' }}
      validationSchema={UserSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users`, values);
          resetForm({});
          onUserAdd(data.user);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field name="id" placeholder="ID" />
            <ErrorMessage name="id" component="div" />
          </div>
          <Field name="firstName" placeholder="First Name" />
          <ErrorMessage name="firstName" component="div" />
          <Field name="lastName" placeholder="Last Name" />
          <ErrorMessage name="lastName" component="div" />
          <div>
            <Field name="age" placeholder="Age" />
            <ErrorMessage name="age" component="div" />
            <Field name="nationality" placeholder="Nationality" />
            <ErrorMessage name="nationality" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
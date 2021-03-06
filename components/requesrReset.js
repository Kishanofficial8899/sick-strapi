import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const FORGOT_PASSWORD = gql`
  mutation UPDATE_PRODUCT_MUTATION($email: String!) {
     forgotPassword(email:$email){
        ok
     }
  }
`;

export default function RequestReset() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });
    const [forgotPassword, { data, loading,error}] = useMutation(
        FORGOT_PASSWORD,
        {
            variables: inputs,
        }
    );
    async function handleSubmit(e) {
        e.preventDefault(); // stop the form from submitting
         await forgotPassword().catch(console.error);
        resetForm();
    }
    
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request a Password Reset</h2>
            <Error error={error} />
            <fieldset>
                {loading &&  (
                    <p>Loading...</p>
                )}
                {data?.forgotPassword?.ok && (
                    <p>Success! Check your email for a link!</p>
                )}

                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        required
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request Reset!</button>
            </fieldset>
        </Form>
    );
}
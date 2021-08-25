import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Cookie from "js-cookie";
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(input:{email:$email,username:$username,password:$password}) {
        jwt
        user{
           email,
        }
      }
  }
`;

export default function Signup() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        username: '',
        password: '',
    });
    const [register, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
    });
    async function handleSubmit(e) {
        e.preventDefault();
        await register().catch(console.error);    
        resetForm();
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up For an Account</h2>
            <Error error={error} />
            <fieldset>
                {data?.register && (
                    <p>
                        Signed up with {data?.register?.user?.email} - Please Go Head and Sign in!
                    </p>
                )}
                <label htmlFor="email">
                    Your Name
                    <input
                        type="text"
                        name="username"
                        placeholder="Your Name"
                        autoComplete="username"
                        value={inputs.username}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign In!</button>
            </fieldset>
        </Form>
    );
}

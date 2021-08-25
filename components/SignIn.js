import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Cookie from "js-cookie";
import Error from './ErrorMessage'
import Router from "next/router";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($identifier: String!, $password: String!) {
      login(input: { identifier: $identifier, password: $password }) {
         jwt,
      }
  }
`;

export default function SignIn() {
    const { inputs, handleChange, resetForm } = useForm({
        identifier: '',
        password: '',
    });
    
    const [login, { data, loading,error}] = useMutation(SIGNIN_MUTATION, {
        variables: {
            identifier: inputs.identifier,
            password: inputs.password
        },
    });
    async function handleSubmit(e) {
        e.preventDefault(); // stop the form from submitting
        try {
            const res = await login()
            if (res) {
                console.log(res)
                Cookie.set("token", res.data.login.jwt);
                Router.push("/");
            }
        } catch {
            console.log("error")
        }
        resetForm();
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            <Error error={error} />
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input
                        type="identifier"
                        name="identifier"
                        placeholder="Your Email Address"
                        autoComplete="identifier"
                        value={inputs.identifier}
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
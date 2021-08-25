import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { useState } from 'react';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($password: String!,$passwordConfirmation: String!,$code:String!) {
     resetPassword(password:$password,passwordConfirmation:$passwordConfirmation,code:$code){
      jwt,
      user{
        username
      }
    }
  }
`;

export default function ResetPassword({ code }) {
    const { inputs, handleChange, resetForm } = useForm({
        password: '',
        passwordConfirmation: '',
        code,
    });
    const [resetPassword, { data, loading, error }] = useMutation(RESET_MUTATION, {
        variables: inputs,
    }); 

    async function handleSubmit(e) {    
        e.preventDefault();
        await resetPassword().catch(console.error);
        resetForm();
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <Error error={error} />
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && (
                    <p>Success! You can Now sign in</p>
                )}
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
                <label htmlFor="password">
                    ConfirmationPassword
                    <input
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Password"
                        autoComplete="passwordConfirmation"
                        value={inputs.passwordConfirmation}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request Reset!</button>
            </fieldset>
        </Form>
    );
}
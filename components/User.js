import { gql, useQuery } from '@apollo/client';
import Cookie from 'js-cookie'


export const CURRENT_USER_QUERY = gql`
    query {
        me {
         username
        }
    }
`;

export function useUser() {
    const token = Cookie.get("token");
    const { data } = useQuery(CURRENT_USER_QUERY, {
        context: {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    })
    console.log(">>>check",data)
    return data;
}
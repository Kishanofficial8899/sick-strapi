import { useMutation } from '@apollo/client';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import gql from 'graphql-tag'; 
import {ALL_PRODUCTS_QUERY} from './Products'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
     deleteProduct(input: { where: { id: $id } }) {
        product {
          Name
          Price,
          id
        }
      }
  }
`;

function update(cache,payload) {
    cache.evict(cache.identify(payload.data.deleteProduct.product));
}
export default function DeleteProduct({ id, children }) {
    const [deleteProduct, { loading }] = useMutation(
        DELETE_PRODUCT_MUTATION,
        {
            variables: { id },
            update: update
        }
    );
    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => {
                if (confirm('Are you sure you want to delete this item?')) {
                    deleteProduct().catch((err) => alert(err));
                }
            }}
        >
            {children}
        </button>
    );
}
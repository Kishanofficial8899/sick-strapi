import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { ALL_PRODUCTS_QUERY} from './Products'


const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
   product(id:$id){
    Price,
    Name,
    Image{
        url,
        alternativeText
    },
    Descriptions
  }
}
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
        input: {
          where: { id: $id }
          data: { Name: $name, Price:$price,Descriptions:$description}
        }
    ) {
      product{
        Name
        Descriptions
        Price
      }
    }
  }
`;

export default function UpdateProduct({ id }) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
        variables: {
             id,  
        },
    });
    const [
        updateProduct,
        { data: updateData, error: updateError, loading: updateLoading },
    ] = useMutation(UPDATE_PRODUCT_MUTATION, {
        refetchQueries: [{ query: ALL_PRODUCTS_QUERY}]
    });
    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.product);
    if (loading) return <p>loading...</p>;
    return (
        <Form
            onSubmit={async (e) => {
                e.preventDefault();
                const res = await updateProduct({
                    variables: {
                        id,
                        name: inputs.Name,
                        description: inputs.Descriptions,
                        price: inputs.Price,
                    },
                }).catch(console.error);
                clearForm()
                console.log(res);
            }}
        >
            <DisplayError error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="Name"
                        placeholder="Name"
                        value={inputs.Name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="Price"
                        placeholder="price"
                        value={inputs.Price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="Descriptions"
                        placeholder="Description"
                        value={inputs.Descriptions}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Update Product</button>
            </fieldset>
        </Form>
    );
}
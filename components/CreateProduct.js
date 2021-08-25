import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { ALL_PRODUCTS_QUERY } from './Products'
import Router from 'next/router'

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        $Name: String!
        $Descriptions: String!
        $Price: Int
        $slug:String!
    ) {
        createProduct(input:{ data:{ Name: $Name,Descriptions: $Descriptions,Price:$Price,slug:$slug}}) {
            product {
                id
                Name,
                Price,
                Descriptions,
                slug,
                categories{
                    Name
                }
            }
        }
    }
`;

export default function CreateProduct() {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        Name: '',
        Price: 0,
        Descriptions: '',
        slug: "",
    });
    const [createProduct, { loading,error, data }] = useMutation(
        CREATE_PRODUCT_MUTATION,
        {
            variables: inputs,
            refetchQueries: [{ query: ALL_PRODUCTS_QUERY}]
        }
    );
   
    return (
        <Form
            onSubmit={async (e) => {
                e.preventDefault();
                const res =  await createProduct()
                clearForm();
                Router.push(`/product/${res.data.createProduct.product.id}`)
            }}
        >
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                {/* <label htmlFor="Image">
                    Image
                    <input
                        required
                        type="file"
                        id="image"
                        name="Image"
                        onChange={handleChange}
                    />
                </label> */}
                <label htmlFor="Name">
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
                <label htmlFor="Price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="Price"
                        placeholder="Price"
                        value={inputs.Price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="Descriptions">
                    Description
                    <textarea
                        id="description"
                        name="Descriptions"
                        placeholder="Description"
                        value={inputs.Descriptions}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="slug">
                    Slug
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        placeholder="Slug"
                        value={inputs.slug}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">+ Add Product</button>
            </fieldset>
        </Form>
    );
}
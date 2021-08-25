import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($limit: Int = 0, $start: Int) {
      products(limit: $limit, start: $start){
        id,
        Name,
        Image{
          url,
          id,
          alternativeText
        }
        Descriptions
      	Price,
        slug
      }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      limit: perPage,
      start: page * perPage - perPage,
      }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <ProductsListStyles>
                {data.products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </ProductsListStyles>
        </div>
    );
}
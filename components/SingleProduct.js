import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';


const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

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

export default function SingleProduct({ id }) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
        variables: {
            id,
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <DisplayError error={error} />;
    const { product } = data;
    return (
        <ProductStyles>
            <Head>
                <title>Sick Fits | {product.Name}</title>
            </Head>
            <img
                src={product.Image[0]?.url || "https://res.cloudinary.com/dxd0lzpm0/image/upload/v1629873181/m4o4qclkc2ctmitgzulc.png"}
                alt={product.Image[0]?.alternativeText}
            />
            <div className="details">
                <h2>{product.Name}</h2>
                <p>{product.Descriptions}</p>
            </div>
        </ProductStyles>
    );
}
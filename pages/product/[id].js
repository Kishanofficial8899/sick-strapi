import SingleProduct from '../../components/SingleProduct.js';

export default function SingleProductPage({ query }) {
    return <SingleProduct id={query.id} />;
}
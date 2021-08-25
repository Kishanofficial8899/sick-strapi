import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import {formatMoney} from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';

export default function Product({ product }) {
    return (
        <ItemStyles>
            <img
                src={product?.Image?.[0]?.url || "https://res.cloudinary.com/dxd0lzpm0/image/upload/v1629873181/m4o4qclkc2ctmitgzulc.png"}
                alt={product?.Image?.[0]?.alternativeText}
            />
            <Title>
                <Link href={`/product/${product.id}`}>{product.Name}</Link>
            </Title>
            <PriceTag>{formatMoney(product.Price)}</PriceTag>
            <p>{product.Descriptions}</p>
            <div className="buttonList">
                <Link
                    href={{
                        pathname: '/product/update',
                        query: {
                            id: product.id,
                        },
                    }}
                >
                    Edit ✏️
                </Link>
                <DeleteProduct id={product.id}>Delete</DeleteProduct>
            </div>
        </ItemStyles>
    );
}
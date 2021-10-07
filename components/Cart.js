import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import {formatMoney} from '../lib/formatMoney';
import { useUser } from './User';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
    const { product } = cartItem;
    if (!product) return null;
    console.log(product);
    return (
        <CartItemStyles>
            <img
                width="100"
                src={product.photo.image.publicUrlTransformed}
                alt={product.name}
            />
            <div>
                <h3>{product.name}</h3>
                <p>
                    {formatMoney(product.price * cartItem.quantity)}-
                    <em>
                        {cartItem.quantity} &times; {formatMoney(product.price)} each
                    </em>
                </p>
            </div>
        </CartItemStyles>
    );
}

export default function Cart() {
    const me = useUser();
    if (!me) return null;
    return (
        <CartStyles open>
            <header>
                <Supreme>Kishan's Cart</Supreme>
            </header>
            <ul>
                {/* {me.cart.map((cartItem) => ( */}
                    <CartItem key={2} cartItem={{}} />
                {/* ))} */}
            </ul>
            <footer>
                <p>{formatMoney(100)}</p>
                {/* <p>{formatMoney(calcTotalPrice(me.cart))}</p> */}
            </footer>
        </CartStyles>
    );
}
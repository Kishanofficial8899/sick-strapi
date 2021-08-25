import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import Cookie from 'js-cookie'
import SignOut from './Signout';
  
export default function Nav() {
  const user = useUser();
  const token = Cookie.get("token")
  const logout = () => {
    Cookie.remove("token");
    Router.push("/singin");
  };
  return (
    <NavStyles>
      {token && (
        <>
          <Link href="/products">Products</Link>
          <Link href="/sell">Sell</Link>
          <SignOut />
        </>
      )}
      {!token && (
          <>
            <Link href="/signin">Sign In</Link>
          </>
        )}        
    </NavStyles>
  );
}

import Cookies from "js-cookie";
import Router from "next/router";
export default function SignOut() {
    const logout = () => {
        Cookies.remove("token");
        Router.push("/signin");
    };
    return (
        <button type="button" onClick={logout}>
            Sign Out
        </button>
    );
}
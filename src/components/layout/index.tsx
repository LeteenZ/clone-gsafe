import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Header/Nav";

const Layout = () => {
  return (
    <>
      <div id="layout">
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

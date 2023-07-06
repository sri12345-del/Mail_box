import Mainheader from "./mainheader";

const Layout = (props) => {
  return (
    <div>
      <Mainheader></Mainheader>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;

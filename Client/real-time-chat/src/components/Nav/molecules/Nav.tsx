import Exit from "../atoms/Exit";
import Logo from "../atoms/Logo";
import Members from "../atoms/Members";
import styles from "../styles/nav.module.scss";
import { Link } from "react-router-dom";

const Nav = ({ children, noOfUsers }: any) => {
  return (
    <nav className={styles.nav}>
      <div>
        <Logo className={styles.logo} />
        {children}
      </div>
      <Members members={noOfUsers} />
      <Link to={"/"}>
        <Exit className={styles.exit} />
      </Link>
    </nav>
  );
};

export default Nav;

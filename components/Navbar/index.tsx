import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "antd";
import navs from "./config";
import Login from "components/Login";
import styles from "./index.module.scss";

const Header: NextPage = () => {
  const { pathname } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleWrite = () => {
    console.log("write");
  };

  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => {
    setIsShowLogin(false);
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>
        <div>BLOG-NEXT</div>
      </section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav.label} href={nav.path}>
            <a
              className={`${styles.navItem} ${
                pathname === nav.path ? `${styles.active}` : ""
              }`}
            >
              {nav.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button
          className={`${styles.opearateButton} ${styles.write}`}
          onClick={handleWrite}
        >
          Write
        </Button>
        <Button
          className={styles.opearateButton}
          type="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </section>
      {isShowLogin ? <Login onClose={handleClose} /> : null}
    </div>
  );
};

export default Header;

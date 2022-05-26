import { NextPage } from "next";
import Link from "next/link";
import navs from "./config";
import styles from "./index.module.scss";

const Header: NextPage = () => {
  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>
        <div>BLOG-NEXT</div>
      </section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav.label} href={nav.path}>
            <a className={styles.navItem}>{nav.label}</a>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Header;

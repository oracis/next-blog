import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import navs from "./config";
import styles from "./index.module.scss";

const Header: NextPage = () => {
  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>
        <div>BLOG-NEXT</div>
      </section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav.label} href={nav.path}>
            <a className={`${styles.navItem} ${pathname === nav.path ? `${styles.active}`  : ""}`}>{nav.label}</a>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Header;

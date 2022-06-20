import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { Avatar, Button, Dropdown, Menu, message } from "antd";
import { ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import navs from "./config";
import Login from "components/Login";
import styles from "./index.module.scss";
import { useStore } from "store";
import request from "service/request";

const Navbar = () => {
  const { pathname, push } = useRouter();
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;

  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleWrite = () => {
    if (userId) {
      push("/editor/new");
    } else {
      message.warning("Please login firstly!");
    }
  };

  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => {
    setIsShowLogin(false);
  };

  const handleGotoPersonalPage = () => {
    push(`/user/${userId}`);
  };

  const handleLogout = () => {
    request.post("/api/user/logout").then((res: any) => {
      if (res?.code === 0) {
        store.user.setUserInfo({});
      }
    });
  };

  const renderDropdownOverlay = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleGotoPersonalPage}>
          <ProfileOutlined />
          &nbsp; Profile
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          <LogoutOutlined />
          &nbsp; Logout
        </Menu.Item>
      </Menu>
    );
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
        {userId ? (
          <>
            <Dropdown overlay={renderDropdownOverlay()} placement="bottomLeft">
              <Avatar src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button
            className={styles.opearateButton}
            type="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </section>
      {isShowLogin ? <Login onClose={handleClose} /> : null}
    </div>
  );
};

export default observer(Navbar);

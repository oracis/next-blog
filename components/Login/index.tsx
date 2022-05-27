import { useState } from "react";
import styles from "./index.module.scss";

interface LoginProps {
  onClose: () => void;
}

const Login = (props: LoginProps) => {
  const { onClose } = props;
  const [form, setForm] = useState({
    phone: "",
    verifyCode: "",
  });

  const handleClose = () => {
    onClose();
  };

  const handleLogin = () => {
    console.log("click login");
  };

  return (
    <div className={styles.loginArea}>
      <div className={styles.loginContent}>
        <div className={styles.header}>
          <div className={styles.title}>Mobile Login</div>
          <div className={styles.close} onClick={handleClose}>
            X
          </div>
        </div>
        <div className={styles.phone}>
          <input
            type="text"
            name="phone"
            placeholder="Please input phone number"
            value={form.phone}
          />
        </div>
        <div className={styles.verifyCode}>
          <input
            type="text"
            name="verifyCode"
            placeholder="Verify Code"
            value={form.verifyCode}
          />
          <span>Verify Code</span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          Login
        </div>
        <div className={styles.others}>Login with Github</div>
        <div className={styles.privacyPolicy}>
          Agree When Regist
          <a href="https://juejin.cn/privacy" target="_blank">
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

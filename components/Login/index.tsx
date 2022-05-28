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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
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
        <div className={styles.loginPhone}>
          <input
            type="text"
            name="phone"
            className={styles.textInput}
            placeholder="Mobile Number"
            value={form.phone}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className={styles.verifyCode}>
          <input
            type="text"
            name="verifyCode"
            className={styles.textInput}
            placeholder="SMS Verify Code"
            autoComplete="off"
            value={form.verifyCode}
            onChange={handleChange}
          />
          <span className={styles.fetchCode}>Send Code</span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          Login
        </div>
        <div className={styles.others}>Login with Github</div>
        <div className={styles.privacyPolicy}>
          Agree When Regist
          <a className={styles.privacy} href="https://juejin.cn/privacy" target="_blank">
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { ChangeEvent, useState } from "react";
import { message } from "antd";
import request from "service/request";
import Countdown from "components/Countdown";
import styles from "./index.module.scss";

interface LoginProps {
  onClose: () => void;
}

const Login = (props: LoginProps) => {
  const { onClose } = props;
  const [form, setForm] = useState({
    phone: "",
    smsCode: "",
  });
  const [isShowCode, setIsShowCode] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleLogin = () => {
    console.log("login form", form);
    
    request
      .post("/api/user/login", {
        ...form,
        identify_type: "phone",
      })
      .then((res: any) => {
        if (res?.code === 0) {
          onClose && onClose();
        }
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSend = () => {
    if (!form?.phone) {
      message.warning("Please input mobile phone");
      return;
    }
    request
      .post("/api/user/sendCode", {
        to: form?.phone,
        templateId: 1,
      })
      .then((value: any) => {
        setIsShowCode(true);
        console.log(value);
      });
  };

  const handleCounddownEnd = () => {
    setIsShowCode(false);
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
            name="smsCode"
            className={styles.textInput}
            placeholder="SMS Verify Code"
            autoComplete="off"
            value={form.smsCode}
            onChange={handleChange}
          />
          <span className={styles.sendCode} onClick={handleSend}>
            {isShowCode ? (
              <Countdown time={10} onEnd={handleCounddownEnd} />
            ) : (
              "Send Code"
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          Login
        </div>
        <div className={styles.others}>Login with Github</div>
        <div className={styles.privacyPolicy}>
          Agree When Regist
          <a
            className={styles.privacy}
            href="https://juejin.cn/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

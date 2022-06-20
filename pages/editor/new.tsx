import { NextPage } from "next";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Input from "antd/lib/input/Input";
import { useStore } from "store";
import { Button, message } from "antd";
import styles from "./index.module.scss";
import request from "service/request";

type EditorProps = { layout: boolean } & NextPage;

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Editor: EditorProps = () => {
  const store = useStore();
  const { userId } = store.user.userInfo;
  const { push } = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (content: any) => {
    setContent(content);
  };

  const handlePublish = () => {
    request
      .post("/api/article/create", {
        title,
        content,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          userId ? push(`/user/${userId}`) : push(`/`);
          message.info("Create successfully!");
        } else {
          message.error(res?.msg || "Fail to create!");
        }
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          className={styles.title}
          placeholder="Please input title"
          value={title}
          onChange={handleChange}
        />
        <Button
          className={styles.button}
          type="primary"
          onClick={handlePublish}
        >
          Publish
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handleChangeContent} />
    </div>
  );
};

Editor.layout = false;

export default observer(Editor);

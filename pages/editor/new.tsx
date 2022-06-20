import { NextPage } from "next";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Input from "antd/lib/input/Input";
import { Button } from "antd";
import styles from "./index.module.scss";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Editor: NextPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePublish = () => {};
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
      <MDEditor value={content} height={1080} onChange={setContent} />
    </div>
  );
};

Editor.layout = false;

export default Editor;

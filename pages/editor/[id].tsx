import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "antd/lib/input/Input";
import { prepareConnection } from "db";
import { Article } from "db/entity";
import { Button, message } from "antd";
import styles from "./index.module.scss";
import request from "service/request";
import { ArticleType } from "pages/api";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface ArticleDetailProps {
  article: ArticleType;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const EditorUpdate = (props: ArticleDetailProps) => {
  const { article } = props;
  const { push } = useRouter();
  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (content: any) => {
    setContent(content);
  };

  const handleUPdate = () => {
    const articleId = article.id;
    request
      .post("/api/article/update", {
        id: articleId,
        title,
        content,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          articleId ? push(`/article/${articleId}`) : push(`/`);
          message.info("Update successfully!");
        } else {
          message.error(res?.msg || "Fail to update!");
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
        <Button className={styles.button} type="primary" onClick={handleUPdate}>
          Update
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handleChangeContent} />
    </div>
  );
};

EditorUpdate.layout = false;

export async function getServerSideProps(context: any) {
  const articleId = context?.params.id;
  const db = await prepareConnection();
  const articleRepo = db.getRepository(Article);
  const article = await articleRepo.findOne({
    where: {
      id: articleId,
    },
    relations: ["user"],
  });
  return {
    props: { article: JSON.parse(JSON.stringify(article)) },
  };
}

export default EditorUpdate;

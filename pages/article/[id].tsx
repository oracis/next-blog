import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { observer } from "mobx-react-lite";
import { format, formatDistanceToNow } from "date-fns";
import { ArticleType } from "pages/api";
import { prepareConnection } from "db";
import request from "service/request";
import { Article } from "db/entity";
import { useState } from "react";
import { useStore } from "store";
import Avatar from "antd/lib/avatar/avatar";
import styles from "./index.module.scss";
import { Button, Divider, Input, message } from "antd";
import { CommentType } from "pages/api";

interface ArticleDetailProps {
  article: ArticleType;
}

const ArticleDetail = (props: ArticleDetailProps) => {
  const store = useStore();
  const [comment, setComment] = useState("");
  const { userId } = store.user.userInfo;
  const { article } = props;
  const {
    user: { id, nickname, avatar },
  } = article;
  const [comments, setComments] = useState(article.comments || []);

  const handlePublish = () => {
    request
      .post("/api/comment/publish", {
        content: comment,
        articleId: article.id,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setComment("");
          const newComment: CommentType = {
            id: Math.random(),
            content: comment,
            create_date: new Date(),
            update_date: new Date(),
            user: article.user,
            article,
          };
          setComments([newComment].concat(comments));
          message.success("Publish comment successfully");
        } else {
          message.error("Fail to publish comment");
        }
      });
  };

  return (
    <>
      <div className="content-layout">
        <div className={styles.articleDetail}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.userContainer}>
            <Avatar src={avatar} size={48} />
            <div className={styles.userInfo}>
              <div className={styles.name}>{nickname}</div>
              <div className={styles.dateWrapper}>
                <div className={styles.date}>
                  {format(new Date(article.update_date), "yyyy-MM-dd hh:mm:ss")}
                </div>
                <div className={styles.views}>
                  &nbsp;&nbsp;·&nbsp;&nbsp;Views {article.views}
                </div>
                {Number(userId) === Number(id) && (
                  <Link href={`/editor/${article.id}`}>
                    <a className={styles.editLink}>Edit</a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Markdown className={styles.markdown}>{article.content}</Markdown>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className="content-layout">
        <div className={styles.addComment}>
          <h4 className={styles.title}>Add comment</h4>
          <div className={styles.addCommentContent}>
            <Avatar src={avatar} size={40} />
            <div className={styles.contentWrapper}>
              <Input.TextArea
                placeholder="Input Comment Here"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e?.target?.value)}
              ></Input.TextArea>
              <Button
                className={styles.button}
                type="primary"
                onClick={handlePublish}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.commentList}>
          {comments?.map((comment: any) => (
            <div className={styles.commentItem}>
              <Avatar src={comment?.user.avatar} size={40} />
              <div className={styles.wrapper}>
                <div className={styles.info}>
                  <div className={styles.name}>{comment?.user?.nickname}</div>
                  <div className={styles.date}>
                    {formatDistanceToNow(new Date(comment?.update_date))}
                  </div>
                </div>
                <div className={styles.content}>{comment.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const articleId = context?.params.id;
  const db = await prepareConnection();
  const articleRepo = db.getRepository(Article);
  const article = await articleRepo.findOne({
    where: {
      id: articleId,
    },
    relations: ["user", "comments", "comments.user"],
  });

  if (article) {
    article.views += 1;
    await articleRepo.save(article);
  }
  return {
    props: { article: JSON.parse(JSON.stringify(article)) },
  };
}

export default observer(ArticleDetail);

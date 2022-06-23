import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { ArticleType } from "pages/api";
import { prepareConnection } from "db";
import { Article } from "db/entity";
import { useStore } from "store";
import Avatar from "antd/lib/avatar/avatar";
import styles from "./index.module.scss";

interface ArticleDetailProps {
  article: ArticleType;
}

const ArticleDetail = (props: ArticleDetailProps) => {
  const { push } = useRouter();
  const store = useStore();
  const { userId } = store.user.userInfo;
  const { article } = props;
  const {
    user: { id, nickname, avatar },
  } = article;
  return (
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
    relations: ["user"],
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

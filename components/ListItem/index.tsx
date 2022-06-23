import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import markdownToTxt from "markdown-to-txt";
import { ArticleType } from "pages/api";
import styles from "./index.module.scss";
import { EyeOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

interface ListItemProps {
  article: ArticleType;
}

const ListItem = (props: ListItemProps) => {
  const { article } = props;
  const { user } = article;
  return (
    <Link href={`/article/${article.id}`}>
      <a>
        <div className={styles.container}>
          <div className={styles.article}>
            <div className={styles.userInfo}>
              <span className={styles.name}>{user.nickname}</span>
              <span className={styles.date}>
                {formatDistanceToNow(new Date(article?.update_date))}
              </span>
            </div>
            <h4 className={styles.title}>{article.title}</h4>
            <p className={styles.content}>{markdownToTxt(article.content)}</p>
            <div className={styles.statistics}>
              <EyeOutlined />
              <span className={styles.views}>{article.views}</span>
            </div>
          </div>
          <Avatar className={styles.avatar} src={user.avatar} size={48} />
        </div>
      </a>
    </Link>
  );
};

export default ListItem;

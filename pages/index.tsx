import "reflect-metadata";
import { prepareConnection } from "db";
import { Article } from "db/entity";
import { ArticleType, HomePropsType } from "./api";
import ListItem from "components/ListItem";

const Home = (props: HomePropsType) => {
  const { articles } = props;
  return (
    <div className="content-layout">
      {articles.map((article: ArticleType) => (
        <ListItem article={article} />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const db = await prepareConnection();
  const articleRepo = db.getRepository(Article);
  const articles = await articleRepo.find({
    relations: ["user"],
  });
  return {
    props: { articles: JSON.parse(JSON.stringify(articles)) },
  };
}

export default Home;

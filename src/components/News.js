import React, { useEffect , useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  
  const [articles , setArticles] = useState([])
  const [loading , setLoading] = useState(true) 
  const [page , setPage] = useState(1) 
  const [totalResults , setTotalResults] = useState(0) 

  const capitalisefirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    setLoading(true)
    let data = await fetch(url); 
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setLoading(false)
    setTotalResults(parsedData.totalResults)
  };

  const  updateNews = async ()=> {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(40);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect( ()=>{
    document.title = `NewsMonkey- ${capitalisefirstletter(props.category)}`;
    updateNews();
    //eslint-disable-next-line
  },[]);

  // const handlenext = async () => {
  //   setPage(page+1)
  //   updateNews();
  // };

  // const handleprev = async () => {
  //   setPage(page-1)
  //   updateNews();
  // };

  
    return (
      <>
          <h2 className="text-center " style={{marginTop :'80px'}}>
            <b>
              Top {capitalisefirstletter(props.category)} Headlines
            </b>
          </h2>
        

        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {" "}
              {articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 70)
                          : 0
                      }
                      getUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

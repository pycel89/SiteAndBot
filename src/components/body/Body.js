import "./style.css"
import { newsInfo } from "../../helpers/newsInfo";
import { postsInfo } from "../../helpers/postsInfo";


const Body = () => {
  const GetLink = (uRL) => {

    if (!uRL)
      return
    if (uRL.indexOf('http') === 0) {
      return (<a href={uRL} target="_blank" rel="noreferrer"> {uRL}</a>)
    }
    else {
      return (<a href={uRL} target="_blank" rel="noreferrer">cкачать</a>)
    }

  }
  return (<div className="container">
    <div className="main-header">
    </div>
    {newsInfo.map((news) => {
      return (
        <div className="box">
          <div className="header">
            {news.text}
          </div>
          <div className="content">
            {postsInfo.map((posts) => {
              if (posts.paranId === news.id) {
                return (<p><a>{posts.text} </a>
                  {GetLink(posts.uRL)}
                </p>
                )                
              }
            })
            }
          </div>
        </div>
      )
    })
    }

  </div>)
}
export default Body;
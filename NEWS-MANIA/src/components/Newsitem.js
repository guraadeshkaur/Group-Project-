import React from "react";

const Newsitem = (props)=>  {

    let { title, description, getUrl,newsUrl,author,date,source } = props;

    return (
      <div className="my-3">
        <div className="card">
          <img src={getUrl?getUrl:"https://c.ndtvimg.com/2022-06/ejrqq7do_akasa-air_625x300_16_June_22.jpg"} alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}..<span className="badge text-bg-warning">{source}</span></h5>
            <p className="card-text">{description}..</p>
            <p className="card-text"><small className="text-muted"> By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-success">
              Read More
            </a>
          </div>
        </div>
      </div>
    );

}

export default Newsitem;

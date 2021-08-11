import { useEffect, useState } from "react";
import { getWiki, getVideoData } from "../api";
import { extractContent } from "../hooks";

export const Results = (props) => {
  const [wiki, setWiki] = useState(null);
  const [updatedKey, setUpdatedKey] = useState("");
  const [video, setVideo] = useState(null);
  const [resultsMax, setResultsMax] = useState(3);
  useEffect(() => {
    async function getWikiData() {
      let res = await getWiki(props.keyword);
      return res;
    }

    async function getVideo() {
      const res = await getVideoData(resultsMax, props.keyword);
      return res;
    }
    getWikiData().then((res) => {
      setWiki(extractContent(res.data));
      setUpdatedKey(res.key);
    });
    getVideo().then((res) => {
      console.log("videos", res.items);
      setVideo(res.items);
    });
  }, []);

  return (
    <div className="results__container">
      <div className="results__subContainer">
        <p className="results-title">Videos</p>
        <hr />
        {video === null || video === undefined ? (
          <p>Give us a second...</p>
        ) : (
          <>
            {video.map(({ snippet, id }, index) => {
              return (
                <>
                  <a target="_blank" rel="noreferrer" href={`https://www.youtube.com/watch?v=${id.videoId}`}>
                    <div className="results-video__container" key={index}>
                      <img
                        src={snippet.thumbnails.default.url}
                        href={`www.youtube.com/?v=${id.videoId}`}
                        alt="video thumbnail"
                      ></img>
                      <div className="results-video__subContainer">
                        <p id="vid-title">{snippet.title.replace("&#39;", "'").replace("&quot;", "'")}</p>
                        <p id="vid-channel">{snippet.channelTitle}</p>
                        <p id="vid-description">
                          {snippet.description.slice(0, 100).replace("&#39;", "'").replace("&quot;", "'")}...
                        </p>
                      </div>
                    </div>
                    <hr />
                  </a>
                </>
              );
            })}
          </>
        )}
      </div>
      <div className="results__subContainer">
        <p className="results-title">Wiki</p>
        <hr />
        {wiki === null ? (
          <p>one more second...</p>
        ) : (
          <>
            <p id="wiki-description">{wiki}...</p>
            <p id="wiki-view">
              View the wiki page{" "}
              <a href={`https://en.wikipedia.com/wiki/${updatedKey}`} target="_blank" rel="noreferrer">
                here
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

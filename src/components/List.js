import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import "./List.css";
import Axios from "axios";

function getList(url) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const callUrl = async () => {
    try {
      const { data } = await Axios.get(url);
      setPayload(data);
    } catch {
      setError("error");
    } finally {
      setLoading(false);
    }
  };
  //didMount
  useEffect(() => {
    callUrl();
  }, []);
  return { payload, loading, error };
}

const List = () => {
  const { payload, loading, error } = getList(
    "https://api.giphy.com/v1/gifs/search?api_key=UEhnkXgVuQ6kXADUp5Kh1bpbj0v4YeFh&q=spiderman&limit=12&offset=0&rating=G&lang=en"
  );

  return (
    <section>
      <article>
        <div className="grid-list">
          {/* <div className="grid-item">gird-list1</div>
          <div className="grid-item">gird-list2</div>
          <div className="grid-item">gird-list3</div>
          <div className="grid-item">gird-list4</div>
          <div className="grid-item">gird-list5</div>
          <div className="grid-item">gird-list6</div> */}
          {loading && (
            <div className="grid-item">
              <span>loading</span>
            </div>
          )}
          {!loading && error && (
            <div className="grid-item">
              <span>{error}</span>
            </div>
          )}
          {!loading && payload && (
            <div>
              {payload.data.map(listItem => (
                <img
                  className="grid-item"
                  key={listItem.id}
                  id={listItem.id}
                  src={listItem.images.fixed_height.url}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
};
export default List;

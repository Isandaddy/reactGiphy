import React, { useState, useEffect } from "react";
import Modal from "./Modal";
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
    "https://api.giphy.com/v1/gifs/search?api_key=UEhnkXgVuQ6kXADUp5Kh1bpbj0v4YeFh&q=spiderman&limit=15&offset=0&rating=G&lang=en"
  );
  const [imageToggle, handleImage] = useState(false);

  const [modalId, setModalId] = useState("");

  const imageState = id => {
    handleImage(!imageToggle);
    setModalId(id);
  };

  return (
    <section>
      <article>
        <div className="grid-list">
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
            <div className="btn-img">
              {payload.data.map(listItem => (
                <>
                  <img
                    onClick={() => imageState(listItem.id)}
                    className={`grid-item ${imageToggle && "toggle"}`}
                    key={listItem.id}
                    id={listItem.id}
                    src={listItem.images.original.url}
                    alt=""
                  />
                  <Modal
                    imageToggle={imageToggle}
                    payload={listItem}
                    modalId={modalId}
                    onClose={imageState}
                  />
                </>
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
};
export default List;

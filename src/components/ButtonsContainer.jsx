import React from "react";

const ButtonsContainer = ({ page, lastPage, setPage }) => {
  const prev = () => {
    setPage((p) => p - 1);
  };

  const next = () => {
    setPage((p) => p + 1);
  };

  return (
    <article className="page-btn-container">
      {page !== 1 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage(1);
          }}
        >
          first
        </button>
      )}

      {page > 1 && (
        <button className="page-btn" onClick={prev}>
          prev
        </button>
      )}

      {page - 10 > 0 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p - 10);
          }}
        >
          {page - 10}
        </button>
      )}

      {page - 6 > 0 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p - 6);
          }}
        >
          {page - 6}
        </button>
      )}

      {page - 5 > 0 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p - 5);
          }}
        >
          {page - 5}
        </button>
      )}

      {page - 4 > 0 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p - 4);
          }}
        >
          {page - 4}
        </button>
      )}

      {page - 3 > 0 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p - 3);
          }}
        >
          {page - 3}
        </button>
      )}

      {page - 2 > 0 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p - 2);
          }}
        >
          {page - 2}
        </button>
      )}

      {page - 1 > 0 && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p - 1);
          }}
        >
          {page - 1}
        </button>
      )}

      <button className="current-btn">{page}</button>

      {page !== lastPage && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p + 1);
          }}
        >
          {page + 1}
        </button>
      )}

      {page + 2 < lastPage && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p + 2);
          }}
        >
          {page + 2}
        </button>
      )}

      {page + 3 < lastPage && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p + 3);
          }}
        >
          {page + 3}
        </button>
      )}

      {page + 4 < lastPage && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p + 4);
          }}
        >
          {page + 4}
        </button>
      )}

      {page + 5 < lastPage && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p + 5);
          }}
        >
          {page + 5}
        </button>
      )}

      {page + 6 < lastPage && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p + 6);
          }}
        >
          {page + 6}
        </button>
      )}

      {page + 10 < lastPage && (
        <button
          className="page-btn"
          onClick={() => {
            setPage((p) => p + 10);
          }}
        >
          {page + 10}
        </button>
      )}

      {page !== lastPage && (
        <button className="page-btn" onClick={next}>
          next
        </button>
      )}

      {lastPage !== page && (
        <button
          className="page-btn"
          onClick={() => {
            setPage(lastPage);
          }}
        >
          last
        </button>
      )}
    </article>
  );
};

export default ButtonsContainer;

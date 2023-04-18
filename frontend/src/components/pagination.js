import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
const MyPaginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: "active", // default to "selected"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export default function PaginatedItems(props) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + props.itemsPerPage;
  const currentItems = props.items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.items.length / props.itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * props.itemsPerPage) % props.items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <props.ComponentCall submissions={currentItems} />
      <MyPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

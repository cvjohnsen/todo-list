import { useEffect, useState } from "react";
import styled from "styled-components";

 const StyledForm = styled.form`
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 12px;
    `;

    const StyledSection = styled.div`
      display: flex;
      gap: 8px;
      align-items: center;
    `;
   
function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);
  function preventRefresh(event) {
    event.preventDefault();
  }
  useEffect(() => {
    setLocalQueryString(queryString);
  }, [queryString]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={preventRefresh}>

     <StyledSection>
        <label htmlFor="searchTodos">Search todos:</label>
        <input
          id="searchTodos"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString("")}>
          Clear
        </button>
     </StyledSection>

      <StyledSection>
        <label htmlFor="sortField">Sort by</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(event) => setSortField(event.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time Added</option>
        </select>

        <label htmlFor="sortDirection">Direction</label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(event) => setSortDirection(event.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </StyledSection>
    </StyledForm>
  );
}

export default TodosViewForm;
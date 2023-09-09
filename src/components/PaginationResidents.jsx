import { Box, Pagination } from "@mui/material";
import React, { useState } from "react";

const PaginationResidents = ({location}) => {
 
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = location.residents?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(location.residents?.length / itemsPerPage);

  const handleChange = (event, value) => {
    const value2 = value - 1;
    const newOffset = value2 * itemsPerPage;

    setItemOffset(newOffset);
  };
  return (
    <div>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="pagination__home">
          <Pagination
            variant="outlined"
            count={pageCount}
            onChange={handleChange}
            size="large"
            siblingCount={2}
            boundaryCount={2}
          />
        </div>
      </Box>
    </div>
  );
};

export default PaginationResidents;
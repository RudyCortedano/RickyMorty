import { Box, Pagination } from "@mui/material";
import React, { useState } from "react";

const PaginationResidents = ({ pageCount, handleChange }) => {
  return (
    <div className="Button__pagination">
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" , overflow:"hidden"}}>
        <Pagination
          // variant="outlined"
          count={pageCount}
          onChange={handleChange}
          size="small"
          // siblingCount={2}
          // boundaryCount={2}
        />
      </Box>
    </div>
  );
};

export default PaginationResidents;

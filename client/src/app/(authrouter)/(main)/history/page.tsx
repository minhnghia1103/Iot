"use client";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
    margin: "auto",
  },
  header: {
    backgroundColor: "#f0f0f0",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#fafafa",
    },
  },
});

function History() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Replace with your actual data
  const rows = [
    { name: "John Doe", activity: "Logged in", created: "2022-01-01" },
    // More rows...
  ];

  return (
    <Paper className={classes.table}>
      <TableContainer>
        <Table>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.name} className={classes.row}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.activity}</TableCell>
                <TableCell>{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
  );
}

export default History;

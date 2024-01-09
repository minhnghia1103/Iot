"use client";
import React, { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface HistoryData {
  name: string;
  activity: string;
  createdAt: string;
}

function History() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<HistoryData[]>([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("history")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newData: HistoryData[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const date = new Date(data.createdAt); // Change here
          return {
            name: data.name,
            activity: data.message,
            createdAt: `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
          };
        });

        setData(newData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table
          sx={{
            maxWidth: 650,
            margin: "auto",
            "& thead": {
              backgroundColor: "#f0f0f0",
            },
            "& tr:nth-of-type(odd)": {
              backgroundColor: "#fafafa",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.activity}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default History;

import React, { useState, useEffect } from "react";
import Header from "./header";
import './Issues.css';
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import useInfiniteScroll from "react-infinite-scroll-hook";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    border: "1px solid #e0e0e0",
  },
  progress: {
    margin: theme.spacing(2),
  },
  issueCell: {
    cursor: "pointer",
  },
  open: {
    color: "green",
  },
  closed: {
    color: "red",
  },
  newIssueButton: {
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "lightgreen",
    },
  },
}));

const IssuesPage = () => {
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/repos/facebook/react/issues?page=${page}`
    );
    setIssues((prevIssues) => [...prevIssues, ...res.data]);
    setPage(page + 1);
    setLoading(false);
    if (res.data.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { scrollContainerRef, handleScroll, isLoading } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: fetchData,
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Header />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              className={classes.newIssueButton}
            >
              New Issue
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Labels</TableCell>
                <TableCell align="right">State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell component="th" scope="row">
                    <a href={issue.html_url} className={classes.issueCell}>
                      {issue.title}
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    {issue.labels.map((label) => (
                      <span key={label.id}>{label.name}</span>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <span
                      className={
                        issue.state === "open" ? classes.open : classes.closed
                      }
                    >
                      {issue.state}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <div ref={scrollContainerRef} onScroll={handleScroll}>
          {isLoading && (
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default IssuesPage;

import {
  Container,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Button from "../../units/Button";
import Paper from "../../units/Paper";

const CategoryTable = ({
  columnName = "",
  children,
  loadMoreHandler = () => {},
  showLoadMore = false,
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <TableContainer component={Paper} className={classes.paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow component="th">
              <TableCell>Serial No</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center"> {columnName}</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {showLoadMore && (
        <Paper className={classes.loadMoreContainer}>
          <Button onClick={loadMoreHandler}>Load More</Button>
        </Paper>
      )}
    </Container>
  );
};

export default CategoryTable;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  paper: {
    "&.MuiPaper-rounded::-webkit-scrollbar": {
      height: 7,
    },
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "& th, td": {
      color: "inherit",
    },
  },
  loadMoreContainer: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

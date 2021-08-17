import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { Container, Paper, Box, Typography,TableContainer,TableBody,Table,TableHead ,TableRow ,TableCell,TablePagination} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(5),
  },
}));

function App() {

  const classes = useStyles();
  const [data,setData] = useState([])
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(5)


  const loadUsers = async()=>{
       const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
       setData(res.data)
  }

  useEffect(()=>{
       loadUsers()
  },[])

    //  console.log(data)
  
  //jsx absrtraction

      const rendermap =(value)=>{
            return (
              <>
                                  <TableRow>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell>{value.email}</TableCell>
                                        <TableCell>{value.phone}</TableCell>
                                        <TableCell>{value.company.name}</TableCell>
                                        <TableCell>{value.website}</TableCell>
                                  </TableRow>
              </>
            )
      }


      const onChangePage=(event,nextPage)=>{
          setPage(nextPage)
      }

      const onChangeRowsPerPage=(e)=>{
        setRowsPerPage(e.target.value)
      }


  return (
    <Container className={classes.root}>
           <TableContainer component={Paper}>
                  <Table>
                         <TableHead>
                              <TableRow>
                                     <TableCell>Name</TableCell>
                                     <TableCell>Email</TableCell>
                                     <TableCell>Phone</TableCell>
                                     <TableCell>Company</TableCell>
                                     <TableCell>Website</TableCell>
                              </TableRow>

                         </TableHead>

                         <TableBody>

                             {data.slice(page * rowsPerPage ,page * rowsPerPage + rowsPerPage ).map(rendermap)}
                         </TableBody>
                  </Table>


                  <TablePagination

                      rowsPerPageOptions={[5,10,15,20,25,30]}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      count={data.length}
                      onChangePage={onChangePage}
                      onChangeRowsPerPage={onChangeRowsPerPage}
                  />

           </TableContainer>

           {/* <TablePagination

                  rowsPerPageOptions={[5,10,15,20,25,30]}
                   rowsPerPage={rowsPerPage}
                   page={page}
           /> */}
    </Container>
  );
}

export default App;
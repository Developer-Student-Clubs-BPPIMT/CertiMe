import React from 'react'
import { Container  } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Papa from 'papaparse'



const CertiDistribute = () => {
    const [ file, setFile ] = React.useState(null)
    const [ data, setData ] = React.useState(null)
    const [ isLoading, setLoading ] = React.useState(false)
    const [ headers, setHeaders] = React.useState(null)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const emptyRowsCount = data && rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    React.useEffect(() => {
        setLoading(true)
        Papa.parse(file, {
            worker: true,
            header: true,
            skipEmptyLines: true,
            complete: (results, _) => {
                setData(results.data)
                setHeaders(Object.keys(results.data[0]))
                setLoading(false)
            }
        })
    }, [file])
    return(
        <Container>
            { !file && <input type="file"  onChange={(e) => setFile(e.target.files[0])}/> }
            { !isLoading && data && (
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                            { headers.map(header => (<TableCell align="left">{header}</TableCell>))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row, index) => (
                          <TableRow key={"table" + index}>
                              { headers.map(header => (<TableCell align="left">{row[header]}</TableCell>))}
                          </TableRow>
                        ))}
                            { emptyRowsCount > 0 && (
                                <TableRow style={{height: 53 * emptyRowsCount}}>
                                    <TableCell />
                                </TableRow>
                            )}

                      </TableBody>
                      <TableFooter>
          <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                count={data && data.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={handleChangePage}
                            />
                        </TableRow>
                        </TableFooter>
                    </Table>
                  </TableContainer>
            )}
        </Container>
    )
}


export default CertiDistribute


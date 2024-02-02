import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import GetAppIcon from '@mui/icons-material/GetApp';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2pdf from 'html2pdf.js';


const handleExportInvoice = (row) => {
  // Remove the selected GC number from the list
console.log("row selected:  ", row)
generatePDFInvoice(row)
};

const generatePDFInvoice = (rowData) => {
  // Extracted the creation of table rows into a function for better readability
  const createTableRows = () => {
    // Iterate over the rowData list and generate table rows dynamically
    return rowData.history.map((item) => `
      <tr>
        <td>${item.customerId}</td>
        <td>dummy</td>
        <td>${item.date}</td>
        <td>${item.amount}</td>
      </tr>
    `).join('');
  };

  const htmlContent = `
    <html>
      <head>
        <!-- Head section remains the same -->
      </head>
      <body>
        <div style="text-align: center;">
        <div style="text-align: center;">
        <!-- Company Logo -->
        <img src="/Users/Z0044H2/Documents/UI/GangaPhotography/assets/img/fireworks.jpeg" alt="Company Logo" width="100">
        <!-- Company Name -->
       <h1>Aadhithiya Parcel Service</h1>
    
        <!-- Company Address and Phone Number -->
        <p>Company Address</p>
        <p>Phone Number: XXX-XXX-XXXX</p>

      </div>
        </div>

        <div>
          <h2>Billed To:</h2>
          <p>Name: ${rowData.name}</p>
          <p>Address: Hosur</p>
          <p>Unique ID: ${rowData.id}</p>
          <p>Invoice Date: 18/04/2023</p>
        </div>

        <!-- Updated table structure with dynamic rows -->
        <table border="1" style="width: 100%;">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${createTableRows()}
          </tbody>
        </table>

        <div>
        <h3>Total: $150</h3>
      </div>
    
      <!-- Signature Section -->
      <div>
        <hr>
        <p>Authorized Signature</p>
      </div>
      </body>
    </html>
  `;

  // Create a temporary element to hold the HTML content
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlContent;

  // Define options for html2pdf (unchanged)
  const options = {
    filename: 'invoice.pdf',
    margin: 0.3,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'portrait',
    },
  };

  // Convert HTML to PDF with options
  html2pdf(tempElement, options)
    .then(() => {
      console.log('PDF generated successfully!');
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
};


function createData(id, name, calories, fat, carbs, protein, price) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData(1,'Frozen yoghurt', 159, 6.0, 24, 4.0, 10),
  createData(2,'Ice cream sandwich', 237, 9.0, 37, 4.3, 20),
  createData(3,'Eclair', 262, 16.0, 24, 6.0, 12),
  createData(4,'Cupcake', 305, 3.7, 67, 4.3, 15),
  createData(5,'Gingerbread', 356, 16.0, 49, 3.9, 10),
];


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
        <TableCell align="right">
                  <IconButton onClick={() => handleExportInvoice(row)}>
                    <GetAppIcon  />
                  </IconButton>
                </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                GC Data
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export default function ExportCustomToolbar() {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


  const history = useHistory();
  const handleNavigate = () => {
    history.push('/Invoice/Invoiceadd');
  };

  const tableStyle = {
    border: '1px solid #ddd', // Add table border
    margin: '16px', // Add margin to the table
  };

  
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );



  return (
    <Grid container>
    <Grid item xs={11}></Grid>
     <Grid item xs={1}>
     <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleNavigate}>
       Invoice
     </Button>

         </Grid>

    <div style={{ width: '100%', ...tableStyle }}>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {visibleRows.map((row, index) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
    </Grid>
  );
}

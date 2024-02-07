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
      <tr style="border-top: 0.4px solid #000000; border-bottom: 0.4px solid #000000; height: 1.5rem;">
        <td style="border-top: 0.4px solid #000000; border-bottom: 0.4px solid #000000; height: 1.5rem;">${item.customerId}</td>
        <td style="border-top: 0.4px solid #000000; border-bottom: 0.4px solid #000000; height: 1.5rem;">dummy</td>
        <td style="border-top: 0.4px solid #000000; border-bottom: 0.4px solid #000000; height: 1.5rem;">${item.date}</td>
        <td style="border-top: 0.4px solid #000000; border-bottom: 0.4px solid #000000; height: 1.5rem;">${item.amount}</td>
      </tr>
    `).join('');
  };

  const htmlContent = `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Invoice</title>
  
      <style>
        @font-face {
          font-family: "Inter";
          src: url("Inter-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
        }
  
        @font-face {
          font-family: "Inter";
          src: url("Inter-Medium.ttf") format("truetype");
          font-weight: 500;
          font-style: normal;
        }
  
        @font-face {
          font-family: "Inter";
          src: url("Inter-Bold.ttf") format("truetype");
          font-weight: 700;
          font-style: normal;
        }
  
        @font-face {
          font-family: "Space Mono";
          src: url("SpaceMono-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
        }
  
        body {
          font-size: 0.75rem;
          font-family: "Inter", sans-serif;
          font-weight: 400;
          color: #000000;
          margin: 0 auto;
          position: relative;
        }
  
        #pspdfkit-header {
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 400;
          color: #717885;
          margin-top: 2.5rem;
          margin-bottom: 2.5rem;
          width: 100%;
        }
  
        .header-columns {
          display: flex;
          justify-content: space-between;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }
  
        .logo {
          height: 1.5rem;
          width: auto;
          margin-right: 1rem;
        }
  
        .logotype {
          display: flex;
          align-items: center;
          font-weight: 700;
        }
  
        h2 {
          font-family: "Space Mono", monospace;
          font-size: 1.25rem;
          font-weight: 400;
        }
  
        h4 {
          font-family: "Space Mono", monospace;
          font-size: 1rem;
          font-weight: 400;
        }
  
        .page {
          margin-left: 5rem;
          margin-right: 5rem;
        }
  
        .intro-table {
          display: flex;
          justify-content: space-between;
          margin: 3rem 0 3rem 0;
          border-top: 1px solid #000000;
          border-bottom: 1px solid #000000;
        }
  
        .intro-form {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #000000;
          width: 50%;
        }
  
        .intro-form:last-child {
          border-right: none;
        }
  
        .intro-table-title {
          font-size: 0.625rem;
          margin: 0;
        }
  
        .intro-form-item {
          padding: 1.25rem 1.5rem 1.25rem 1.5rem;
        }
  
        .intro-form-item:first-child {
          padding-left: 0;
        }
  
        .intro-form-item:last-child {
          padding-right: 0;
        }
  
        .intro-form-item-border {
          padding: 1.25rem 0 0.75rem 1.5rem;
          border-bottom: 1px solid #000000;
        }
  
        .intro-form-item-border:last-child {
          border-bottom: none;
        }
  
        .form {
          display: flex;
          flex-direction: column;
          margin-top: 6rem;
        }
  
        .no-border {
          border: none;
        }
  
        .border {
          border: 1px solid #000000;
        }
  
        .border-bottom {
          border: 1px solid #000000;
          border-top: none;
          border-left: none;
          border-right: none;
        }
  
        .signer {
          display: flex;
          justify-content: space-between;
          gap: 2.5rem;
          margin: 2rem 0 2rem 0;
        }
  
        .signer-item {
          flex-grow: 1;
        }
  
        input {
          color: #4537de;
          font-family: "Space Mono", monospace;
          text-align: center;
          margin-top: 1.5rem;
          height: 4rem;
          width: 100%;
          box-sizing: border-box;
        }
  
        input#date,
        input#notes {
          text-align: left;
        }
  
        input#signature {
          height: 8rem;
        }
  
        .intro-text {
          width: 60%;
        }
  
        .table-box table,
        .summary-box table {
          width: 100%;
          font-size: 0.625rem;
        }
  
        .table-box table {
          padding-top: 2rem;
        }
  
        .table-box td:first-child,
        .summary-box td:first-child {
          width: 50%;
        }
  
        .table-box td:last-child,
        .summary-box td:last-child {
          text-align: right;
        }
  
        .table-box table tr.heading td {
          border-top: 1px solid #000000;
          border-bottom: 1px solid #000000;
          height: 1.5rem;
        }
  
        .table-box table tr.item td,
        .summary-box table tr.item td {
          border-bottom: 1px solid #d7dce4;
          height: 1.5rem;
        }
  
        .summary-box table tr.no-border-item td {
          border-bottom: none;
          height: 1.5rem;
        }
  
        .summary-box table tr.total td {
          border-top: 1px solid #000000;
          border-bottom: 1px solid #000000;
          height: 1.5rem;
        }
  
        .summary-box table tr.item td:first-child,
        .summary-box table tr.total td:first-child {
          border: none;
          height: 1.5rem;
        }
  
        #pspdfkit-footer {
          font-size: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
          color: #717885;
          margin-top: 2.5rem;
          bottom: 2.5rem;
          position: absolute;
          width: 100%;
        }
  
        .footer-columns {
          display: flex;
          justify-content: space-between;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }
      </style>
    </head>
  
    <body>
      <div id="pspdfkit-header">
        <div class="header-columns">
          <div class="logotype">
            <img class="logo" src="/Users/Z0044H2/Documents/APS/APS_UI/screenshots/folder-structure.png" />
            <h1>Aadhitiya Parcel Service</h1>
          </div>
  
          <div>
            <p>Hosur</p>
          </div>
        </div>
      </div>
  
      <div class="page" style="page-break-after: always">
        <div>
          <h2>Invoice </h2>
        </div>
  
        <div class="intro-table">
          <div class="intro-form intro-form-item">
            <p class="intro-table-title">Billed To:</p>
            <p>
            Name: ${rowData.name}<br />
            Unique ID: ${rowData.id}<br/>
              Address<br />
              Country<br />
              VAT ID: ATU12345678
            </p>
          </div>
  
          <div class="intro-form">
            <div class="intro-form-item-border">
              <p class="intro-table-title">Payment Date:</p>
              <p>November 22nd 2021</p>
            </div>
  
            <div class="intro-form-item-border">
              <p class="intro-table-title">Payment Method:</p>
              <p>Bank Transfer</p>
            </div>
          </div>
        </div>
  
        <div class="table-box">
          <table cellpadding="0" cellspacing="0">
          <thead>
            
              <tr class="heading">
                <td>Description</td>
                <td>QTY</td>
                <td>Unit Price</td>
                <td>Total</td>
              </tr>
              </thead>
              <tbody>
              ${createTableRows()}
            </tbody>
          </table>
        </div>
  
        <div class="summary-box">
          <table cellpadding="0" cellspacing="0">
            <tbody>
              <tr class="item">
                <td></td>
                <td>Subtotal:</td>
                <td></td>
              </tr>
  
              <tr class="item">
                <td></td>
                <td>Discount:</td>
                <td></td>
              </tr>
  
              <tr class="item">
                <td></td>
                <td>Subtotal Less Discount:</td>
                <td></td>
              </tr>
  
              <tr class="item">
                <td></td>
                <td>Tax Rate:</td>
                <td></td>
              </tr>
  
              <tr class="item">
                <td></td>
                <td>Total Tax:</td>
                <td></td>
              </tr>
  
              <tr class="item">
                <td></td>
                <td>Shipping/Handling:</td>
                <td></td>
              </tr>
  
              <tr class="no-border-item">
                <td></td>
                <td>Total Due:</td>
                <td></td>
              </tr>
  
              <tr class="total">
                <td></td>
                <td>Amount Paid:</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="page" style="page-break-after: always">
        <div>
          <h4>Thank you for your purchase!</h4>
        </div>
  
        <div class="form">
          <label for="notes" class="label"> Notes: </label>
          <input type="text" id="notes" class="border-bottom" value="" />
        </div>
  
        <div class="signer">
          <div class="form signer-item">
            <label for="date" class="label">Date:</label>
            <input type="text" id="date" class="border-bottom" value="01/01/2021" />
          </div>
  
          <div class="form signer-item">
            <label for="signature" class="label">Issued by:</label>
            <input type="text" id="signature" class="border" value="Sign Here" />
          </div>
        </div>
      </div>
  
      <div id="pspdfkit-footer">
        <div class="footer-columns">
          <span>Invoice</span>
          <span></span>
        </div>
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

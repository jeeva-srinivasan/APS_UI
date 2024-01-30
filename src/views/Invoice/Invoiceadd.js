import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default function DessertEntryForm() {
  const history = useHistory();

  const [invoiceData, setInvoiceData] = React.useState({
    gcNumber: '',
    date: null,
    from: '',
    to: '',
    consigner: '',
    consignee: '',
    basicFreight: 0,
    freight: 0,
    others: 0,
    docketCharge: 0,
    invoiceValue: 0,
    total: 0,
    invoiceNumber: '',
    remarks: '',
    totalLorryHire: 0,
    truckNumber: '',
    invoice: false,
    toWhom: '',
    gcNumbers: [],
  });
  

  const [selectedToWhomValues, setSelectedToWhomValues] = React.useState([]);

  const handleChange = (field) => (event, value) => {
    console.log("field selected:  ", field)
   
    if (
      field === "from" ||
      field === "to" ||
      field === "consigner" ||
      field === "consignee" ||
      field === "toWhom" 
    ){
      console.log("value selected:  ", value)
      setInvoiceData({ ...invoiceData, [field]:  value });
    }
    else if (field === "gcNumber"){
      setInvoiceData({ ...invoiceData, [field]: value, gcNumbers: [...invoiceData.gcNumbers, value] });
    }
    else{
      console.log("hereeee")
      console.log("value selected:  ", event.target.value)
      setInvoiceData({ ...invoiceData, [field]:  event.target.value });
    }
    console.log("gc data:  ", invoiceData)
  };

  
  const handleAddDessert = () => {
    console.log(invoiceData);
    // Update the selected values for "To Whom"
    
    history.push('/Invoice/all');
  };

  const calorieOptions = ["small", "medium","large","Blue sky, fluffy clouds, and a gentle breeze make my day."]; // Replace with your calorie options


  const toWhomList = ['consigner', 'consignee'];

  const gcNumberList = ['123', '345', '456', '789'];


  React.useEffect(() => {
    // Calculate total whenever relevant fields change
    const { from, to } = invoiceData;

    // Ensure that the values are parsed as numbers before addition
    setSelectedToWhomValues((prevValues) => [...prevValues, invoiceData.from]);

    // Set the calculated total in the state
  
  }, [invoiceData.from, invoiceData.to]);

  const handleRemoveGCNumber = (gcNumber) => {
    // Remove the selected GC number from the list
    const updatedGCNumbers = invoiceData.gcNumbers.filter((number) => number !== gcNumber);
    setInvoiceData({ ...invoiceData, gcNumbers: updatedGCNumbers });
  };
  

  const tableStyle = {
    border: '1px solid #ddd', // Add table border
    margin: '16px', // Add margin to the table
  };

  const renderSelectedGCNumbers = () => {
    // Render a table with selected GC numbers and remove buttons
    if (invoiceData.gcNumbers.length === 0) {
      return null;
    }

    return (
      <div style={{  width: 700, ...tableStyle }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="gc-numbers-table">
          <TableHead>
            <TableRow>
              <TableCell>GC Number</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.gcNumbers.map((gcNumber) => (
              <TableRow key={gcNumber}>
                <TableCell component="th" scope="row">
                  {gcNumber}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleRemoveGCNumber(gcNumber)}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  };

  const renderConsigneeOrConsigner = () => {
    const { toWhom } = invoiceData;

    if (toWhom === 'consignee') {
      return (
        <Grid item xs={2}>
          <Autocomplete
            id="outlined-consignee"
            options={calorieOptions}
            renderInput={(params) => <TextField {...params} label="Consignee" variant="outlined" />}
            value={invoiceData.consignee}
            onChange={(event, value) => handleChange('consignee')(event, value)}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option}>
                {option}
              </MenuItem>
            )}
          />
        </Grid>
      );
    } else if (toWhom === 'consigner') {
      return (
        <Grid item xs={2}>
          <Autocomplete
            id="outlined-consigner"
            options={calorieOptions}
            renderInput={(params) => <TextField {...params} label="Consigner" variant="outlined" />}
            value={invoiceData.consigner}
            onChange={(event, value) => handleChange('consigner')(event, value)}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option}>
                {option}
              </MenuItem>
            )}
          />
        </Grid>
      );
    }

    return null; // Return null if toWhom is neither 'consignee' nor 'consigner'
  };


  return (
    <Grid container>
      <Grid item xs={11}>
        <h2>  ADD New Invoice Entry</h2>
      </Grid>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          border: '1px solid #ccc',
          borderRadius: '4px',
          margin: '16px',
          padding: '16px',
        }}
        noValidate
        autoComplete="on"
      >
       <div>
        <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            required
            id="outlined-number"
            label="Invoice Number"
            value={invoiceData.number}
            onChange={handleChange('number')}
          />
          </Grid>
          <Grid item xs={10}>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['GC Date']}>
              <DatePicker
                label="Invoice Date"
                value={invoiceData.date ? dayjs(invoiceData.date, 'DD-MM-YYYY HH:mm:ss').toDate() : null}
                onChange={(date) => handleChange('date')(null, date)}
                format="DD/MM/YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
          <Autocomplete
            id="outlined-name"
            options={toWhomList}
            renderInput={(params) => (
              <TextField {...params} label="To Whom" variant="outlined" />
            )}
            value={invoiceData.toWhom}
            onChange={handleChange('toWhom')}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option}>
                {option}
              </MenuItem>
            )}
          />
        </Grid>
        <Grid item xs={10}>
        {renderConsigneeOrConsigner()}
        </Grid>
        <Grid item xs={2}>
        <Autocomplete
            id="outlined-name"
            options={gcNumberList}
            renderInput={(params) => (
              <TextField {...params} label="GC Number" variant="outlined" />
            )}
            value={invoiceData.gcNumber}
            onChange={handleChange('gcNumber')}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option}>
                {option}
              </MenuItem>
            )}
          />
          </Grid>
          <Grid item xs={10}>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['GC Date']}>
              <DatePicker
                label="GC Date"
                value={invoiceData.date ? dayjs(invoiceData.date, 'DD-MM-YYYY HH:mm:ss').toDate() : null}
                onChange={(date) => handleChange('date')(null, date)}
                format="DD/MM/YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
          </Grid>
          
          <Grid item xs={2}>
          
          <TextField
            disabled
            id="outlined-others"
            label="From"
            type="from"
            InputLabelProps={{
              shrink: true,
            }}
            value={invoiceData.from}
            onChange={handleChange('from')}
          />
          </Grid>
          <Grid item xs={2}>
         
          <TextField
            disabled
            id="outlined-others"
            label="To"
            type="to"
            InputLabelProps={{
              shrink: true,
            }}
            value={invoiceData.to}
            onChange={handleChange('to')}
          />
          </Grid>
          <Grid item xs={8}></Grid>
     
          <Grid item xs={2}>
          <TextField
            disabled
            id="outlined-others"
            label="Freight"
            type="freight"
            InputLabelProps={{
              shrink: true,
            }}
            value={invoiceData.freight}
            onChange={handleChange('freight')}
          />
          </Grid>
          <Grid item xs={8}>
          <TextField
            disabled
            id="outlined-totalLorryHire"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            label="Total Lorry Hire"
            value={invoiceData.totalLorryHire}
            onChange={handleChange('totalLorryHire')}
          />
          </Grid>
          </Grid>
          
        </div>
      </Box>
      <Grid item xs={12}>
        {renderSelectedGCNumbers()}
      </Grid>
      <div>
          <Button variant="contained" onClick={handleAddDessert} >
            Submit
          </Button>
        </div>
    </Grid>
  );
}

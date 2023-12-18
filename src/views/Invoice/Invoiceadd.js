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
import dayjs from 'dayjs'; 
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

export default function DessertEntryForm() {
  const history = useHistory();
  const [dessertData, setDessertData] = React.useState({
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });

  const [invoiceData, setInvoiceData] = React.useState({
    number: '',
    date: null,
    from: '',
    to: '',
    consigner: '',
    consignee: '',
    basicFreight: 0,
    freight:0,
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
  });

  var consignee ="consignee"
  var consigner = "consigner"

  const handleChange = (field) => (event, value) => {
    setInvoiceData({ ...invoiceData, [field]: event?.target ? event.target.value : value });
  };

  const handleAddDessert = () => {
    // Log the dessert data or send it to an API
    console.log(dessertData);
    history.push('/Invoice/all');

  };
  const toWhomList = ["consigner", "consignee"];

  const calorieOptions = ["small", "medium","large"]; // Replace with your calorie options

  const renderConsigneeOrConsigner = () => {
    const { toWhom } = invoiceData;
  
    if (toWhom === 'consignee') {
      return (
        <Grid item xs={2}>
          <Autocomplete
            id="outlined-consignee"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="Consignee" variant="outlined" />
            )}
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
            renderInput={(params) => (
              <TextField {...params} label="Consigner" variant="outlined" />
            )}
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
   
      <Grid item xs={11}> <h2>ADD New Invoice Entry</h2></Grid>
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
          <Grid item xs={12}>
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
          
        {renderConsigneeOrConsigner()}
        <Grid item xs={2}>
          <TextField
            required
            id="outlined-number"
            label="GC Number"
            value={invoiceData.number}
            onChange={handleChange('number')}
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
            required
            id="outlined-from"
            label="From"
            value={invoiceData.from}
            onChange={handleChange('from')}
          />
          </Grid>
          <Grid item xs={10}>
          <TextField
            required
            id="outlined-to"
            label="To"
            value={invoiceData.to}
            onChange={handleChange('to')}
          />
          </Grid>
          
        <Grid item xs={2}>
          <Autocomplete
            id="outlined-consigner"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="Consigner" variant="outlined" />
            )}
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
          <Grid item xs={10}>
          <Autocomplete
            id="outlined-consignee"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="Consignee" variant="outlined" />
            )}
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
          <Grid item xs={2}>
          <TextField
            required
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
            required
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

        <div>
          <Button variant="contained" onClick={handleAddDessert}>
            Submit
          </Button>
        </div>
      </Box>
    </Grid>
  );
}

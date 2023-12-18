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
  const [gcData, setGcData] = React.useState({
    number: '',
    date: null,
    from: '',
    to: '',
    consigner: '',
    consignee: '',
    basicFreight: 0,
    others: 0,
    docketCharge: 0,
    invoiceValue: 0,
    total: 0,
    invoiceNumber: '',
    remarks: '',
    totalLorryHire: 0,
    truckNumber: '',
    invoice: false,
    toWhom: ''
  });

  

  const handleChange = (field) => (event, value) => {
    setGcData({ ...gcData, [field]: event?.target ? event.target.value : value });
  };


  React.useEffect(() => {
    // Calculate total whenever relevant fields change
    const { basicFreight, others, docketCharge, invoiceValue } = gcData;

    // Ensure that the values are parsed as numbers before addition
    const total = Number(basicFreight) + Number(others) + Number(docketCharge) + Number(invoiceValue);

    // Set the calculated total in the state
    setGcData((prevData) => ({ ...prevData, total }));
  }, [gcData.basicFreight, gcData.others, gcData.docketCharge, gcData.invoiceValue]);

  const handleAddNewGC = () => {
    // Log the dessert data or send it to an API
    console.log(gcData);

    // Navigate to the desired route (e.g., '/GC')
    history.push('/GC');
  };

  const calorieOptions = ["small", "medium","large","Blue sky, fluffy clouds, and a gentle breeze make my day."]; // Replace with your calorie options

  return (
    <Grid container>
   
      <Grid item xs={11}> <h2>ADD New GC Entry</h2></Grid>
      <Box
        component="form"
        sx={{
          // '& .MuiTextField-root': { m: 1, width: '30ch' },
          border: '1px solid #ccc',
          borderRadius: '1px',
          margin: '20px',
          padding: '20px',
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
            label="GC Number"
            sx={{
              width: '250px',
              p: 1}}
            value={gcData.number}
            onChange={handleChange('number')}
          />
          </Grid>
          <Grid item xs={2}>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['GC Date']}>
              <DatePicker
                label="GC Date"
                value={gcData.date ? dayjs(gcData.date, 'DD-MM-YYYY HH:mm:ss').toDate() : null}
                onChange={(date) => handleChange('date')(null, date)}
                format="DD/MM/YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
          <Autocomplete
            id="outlined-consigner"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="From" variant="outlined" />
            )}
            value={gcData.from}
            onChange={(event, value) => handleChange('from')(event, value)}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option} sx={{
                width: '350px',
                p: 1}}>
                {option}
              </MenuItem>
            )}
          />
          </Grid>
          <Grid item xs={4}>
          <Autocomplete
            id="outlined-consignee"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="To" variant="outlined" />
            )}
            value={gcData.to}
            onChange={(event, value) => handleChange('to')(event, value)}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option}>
                {option}
              </MenuItem>
            )}
          />
          </Grid>
          <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="outlined-consigner"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="Consigner" variant="outlined" />
            )}
            value={gcData.consigner}
            onChange={(event, value) => handleChange('consigner')(event, value)}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option}>
                {option}
              </MenuItem>
            )}
          />
          </Grid>
          <Grid item xs={4}>
          <Autocomplete
            id="outlined-consignee"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="Consignee" variant="outlined" />
            )}
            value={gcData.consignee}
            onChange={(event, value) => handleChange('consignee')(event, value)}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <MenuItem {...props} value={option}>
                {option}
              </MenuItem>
            )}
          />
          </Grid>
          <Grid item xs={4}>
          <Autocomplete
            id="outlined-consignee"
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="To Whom" variant="outlined" />
            )}
            value={gcData.toWhom}
            onChange={(event, value) => handleChange('toWhom')(event, value)}
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
            id="outlined-basic-freight"
            label="Basic Freight"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={gcData.basicFreight}
            onChange={handleChange('basicFreight')}
          />
          </Grid>
          <Grid item xs={2}>
          <TextField
            required
            id="outlined-others"
            label="Others"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={gcData.others}
            onChange={handleChange('others')}
          />
          </Grid>
          <Grid item xs={2}>
          <TextField
            required
            id="outlined-docketCharge"
            type="number"
            
            InputLabelProps={{
              shrink: true,
            }}
            label="Docket Charge"
            value={gcData.docketCharge}
            onChange={handleChange('docketCharge')}
          />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={2}>
          <TextField
            required
            id="outlined-invoiceNumber"
            label="InvoiceNumber"
            value={gcData.invoiceNumber}
            onChange={handleChange('invoiceNumber')}
          />
          </Grid>
          <Grid item xs={10}>
          <TextField
            required
            id="outlined-invoiceValue"
            label="Invoice Value"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={gcData.invoiceValue}
            onChange={handleChange('invoiceValue')}
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            disabled
            id="outlined-total"
            label="Total"
            value={gcData.total}
            onChange={handleChange('total')}
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            required
            sx={{ width: '30%' }}
            id="outlined-remarks"
            label="Remarks"
            value={gcData.remarks}
            onChange={handleChange('remarks')}
          />
          </Grid>
          <Grid item xs={2}>
          <TextField
            required
            id="outlined-totalLorryHire"
            label="Total Lorry Hire"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={gcData.totalLorryHire}
            onChange={handleChange('totalLorryHire')}
          />
          </Grid>
          <Grid item xs={10}>
          <TextField
            required
            id="outlined-truckNumber"
            label="Truck Number"
            value={gcData.truckNumber}
            onChange={handleChange('truckNumber')}
          />
          </Grid>
          <Grid item xs={10}>
          <InputLabel id="demo-simple-select-standard-label">Invoice</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={gcData.invoice}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={10}></Grid>
           </Grid>
        </div>

        <div>
          <Button variant="contained" onClick={handleAddNewGC}>
            Submit
          </Button>
        </div>
      </Box>
    </Grid>
  );
}

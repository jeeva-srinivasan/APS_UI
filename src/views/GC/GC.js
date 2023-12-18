import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function createData(id, name, calories, fat, carbs, protein) {
  return {id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1,'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(2,'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(3,'Eclair', 262, 16.0, 24, 6.0),
  createData(4,'Cupcake', 305, 3.7, 67, 4.3),
  createData(5,'Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ExportCustomToolbar() {

  const history = useHistory();
  const handleNavigate = () => {
    history.push('/GCADD');
  };
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'calories', headerName: 'Calories', flex: 1 },
    { field: 'fat', headerName: 'Fat', flex: 1 },
    { field: 'carbs', headerName: 'Carbs', flex: 1 },
    { field: 'protein', headerName: 'Protein', flex: 1 },

  ];


  const tableStyle = {
    border: '1px solid #ddd', // Add table border
    margin: '16px', // Add margin to the table
  };

  const getRowId = (row) => row.id;

  const rowStyle = (params) => ({
    borderBottom: '1px solid #ddd', // Add border to each row
    height: '50px', // Set the height of each row
  });

  const columnSeparatorStyle = {
    borderRight: '10px solid #ddd', // Add border between columns
  };


  return (
    <Grid container>
    <Grid item xs={11}></Grid>
     <Grid item xs={1}>
     <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleNavigate}>
       GC Entry
     </Button>

         </Grid>
    <div style={{ height: 400, width: '100%', ...tableStyle }}>
      <DataGrid
        
        rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={getRowId}
          rowStyle={rowStyle}
          slots={{
            toolbar: CustomToolbar,
          }}
          // Customize header style
          components={{
            Header: ({ headerParams }) => (
              <div style={{ ...columnSeparatorStyle, fontWeight: 'bold' }}>
                {headerParams.column.headerName}
              </div>
            ),
          }}
      />
    </div>
    </Grid>
  );
}

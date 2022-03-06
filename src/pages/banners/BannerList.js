import React from 'react';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// components
import PageTitle from '../../components/PageTitle';

// id, title. image

const datatableData = [
    ["Joe James", "Example Inc. Example Inc. Example Inc. Example Inc. Example Inc. Example Inc.", "Yonkers", "NY","oe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe James", "oe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe Jamesoe James"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
  ];

const BannerList = () => {
    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiTableCell: {
                head: {
                    backgroundColor: '#E4E9EA !important',
                    fontSize:'18px'
                }
            }
        }
    });
    return(
        <>
            <PageTitle title='Banners' />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable 
                            title='Banner List'
                            columns={['Id', 'Title', 'Image', 'CreatedAt', 'UpdatedAt', 'DeletedAt', 'DeletedAt', 'DeletedAt','DeletedAt','DeletedAt','DeletedAt','DeletedAt','DeletedAt']}
                            data={datatableData}
                            options={{
                                selectableRows: false,
                                onRowClick: (rowIndex) => window.location.href = `banners/${rowIndex[0]}`,
                            }}
                        />
                    </MuiThemeProvider>
                </Grid>
            </Grid>
        </>
    )
}

export default BannerList;
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { fetchBannerList, fetchTotalBanner } from './services/banner_service';
import { Link } from 'react-router-dom';

// id, title. image
const columns = [
	{
		name: 'id',
		label: 'ID',
		options:{
			filter:true,
			sort: true
		}
	},
	{
		name: 'title',
		label: 'Name',
		options:{
			filter:true,
			sort: true
		}
	},
	{
		name: 'image',
		label: 'Image',
		options:{
			filter:false,
			sort: false,
			customBodyRender: (value) => {
				return(
					<img
						src={value}
						width={350}
						height={150}
						alt='banner image'
					/>
				);
			}
		},
	},
];


const BannerList = () => {

	const history = useHistory();

	const [data, setData] = useState();
	const [total, setTotal] = useState(0);

	useEffect(async () => {
		await fetchBannerList();
		setTotal(await fetchTotalBanner());
		setData(await fetchBannerList());
	},[]);

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
			<Link
				to='/app/banners/create'
			>
				<Button variant='contained' color='primary' onClick={null}>Create</Button>
			</Link>
			
			<p style={{color: 'grey'}}>{total} records found</p>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MuiThemeProvider theme={getMuiTheme()}>
						<MUIDataTable 
							title='Banner List'
							columns={columns}
							data={data}
							options={{	
								selectableRowsOnClick: false,	
								expandableRowsOnClick:true,
								selectableRows: false,
								onRowClick: (colData) => 
									history.push(`/app/banners/${colData[0]}`)
							}}
						/>
					</MuiThemeProvider>
				</Grid>
			</Grid>
		</>
	);
};

export default BannerList;

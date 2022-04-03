import * as React from 'react';

import {Dialog, DialogActions, DialogContentText, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table} from '@mui/material/';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteBanner, getBannerDetail } from './services/banner_service';
import { Button, DialogTitle } from '@material-ui/core';
import useStyles from './styles/style';
import { Link } from 'react-router-dom';
import { useUserDispatch } from '../../context/UserContext';

export default function BannerDetail() {
	var userDispatch = useUserDispatch();
	var classes = useStyles();
	const history = useHistory();
	const {id} = useParams();
	const [banner, setBanner] = useState({});	
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
	};

	const handleDeleteBanner = async() => {
		setOpen(false);
		await history.goBack();
		await deleteBanner(userDispatch,history,id);
	};

	useEffect( async() => {
		await getBannerDetail(userDispatch,history,id);
		setBanner(await getBannerDetail(userDispatch,history,id));
	},[]);

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell style={{fontSize: 18}}>Banner Detail</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

						<TableRow
							key={banner.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell style={{width:150}} component="td" scope="row">
							Id
							</TableCell>
							<TableCell component='td' scope='row' align='left'>{banner.id}</TableCell>
						</TableRow>
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell style={{width:150, backgroundColor:'#dcecfc'}} component="td" scope="row">
							Title
							</TableCell>
							<TableCell style={{backgroundColor:'#dcecfc'}} component='td' scope='row' align='left'>{banner.title}</TableCell>
						</TableRow>
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell style={{width:150}} component="td" scope="row">
							Image
							</TableCell>
							<TableCell component='td' scope='row' align='left'>
								<img
									src={banner.image}
									width={800}
									height={400}
									alt='banner image'
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>	
			<div className={classes.btnSection}>
				<Link to={`/app/banners/${id}/edit`}>
					<Button color='primary' variant='contained'>Edit Banner</Button>
				</Link>
				<Button color='primary' onClick={handleClickOpen} variant='outlined'>Delete Banner</Button>
			</div>
			<Dialog
				open={open}
				onClose={handleClickClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id='alert-dialog-title'>
					<DialogContentText id='alert-dialog-description'>Are you sure want to delete this banner?</DialogContentText>
				</DialogTitle>
				<DialogActions>
					<Button color='primary' onClick={handleClickClose}>No</Button>
					<Button color='error' onClick={handleDeleteBanner}>Yes</Button>
				</DialogActions>

			</Dialog>
		</>
	);
}

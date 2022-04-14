/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { TextField,Button } from '@material-ui/core';
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material/';
import useStyles from '../styles/style';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { createBanner, getBannerDetail, updateBanner } from '../services/banner_service';
import { useHistory } from 'react-router-dom';
import { useUserDispatch } from '../../../context/UserContext';

const BannerForm = () => {
	var userDispatch = useUserDispatch();
	var classes = useStyles();
	const validationSchema = yup.object({
		title: yup.string().trim().required('Title is required'),
		image: yup.string().trim().required('Image is required')
	});
	const history = useHistory();

	const [banner, setBanner] = useState({});
	const useLoc = useLocation();
	const url = useLoc.pathname.split('/');
	const lastPath = url.pop();
	const bannerId = url[url.length - 1];

	if (lastPath === 'edit') {
		useEffect( async() => {
			await getBannerDetail(userDispatch,history,bannerId);
			setBanner(await getBannerDetail(userDispatch,history,bannerId));
		},[]);    
	}

	const handleCancelButton = () => {
		history.goBack();
	};
	
	const formik = useFormik({
		initialValues:{
			title: banner.title ? banner.title : '',
			image: banner.image ? banner.image : ''
		},
		onSubmit: (values) => {
			if (lastPath === 'edit') {
				updateBanner(userDispatch,history,bannerId, values);
				history.goBack();
			}else{
				createBanner(userDispatch,history,values);
				history.goBack();
			}
		},
		validationSchema,
		enableReinitialize: true
	});
    
	return(
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell style={{fontSize: 18}}>Banner Data</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='td' scope='row' align='left'>
								<form id='banner-form' className={classes.form} onSubmit={formik.handleSubmit}>
									{lastPath === 'create' ? <>
										<TextField
											id='title'
											name='title'
											label='Title'
											onChange={formik.handleChange}
											value={formik.values.title}
											error={formik.touched.title && Boolean(formik.errors.title)}
											helperText={formik.touched.title && formik.errors.title}
											onBlur={formik.handleBlur} />
										<TextField
											id='image'
											name='image'
											label='Image'
											onChange={formik.handleChange}
											value={formik.values.image}
											error={formik.touched.image && Boolean(formik.errors.image)}
											helperText={formik.touched.image && formik.errors.image}
											onBlur={formik.handleBlur} />
									    </>
                                            : <>
                                            	<TextField
                                            		id='title'
                                            		name='title'
                                            		label='Title'
                                            		onChange={formik.handleChange}
                                            		value={formik.values.title}
                                            		error={formik.touched.title && Boolean(formik.errors.title)}
                                            		helperText={formik.touched.title && formik.errors.title}
                                            		onBlur={formik.handleBlur} />
                                            	<TextField
                                            		id='image'
                                            		name='image'
                                            		label='Image'
                                            		onChange={formik.handleChange}
                                            		value={formik.values.image}
                                            		error={formik.touched.image && Boolean(formik.errors.image)}
                                            		helperText={formik.touched.image && formik.errors.image}
                                            		onBlur={formik.handleBlur} />
                                            </>
									}
									<TableRow
										sx={{ '&:last-child td, &:last-child tf': { border: 0 } }}>
										<TableCell>
											<div className={classes.btnSection}>
												{lastPath === 'create' 
                                                ? <Button type='submit' color='primary' variant='contained' >Create</Button> 
                                                : <Button type='submit' color='primary' variant='contained' >Update</Button>}
												{lastPath === 'create' 
												? <Link to='/app/banners?page=1&rowsPerPage=1'>
													<Button variant='text'>Cancel</Button>
												</Link>
												: <Button color='primary' variant='contained' onClick={handleCancelButton}>Cancel</Button>}
												
											</div>
										</TableCell>
									</TableRow>
								</form> 
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			
			</TableContainer>
		</>
	);
};

export default BannerForm;
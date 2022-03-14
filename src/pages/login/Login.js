/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	Tabs,
	Tab,
	TextField,
	Fade,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// styles
import useStyles from './styles';

// logo
import logo from './logo.svg';

// context
import { useUserDispatch } from '../../context/UserContext';
import { loginUser } from './services/auth_service';
import { ToastContainer } from 'react-toastify';

function Login(props) {
	let classes = useStyles();

	// global
	var userDispatch = useUserDispatch();

	// "email":'super.admin@gmail.com',
	//   "password":'niki999'
  

	// local
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [activeTabId, setActiveTabId] = useState(0);
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	return (
		<Grid container className={classes.container}>
			<div>
				<ToastContainer 
					position="top-right"
					autoClose={5000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
			<div className={classes.logotypeContainer}>
				<img src={logo} alt="logo" className={classes.logotypeImage} />
				<Typography className={classes.logotypeText}>Kuycook Admin</Typography>
			</div>
			<div className={classes.formContainer}>
				<div className={classes.form}>
					<Tabs
						value={activeTabId}
						onChange={(e, id) => setActiveTabId(id)}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Login" classes={{ root: classes.tab }} />
						<Tab label="New User" classes={{ root: classes.tab }} />
					</Tabs>
					{activeTabId === 0 && (
						<React.Fragment>
							<Typography variant="h1" className={classes.greeting}>
                Welcome, User
							</Typography>
							<Fade in={error}>
								<Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
								</Typography>
							</Fade>
							<TextField
								id="email"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={emailValue}
								onChange={e => setEmailValue(e.target.value)}
								margin="normal"
								placeholder="Email Adress"
								type="email"
								fullWidth
							/>
							<TextField
								id="password"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={passwordValue}
								onChange={e => setPasswordValue(e.target.value)}
								margin="normal"
								placeholder="Password"
								type="password"
								fullWidth
							/>
							<div className={classes.formButtons}>
								{isLoading ? (
									<CircularProgress size={26} className={classes.loginLoader} />
								) : (
									<Button
										disabled={
											emailValue.length === 0 || passwordValue.length === 0
										}
										onClick={() =>
											loginUser(
												userDispatch,
												emailValue,
												passwordValue,
												props.history,
												setIsLoading,
												setError,
											)
										}
										variant="contained"
										color="primary"
										size="large"
									>
                    Login
									</Button>
								)}
								<Button
									color="primary"
									size="large"
									className={classes.forgetButton}
								>
                  Forgot Password?
								</Button>
							</div>
						</React.Fragment>
					)}
					{activeTabId === 1 && (
						<React.Fragment>
							<Typography variant="h1" className={classes.greeting}>
                Welcome!
							</Typography>
							<Typography variant="h2" className={classes.subGreeting}>
                Create your account
							</Typography>
							<Fade in={error}>
								<Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
								</Typography>
							</Fade>
							<TextField
								id="name"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={nameValue}
								onChange={e => setNameValue(e.target.value)}
								margin="normal"
								placeholder="Full Name"
								type="text"
								fullWidth
							/>
							<TextField
								id="email"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={emailValue}
								onChange={e => setEmailValue(e.target.value)}
								margin="normal"
								placeholder="Email Adress"
								type="email"
								fullWidth
							/>
							<TextField
								id="password"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={passwordValue}
								onChange={e => setPasswordValue(e.target.value)}
								margin="normal"
								placeholder="Password"
								type="password"
								fullWidth
							/>
							<div className={classes.creatingButtonContainer}>
								{isLoading ? (
									<CircularProgress size={26} />
								) : (
									<Button
										onClick={() =>
											loginUser(
												userDispatch,
												emailValue,
												passwordValue,
												props.history,
												setIsLoading,
												setError,
											)
										}
										disabled={
											emailValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
										}
										size="large"
										variant="contained"
										color="primary"
										fullWidth
										className={classes.createAccountButton}
									>
                    Create your account
									</Button>
								)}
							</div>
						</React.Fragment>
					)}
				</div>
				<Typography color="primary" className={classes.copyright}>
        © 2021-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://google.com" rel="noopener noreferrer" target="_blank">Kuycook</a>. All rights reserved.
				</Typography>
			</div>
		</Grid>
	);
}

export default withRouter(Login);

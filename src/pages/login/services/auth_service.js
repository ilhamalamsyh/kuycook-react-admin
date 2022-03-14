import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8080/kuycook/api/auth/signin';

const errorNotification = (errorMessage) => toast.error(errorMessage,{
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: 0.0,
});

function loginUser(dispatch, email, password, history, setIsLoading, setError) {
	setError(false);
	setIsLoading(true);
  
	if (!!email && !!password) {
		setTimeout(() => {
			axios.post(API_URL, {
				'email':email,
				'password':password
			}).then( res => {        
				localStorage.setItem('user', JSON.stringify(res.data));        
				setError(null);
				setIsLoading(false);
				dispatch({ type: 'LOGIN_SUCCESS' });        
				history.push('/app/dashboard');
			}).catch(err => {
				if (err.response.status === 401) {          
					dispatch({ type: 'LOGIN_FAILURE' });
					setError(true);
					setIsLoading(false);
					history.push('/login');
					errorNotification(err.response.data.message);
				}        
			});      
		}, 2000);
	} else {
		dispatch({ type: 'LOGIN_FAILURE' });
		setError(true);
		setIsLoading(false);
	}
}

function signOut(dispatch, history) {
	localStorage.removeItem('user');
	dispatch({ type: 'SIGN_OUT_SUCCESS' });
	history.push('/login');
}

export {loginUser, signOut};
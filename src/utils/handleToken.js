let token;
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const checkExpiryToken = (user,dispatch, history) => {
	token = user.token;
	if(token === null){
		dispatch({ type: LOGIN_FAILURE });    
		history.push('/login');    
	}
};

export {checkExpiryToken};
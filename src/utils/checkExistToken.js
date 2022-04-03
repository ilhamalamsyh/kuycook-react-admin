const user = JSON.parse(localStorage.getItem('user'));

let token;
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const checkExistToken = (dispatch, history) => {
	token = user.token;
	if(token === null){
		dispatch({ type: LOGIN_FAILURE });    
		history.push('/login');    
	}
};

export {checkExistToken, user};
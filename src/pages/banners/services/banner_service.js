import axios from 'axios';
import { checkExistToken, user } from '../../../utils/checkExistToken';

const BANNER_LIST_ENDPOINT_URL = 'http://localhost:8080/kuycook/api/banners?&size=20&page=0&sort=desc';
const BANNER_ENDPOINT_URL = 'http://localhost:8080/kuycook/api/banners/';

const LOGIN_FAILURE = 'LOGIN_FAILURE';

const createBanner = async (dispatch,history,data) => {
	checkExistToken(dispatch, history);
	const result = await axios.post(BANNER_ENDPOINT_URL, {
		'title': data.title,
		'image': data.image
	},{headers: {'Authorization' : `Bearer ${user.token}`}})
		.then(res => {
			return res;
		}).catch(err => {
			if (err.response.statue === 401) {
				dispatch({ type: LOGIN_FAILURE });    
				history.push('/login');    
			}
			throw new Error(err);
		});
	return result;
};

const updateBanner = async(dispatch, history,id, data) => {
	checkExistToken(dispatch, history);
	const result = await axios.put(BANNER_ENDPOINT_URL+id, {
		'title': data.title,
		'image': data.image
	},{headers: {'Authorization' : `Bearer ${user.token}`}})
		.then(res => {
			return res;
		}).catch(err => {
			if (err.response.status === 401) {
				dispatch({ type: LOGIN_FAILURE });    
				history.push('/login');	
			}
			throw new Error(err);
		});
	return result;
};

const fetchBannerList = async (dispatch, history) => {
	checkExistToken(dispatch, history);
	const result =  await axios.get(BANNER_LIST_ENDPOINT_URL, {
		headers: {'Authorization' : `Bearer ${user.token}`}
	})
		.then(response => {
			return response.data.content;
		}).catch(err => {
			if (err.response.status === 401) {
				dispatch({ type: LOGIN_FAILURE });    
				localStorage.removeItem('user');
				history.push('/login');	
			}
		});
	return result;
};

const getBannerDetail = async(dispatch, history, id) => {
	checkExistToken(dispatch, history);
	const result = await axios.get(BANNER_ENDPOINT_URL+id,{
		headers: {'Authorization' : `Bearer ${user.token}`}
	}).then(response => {
		return response.data;
	}).catch(err => {
		if(err.response.status === 401){
			dispatch({ type: LOGIN_FAILURE });    
			history.push('/login');
		}
		throw new Error(err);
	}); 
	return result;
};

const deleteBanner = async (dispatch, history,id) => {
	checkExistToken(dispatch, history);
	const result = await axios.delete(BANNER_ENDPOINT_URL+id,{
		headers: {'Authorization' : `Bearer ${user.token}`}
	}).then(response => {
		return response.data;
	}).catch(err => {
		if (err.response.status === 401) {
			dispatch({ type: LOGIN_FAILURE });    
			history.push('/login');	
		}
		throw new Error(err);
	});
	return result;
};

const fetchTotalBanner = async(dispatch, history) => {
	checkExistToken(dispatch, history);
	const result = await axios.get(BANNER_LIST_ENDPOINT_URL, {
		headers: {'Authorization' : `Bearer ${user.token}`}
	})
		.then(response => {
			return response.data.totalElements;
		}).catch(err => {
			if(err.response.status === 401){
				dispatch({ type: LOGIN_FAILURE });    
				history.push('/login');
			}
		});
	return result;
};

export {createBanner, updateBanner, fetchBannerList, fetchTotalBanner, getBannerDetail, deleteBanner};
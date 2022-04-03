import axios from 'axios';

const BANNER_LIST_ENDPOINT_URL = 'http://localhost:8080/kuycook/api/banners?&size=20&page=0&sort=desc';
const BANNER_ENDPOINT_URL = 'http://localhost:8080/kuycook/api/banners/';


const user = JSON.parse(localStorage.getItem('user'));
const token = user.token;

const createBanner = async (data) => {
	const result = await axios.post(BANNER_ENDPOINT_URL, {
		'title': data.title,
		'image': data.image
	},{headers: {'Authorization' : `Bearer ${token}`}})
		.then(res => {
			return res;
		}).catch(err => {
			throw new Error(err);
		});
	return result;
};

const updateBanner = async(id, data) => {
	const result = await axios.put(BANNER_ENDPOINT_URL+id, {
		'title': data.title,
		'image': data.image
	},{headers: {'Authorization' : `Bearer ${token}`}})
		.then(res => {
			return res;
		}).catch(err => {
			throw new Error(err);
		});
	return result;
};

const fetchBannerList = async () => {
	const result =  await axios.get(BANNER_LIST_ENDPOINT_URL, {
		headers: {'Authorization' : `Bearer ${token}`}
	})
		.then(response => {
			return response.data.content;
		}).catch(err => {
			throw new Error(err);
		});
	return result;
};

const getBannerDetail = async(id) => {
	const result = await axios.get(BANNER_ENDPOINT_URL+id,{
		headers: {'Authorization' : `Bearer ${token}`}
	}).then(response => {
		return response.data;
	}).catch(err => {
		throw new Error(err);
	}); 
	return result;
};

const deleteBanner = async (id) => {
	const result = await axios.delete(BANNER_ENDPOINT_URL+id,{
		headers: {'Authorization' : `Bearer ${token}`}
	}).then(response => {
		return response.data;
	}).catch(err => {
		throw new Error(err);
	});
	return result;
};

const fetchTotalBanner = async() => {
	const result = await axios.get(BANNER_LIST_ENDPOINT_URL, {
		headers: {'Authorization' : `Bearer ${token}`}
	})
		.then(response => {
			return response.data.totalElements;
		}).catch(err => {
			throw new Error(err);
		});
	return result;
};

export {createBanner, updateBanner, fetchBannerList, fetchTotalBanner, getBannerDetail, deleteBanner};

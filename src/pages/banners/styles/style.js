import { makeStyles } from '@material-ui/styles';

// eslint-disable-next-line no-unused-vars
export default makeStyles(theme => ({
	form:{
		display: 'flex',
		flexDirection: 'column',
		width: '40rem',
		paddingLeft: '10px',
		gap: '1rem'   
	},
	btnSection:{
		paddingTop: '10px',
		display: 'flex',
		flexDirection: 'row',
		gap: '1rem'   
	}
}));

/* eslint-disable react/prop-types */
import React from 'react';
import { Skeleton } from '@mui/material';

const Loading = ({children}) => {
	return(
		<>
			<div style={{paddingBottom: 20}}>
				<Skeleton width={1000} height={50}>{children}</Skeleton>
				<div style={{paddingLeft:70, paddingTop:10}}>
					<Skeleton width={500} height={40}>{children}</Skeleton>
					<br/>
					<Skeleton width={500} height={40}>{children}</Skeleton>
				</div>
			</div>
			<div style={{paddingDown:20}}>
				<Skeleton width={1000} height={50}>{children}</Skeleton>
				<div style={{paddingLeft:70, paddingTop:10}}>
					<Skeleton width={500} height={40}>{children}</Skeleton>
					<br/>
					<Skeleton width={500} height={40}>{children}</Skeleton>
				</div>
			</div>
		</>
	);
};

export default Loading;
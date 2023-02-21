import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Welcome extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className='container'>
				<h2 className='mt-title font-bold text-2xl'>
					Welcome to Users Module
				</h2>

				<h4 className='titles font-semibold'>Existing Users</h4>
				<Link to='/login'>
					<input
						className='btn border-black border-2'
						type='button'
						value='Login'
					/>
				</Link>

				<h4 className='titles font-semibold'>New Users</h4>
				<Link to='/register'>
					<input
						className='btn border-black border-2'
						type='button'
						value='Register'
					/>
				</Link>
			</div>
		);
	}
}

export default Welcome;

import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export class Nav extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
		localStorage.removeItem('loggedIn');
	}

	render() {
		return (
			<>
				<nav className='tabs' id='tabs'>
					<NavLink
						to='/chat'
						className={({ isActive }) =>
							isActive ? 'tab active' : 'tab'
						}
					>
						Group Chat
					</NavLink>
					<NavLink
						to='/users-list'
						className={({ isActive }) =>
							isActive ? 'tab active' : 'tab'
						}
					>
						Manage Users
					</NavLink>
					<NavLink
						to='/documents-list'
						className={({ isActive }) =>
							isActive ? 'tab active' : 'tab'
						}
					>
						Manage Documents
					</NavLink>
					<NavLink onClick={this.logOut} to='/logout' className='tab'>
						Logout
					</NavLink>
				</nav>

				<Outlet />
			</>
		);
	}
}

export default Nav;

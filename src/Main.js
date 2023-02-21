import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/style.css';
import Nav from './pages/components/Nav';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';
import LoginSuccess from './pages/LoginSuccess';
import Chat from './pages/GroupChat';
import ManageUsers from './pages/ManageUsers';
import EditUser from './pages/EditUser';
import ManageDocuments from './pages/ManageDocuments';
import Share from './pages/Share';
import Logout from './pages/Logout';
import ProtectedRoute from './utils/ProtectedRoute';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
library.add(faXmark, faCaretDown);

export class Main extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route path='/welcome' element={<Welcome />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/register-success'
						element={<RegisterSuccess />}
					/>
					<Route element={<ProtectedRoute />}>
						<Route path='/' element={<Nav />}>
							<Route index element={<LoginSuccess />} />
							<Route
								path='users-list'
								element={<ManageUsers />}
							/>
							<Route
								path='edit-user/:id'
								element={<EditUser />}
							/>
							<Route path='chat' element={<Chat />} />
							<Route
								path='documents-list'
								element={<ManageDocuments />}
							/>
							<Route path='/share/:id' element={<Share />} />
						</Route>
					</Route>
					<Route path='logout' element={<Logout />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

export default Main;

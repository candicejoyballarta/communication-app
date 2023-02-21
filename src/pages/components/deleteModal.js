import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DeleteModal = (props) => {
	const handleClose = () => props.onClose();

	return (
		<div
			id='delete-modal'
			className='modal center'
			style={{ display: props.show }}
		>
			<div className='modal-header'>
				<span className='header'>{props.title}</span>
				<span
					className='close right'
					id='user-close'
					onClick={handleClose}
				>
					<FontAwesomeIcon icon='fa-solid fa-xmark' fontSize='20' />
				</span>
			</div>
			<form className='modal-body'>
				<div className='modal-question'>
					<img
						src='./images/question-mark.png'
						alt='question mark'
						className='modal-icon'
					/>
					<p>
						<b>Are you sure ?</b>
					</p>
				</div>
				<div className='modal-buttons'>
					<input
						type='submit'
						value='ok'
						id='delete-btn'
						onClick={props.onDelete}
					/>
					<input
						type='button'
						value='Cancel'
						id='cancel-btn'
						onClick={handleClose}
					/>
				</div>
			</form>
		</div>
	);
};

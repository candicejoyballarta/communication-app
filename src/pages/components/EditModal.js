import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditModal = (props) => {
	const [label, setLabel] = useState(props.doc.label);
	const [labelErr, setLabelErr] = useState('');

	const handleLabelChange = (e) => {
		setLabel(e.target.value);
		setLabelErr('');
	};
	const handleClose = () => props.onClose();
	const handleUpdate = (e) => {
		e.preventDefault();

		// Validate Input
		let hasErrors = false;
		const newLabel = label.trim();

		if (!newLabel) {
			setLabelErr('File Label is required');
			hasErrors = true;
		} else {
			setLabelErr('');
		}

		if (!hasErrors) {
			props.onUpdate(newLabel);
			props.onClose();
		}
	};

	React.useEffect(() => {
		setLabel(props.doc.label);
	}, [props.doc]);

	return (
		<div
			id='edit-modal'
			className='modal center'
			style={{ display: props.show }}
		>
			<div className='modal-header'>
				<span className='header'>Edit</span>
				<span
					className='close right'
					id='edit-close'
					onClick={handleClose}
				>
					<FontAwesomeIcon icon='fa-solid fa-xmark' fontSize='20' />
				</span>
			</div>
			<form onSubmit={handleUpdate} className='modal-body'>
				<div className='form-input'>
					<label>Label</label>
					<input
						type='text'
						name='label'
						value={label}
						id='new-label'
						onChange={handleLabelChange}
					/>
					{labelErr ? <p className='error ml-28'>{labelErr}</p> : ''}
				</div>

				<div className='modal-buttons'>
					<input type='submit' value='Save' id='edit-save' />
					<input
						type='button'
						value='Cancel'
						id='edit-cancel'
						onClick={handleClose}
					/>
				</div>
			</form>
		</div>
	);
};

export default EditModal;

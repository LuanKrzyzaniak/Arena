import React from 'react';

import './style.css';

function FormSubmitButton(props) {
    return (
        <button className='FormSubmitButton-btn'>
            {props.content}
        </button>
    );
}

export default FormSubmitButton;
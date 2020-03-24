import React from 'react';

import './imageLinkForm.css';

const ImageLinkForm = ({ onPictureSubmit, onInputChange}) => {
    return (
        <div>
            <p className='f3'>{'Try face recognition'}</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-3'>
                    <input onChange={onInputChange} className='f4 pa2 w-70 center' type='text'/>
                    <button onClick={onPictureSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
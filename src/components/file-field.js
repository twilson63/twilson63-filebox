import React from 'react'
import FileInput from 'react-file-input'

const FileField = props => {
  const width = props.width ? `w-${props.width}` : 'w-100'
  return (
    <div className='measure'>
      <label htmlFor={props.label} className='f6 b db mb2'>
        {props.label}
        {' '}
        {props.optional && <span className='normal black-60'>(optional)</span>}
      </label>
      <FileInput
        id={props.label}
        className={`ba pa2 mb2 br2 db b--green ${width}`}
        accept='.mp4'
        placeholder='Click Here to Attach File'
        onChange={props.onChange}
      >
        <button>Upload</button>
      </FileInput>
      <small className='f6 black-60 db mb2'>{props.help}</small>
    </div>
  )
}

FileField.propTypes = {
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  help: React.PropTypes.string,
  optional: React.PropTypes.bool,
  width: React.PropTypes.string
}

export default FileField

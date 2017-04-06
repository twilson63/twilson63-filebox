import React from 'react'
import { connect } from 'react-redux'
import cuid from 'cuid'
import { identity, merge, equals } from 'ramda'
import { TextField, Button } from 'jrs-react-components'
import FileField from '../components/file-field'

const FileForm = props => {
  return (
    <div className='pa4 center w-50'>
      <h2>Upload File</h2>
      {props.error && (
      <div className='ba pa3 br2 mb2 b--red bg-light-gray black-80'>
        <h3 className='red'>An Error had occured</h3>
        <ul><li>{props.error}</li></ul>
      </div>
          )}
      <FileField
        label='Select File'
        onChange={e => {
          const file = e.target.files[0]
          props.dispatch({
            type: 'SET_VIDEO',
            payload: {
              _attachments: { [file.name]: { type: file.type, data: file } }
            }
          })
        }}
      />
      <TextField
        label='File Name'
        help='provide a name for your file'
        value={props.video.name}
        onChange={e => {
          props.dispatch({
            type: 'SET_VIDEO',
            payload: { name: e.target.value }
          })
        }}
      />
      <Button
        onClick={e => {
          if (equals(props.video.name, '')) {
            return props.dispatch({
              type: 'SET_ERROR',
              payload: 'File Name Required!'
            })
          }
          props.db
              .put(
                merge(props.video, { _id: 'video-' + cuid(), type: 'video' })
              )
              .then(res => {
                if (res.ok) {
                  props.history.push('/')
                }
              })
              .catch(err => {
                props.dispatch({ type: 'SET_ERROR', payload: err.message })
              })
        }}
      >Upload</Button>
    </div>
  )
}

const connector = connect(identity)

export default connector(FileForm)

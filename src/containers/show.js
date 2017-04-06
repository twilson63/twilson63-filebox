import React from 'react'
import { identity, propEq, find, keys, head } from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const FileShow = React.createClass({
  componentDidMount () {
    this.props.db
      .get(this.props.match.params.id)
      .then(doc => {
        this.props.dispatch({ type: 'SET_VIDEO', payload: doc })
        return doc
      })
      .then(doc => {
        this.props.db
          .getAttachment(doc._id, head(keys(doc._attachments)))
          .then(
            file =>
              this.props.dispatch({
                type: 'SET_SRC',
                payload: window.URL.createObjectURL(file)
              })
          )
      })
  },
  render () {
    const { props } = this
    return (
      <div className='center w-75-ns pa0-ns w-100 pa4'>
        <h2>{props.video.name}</h2>
        <video
          className='mt2 w-100'
          controls
          src={props.src}
          type='video/mp4'
        />
        <div className='mt2 w-100'>
          <Link className='mt2 ba br2 pa2 green b--green white w-100' to='/'>
            Return
          </Link>
        </div>
      </div>
    )
  }
})

export default connect(identity)(FileShow)

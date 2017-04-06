import React from 'react'
import { List, ImageListItem } from 'jrs-react-components'
import { Link } from 'react-router-dom'
import { map, identity } from 'ramda'
import { connect } from 'react-redux'

const FileList = props => {
  return (
    <div className='center w-50'>
      <h2 className='dark-green'>File Box List</h2>
      <List>
        {map(
            v => (
              <ImageListItem
                key={v._id}
                image='http://fillmurray.com/200/200'
                title={v.name}
                link={(
                  <Link
                    className='link ba br2 gray pa2 hover-bg-gray hover-white-80'
                    to={`/${v._id}`}
                    >
                      Show
                    </Link>
                  )}
              />
            ),
            props.videos
          )}
      </List>
    </div>
  )
}

export default connect(identity)(FileList)

import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import FileForm from './containers/form'
import FileList from './containers/index'
import FileShow from './containers/show'

const App = props => {
  return (
    <BrowserRouter>
      <div>
        <header className='pa4 bg-dark-green white-60 bb b--green'>
          <div className='cf'>
            <div className='fr'>
              <Link
                className='ba link pa2 br2 bg-white-60 dark-green hover-black'
                to='/new'
              >
                Upload
              </Link>
            </div>
          </div>
          <h1>
            <Link className='link white-60' to='/'>twilson63 File Box</Link>
          </h1>
        </header>
        <main>
          <Route exact path='/' component={FileList} />
          <Switch>
            <Route path='/new' component={FileForm} />
            <Route path='/:id' component={FileShow} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

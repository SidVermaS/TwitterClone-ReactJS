import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetch, save, clear } from './actions/profileActions'
import Welcome from './components/pages/Welcome'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Sidebar from './components/Sidebar'
import Options from './components/Options'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'


import './App.css';

const menuRoutes=[
  {
    path: '/',
  },
  {
    path: '/explore',
  },
  {
    path: '/search',
  },
  {
    path: '/notifications',
  },
  {
    path: '/messages',
  },
  {
    path: '/bookmarks',
  },
  {
    path: '/lists',
  },
  {
    path: '/profile',
  },
]

function SecuredRoute(props)    {
  useEffect((props1)=>  {
    console.log('~~ sr: ',props.path, 'profile: ',props.profile)
  })
  return (
    <Route path={props.path} render={data=>
      ((props.profile===undefined || props.profile===null) && props.path!=='/login')?(<Redirect to={{pathname: '/welcome'}}></Redirect>):
      // (<Redirect to={{pathname: props.path}}></Redirect>)}></Route>
      (<props.component profile={props.profile} {...data}></props.component>)}></Route>
      
  )
}
function UnsecuredRoute(props)  {
  return (
    <Route path={props.path} render={data=>(props.profile===undefined || props.profile===null)?(<props.component {...data}></props.component>):<Redirect to={{pathname: '/'}}></Redirect>}></Route>
  )
}
function App(props) {
  const [profile, setProfile]=useState(JSON.parse(localStorage.getItem('profile')))
  
  useEffect((props1)=>{
    props.fetch()
    console.log('~~~ App: ',profile)
  },[profile])
  return (
    <div style={{display: "flex"}}>
      <Sidebar  />
      <div className="App__main">
        <Switch>       
          <SecuredRoute exact path="/" component={Home} profile={profile}></SecuredRoute>
          <SecuredRoute path="/profile" component={Profile} profile={profile}></SecuredRoute>

          <UnsecuredRoute path="/welcome" component={Welcome} profile={profile} ></UnsecuredRoute>
          <UnsecuredRoute path="/login" component={Login} profile={profile} ></UnsecuredRoute>
          <UnsecuredRoute path="/register" component={Register} profile={profile}></UnsecuredRoute>
          
        </Switch>
      </div>
      <Options  />
    </div> 
  )
}
export default connect(null, { fetch })(App)



















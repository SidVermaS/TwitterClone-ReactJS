import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetch } from './actions/profileActions'
import { setPagePath } from './actions/pagePathActions'

import Welcome from './components/pages/Welcome'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Sidebar from './components/Sidebar'
import Options from './components/Options'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import Lists from './components/pages/Lists'

import './App.css';




function SecuredRoute(props)    {
  useEffect((props1)=>  {
    console.log('~~~ SecuredRoute: ',props.profile)
    props.setPagePath(props.path)
  }, [])
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
    // setProfile(JSON.parse(localStorage.getItem('profile')))
    console.log('~~~ App: ',profile)
  },[profile,])
  return (
    <div style={{display: "flex"}}>
      {profile && <Sidebar profile={profile}  />}
      <div className={profile?"App__main":'App__main_logged_out'}>
        <Switch>       
          <SecuredRoute exact path="/" component={Home} profile={profile} setPagePath={props.setPagePath} />
          <SecuredRoute path="/profile/:username" component={Profile} profile={profile} setPagePath={props.setPagePath} />
          <SecuredRoute path="/lists" component={Lists} profile={profile} setPagePath={props.setPagePath} />
          <UnsecuredRoute path="/welcome" component={Welcome} profile={profile} />
          <UnsecuredRoute path="/login" component={Login} profile={profile} />
          <UnsecuredRoute path="/register" component={Register} profile={profile} />
          
        </Switch>
      </div>
      {profile && <Options  />}
    </div> 
  )
}
export default connect(null, { fetch, setPagePath })(App)



















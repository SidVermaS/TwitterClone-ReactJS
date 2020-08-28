import React, { useEffect } from 'react'
import { Switch, Route, Redirect, } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetch, save, clear } from './actions/profileActions'
import Welcome from './components/pages/Welcome'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Sidebar from './components/Sidebar'
import Home from './components/pages/Home'

import './App.css';


function SecuredRoute(props)    {
  useEffect((props1)=>  {
    console.log('~~ sr: ',props.path)
  })
  return (
    <Route path={props.path} render={data=>
      ((props.profileData===undefined || props.profileData===null) && props.path!=='/login')?(<Redirect to={{pathname: '/welcome'}}></Redirect>):(<props.component {...data}></props.component>)}></Route>
  )
}
function UnsecuredRoute(props)  {
  return (
    <Route path={props.path} render={data=>(props.profileData===undefined || props.profileData===null)?(<props.component {...data}></props.component>):<Redirect to={{pathname: '/'}}></Redirect>}></Route>
  )
}
function App(props) {
  
  useEffect((props1)=>{
    props.fetch()
  },[])
  return (
    <div style={{display: "flex"}}>
      <Sidebar  />
        <Switch>       
          <SecuredRoute exact path="/" component={Home} profileData={props.profile}></SecuredRoute>
          
          <UnsecuredRoute path="/welcome" component={Welcome} profileData={props.profile} ></UnsecuredRoute>
          <UnsecuredRoute path="/login" component={Login} profileData={props.profile} ></UnsecuredRoute>
          <UnsecuredRoute path="/register" component={Register} profileData={props.profile}></UnsecuredRoute>
          
        </Switch>
    </div> 
  )
}
const mapStateToProps=state=>({
  profile: state.profile.profile
})
export default connect(mapStateToProps, { fetch })(App)



















import React from 'react'
import { Switch, Route, Redirect, } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetch } from './actions/profileActions'
import Welcome from './components/Welcome'
// import Login from './components/Login'
import Home from './components/Home'

function SecuredRoute(props)    {
    return (
        <Route path={props.path} render={data=>props.profile===undefined?(<Redirect to={{pathname: '/welcome'}}></Redirect>):(<props.component {...data}></props.component>)}></Route>
    )
}

function Main(props)    {
    return (
        <div>
            
            <Switch>
                <SecuredRoute path="/welcome" component={Welcome} />
                <SecuredRoute path="/" component={Home} />
            </Switch>
        </div>
    )
}
const mapStateToProps=state=>({
    profile: state.profile
})


export default connect(mapStateToProps, { fetch })(Main)
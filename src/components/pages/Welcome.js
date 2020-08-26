import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {Search, People, Chat} from 'react-bootstrap-icons'

import {  save  } from '../../actions/profileActions'
import APICalls from '../../networks/APICalls'

import {ReactComponent as TwitterLoginBg } from '../../assets/images/twitter_login_bg.svg'
import {ReactComponent as TwitterLogoSm } from '../../assets/images/twitter_logo_sm.svg'
import '../../css/Welcome.css'

function ActionPanel(props)   {

    return (
        <div className="Welcome__action_panel">            
            <div className="Welcome__action_content">
                <TwitterLogoSm className="twitter_logo_sm" />
                <div className="Welcome__msg1">
                    See what’s happening in the world right now
                </div>
                <div className="Welcome__msg2">Join Twitter today.</div>
                <button className="Welcome__sign_up_btn btn btn-block">Sign up</button>   
                <button className="Welcome__login_btn btn btn-block" onClick={props.navigateToLogin}>Log In</button>
            </div>
        </div>
    )
  
}
 function DetailsPanel(props)   {
    const detailItems=new Map([['Follow your interests.', Search], ['Hear what people are talking about.', People], ['Join the conversation.', Chat]])
   
    return (
        <div className="Welcome__details_panel">
            <TwitterLoginBg className="Welcome__twitter_logo_lg" />
            {/* <div className="details_bg"> </div> */}
                {/* {props.detailItems.forEach((value, key)=><DetailsItem key={key.substring(0,1)} Icon={value} text={key} />
                )} */}
            {/* <div className=" mx-auto"> */}
                <table className="Welcome__details_list">
                    <tbody>
                        <DetailsItem Icon={Search} text='Follow your interests.' />
                        <DetailsItem Icon={People} text='Hear what people are talking about.' />
                        <DetailsItem Icon={Chat} text='Join the conversation.' />
                    </tbody>    
                </table>
            {/* </div> */}
        </div>
    )
 }
 function DetailsItem({Icon, text}) {
    
    return (
        <tr>
            <td>
                <Icon className="Welcome__icon" />
            </td>
            <td>
                &nbsp;&nbsp;
            </td>
            <td>
                <span className="Welcome__details_text">{text}</span>
            </td>
        </tr>
    )
}
function Welcome(props)   {
    const apiCalls=new APICalls({})
    const [isDesktop, setIsDesktop]=useState(true)
    const [overflow, setOverflow]=useState('hidden')
    useEffect((props1)=>  {
        document.body.style.overflowX='hidden'
        window.addEventListener('resize', screenSizeChanged)
       
        // test()
        return ()=> {
            window.removeEventListener('resize', screenSizeChanged)
        }   
    },[isDesktop, overflow])

    const test=async ()=>  {
        localStorage.setItem('user', JSON.stringify({ name: 'Akash Naik', username: 'akashnaik' }))



        // const data={ username: 'akashnaik', password: '123456' }
        // const { status, body }=await apiCalls.postRequest(apiCalls.login, data)
        // console.log('~~~ api: ', status, ' body: ',body)

    }
    const screenSizeChanged=()=>{
        setIsDesktop(window.innerWidth>800)
        document.body.style.overflow=isDesktop?'hidden':'visible'
        console.log('ow: ',document.body.style.overflow, ' ', isDesktop)
        setOverflow(document.body.style.overflow)
        console.log('ow: ',document.body.style.overflow, ' ', isDesktop)
    }
    function navigateToLogin()  {
        props.history.push('/login')
    }
    return (
        
        <div className="login">
            {isDesktop?(<div className="row">
                <div className="col">
                    <DetailsPanel />
                </div>
                <div className="col">
                    <ActionPanel navigateToLogin={navigateToLogin} />
                </div>
            </div>):(<div className="col">                
                <div className="row">
                    <ActionPanel navigateToLogin={navigateToLogin} />
                </div>
                <div className="row">
                    <DetailsPanel />
                </div>
            </div>)}
            
        </div>
        
    )
}
const mapStateToProps=state=>({
    profile: state.profile
})
export default connect(mapStateToProps, { save })(Welcome)
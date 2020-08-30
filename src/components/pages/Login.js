import React, { useEffect, useState, useRef  } from 'react' 
import { connect } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

import { save, fetch } from '../../actions/profileActions'
import APICalls from '../../networks/APICalls'

import Toast from '../widgets/Toast'
import {ReactComponent as TwitterLogoSm } from '../../assets/images/twitter_logo_sm.svg'
import '../../css/Login.css'

function Login(props)    {
    const apiCalls=new APICalls({  })
    const messageRef=useRef()
    useEffect(()=>{
        console.log('~~~ props: login')
        console.log('~~~ messageRef.current: ',messageRef.current)
    },[])

    return (
        <Formik initialValues={{
            username_or_email: '',
            password: ''
        }} validationSchema={yup.object({
            username_or_email: yup.string().min(3,'Username/Email should be atleast 3 characters').max(15,'Username/Email should not exceed 20 characters').required('Please enter username/email'),
            password: yup.string().min(3,'Password should be atleast 3 characters').max(15,'Password should not exceed 32 characters').required('Please enter password'),
        })}
        onSubmit={values=>{
            loginUser(values)
        }}
        >
        {    
            props=>(                
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-lg-6 col-md-9 col-sm-9 col-xs-10 mx-auto mt-4 text-center">
                        <Toast ref={messageRef} />
                            <TwitterLogoSm className="twitter_logo_sm" />
                            <div className="Login__msg1">Log in to Twitter</div>
                            <Form className="text-left">
                                    <div className="form-group Login__bg Login__username_or_email_group">
                                        <label className="Login__username_or_email_label Login__label_text" htmlFor="Login__username_or_email">
                                            Phone, email, or username
                                        </label>
                                        <Field className="form-control Login__form-control Login__bg" name="username_or_email" type="text"  />
                                        {/* <ErrorMessage name="username_or_email"  /> */}
                                    </div>
                                    <div className="form-group Login__bg Login__password_group">
                                        <label className="Login__password_label Login__label_text" htmlFor="password">
                                            Password
                                        </label>
                                        <Field className="form-control Login__form-control Login__bg" name="password" type="password"  />
                                        {/* <ErrorMessage name="password"  /> */}
                                    </div>

                                    <button type="submit" className="Login__login_btn btn btn-block" disabled={!props.isValid}>Log in</button>   
                            </Form>
                            <span className="Login__links">
                                <Link to="">Forgot password?</Link>
                                    &nbsp;·&nbsp;
                                <Link to="">Sign up for Twitter</Link>
                            </span>    
                            
                        </div>
                    </div>                    
                </div>
            )
        }
        </Formik>
    )

    async function loginUser(values)    {
        const formData={ username: values.username_or_email, password: values.password }
        const { status, body }=await apiCalls.postRequest(apiCalls.login, formData)        

        if(status===200)    {
            console.log(`~~~ au: ${body['profile']}`)
            body['profile']['authorization']=`bearer ${body['profile']['authorization']}`
            props.save(body['profile'])
        }   else    {
            messageRef.current.displayToast(body['message'])
        }

    }
}

const mapStateToProps=state=>({
    profile: state.profile
})

export default connect(mapStateToProps,{ save })(Login)
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { Button, Modal } from 'react-bootstrap'

import Toast from '../widgets/Toast'

import { ReactComponent as ArrowLeft } from '../../assets/images/arrow_left.svg'
import { ReactComponent as AddList } from '../../assets/images/add_list.svg'
import { ReactComponent as More } from '../../assets/images/more.svg'
import { ReactComponent as Cross } from '../../assets/images/cross.svg'

import APICalls from '../../networks/APICalls'

import '../../css/Lists.css'

function Lists(props)   {

    const apiCalls=new APICalls({ profile: props.profile })

    const messageRef=useRef()

    const [show, setShow] = useState(false),
    handleClose = () => setShow(false),
    handleShow = () => setShow(true);

    const submitList=async (values)=> {
        const formData={
            name: values.name,
            description: values.description,
            profile_id: values.profile_id, 
        }
        const { status, body }=await apiCalls.postRequest(apiCalls.list, formData)

    
        if(status===201)    {
            console.log(`~~~ au: ${body}`)
            
        }
        if(body['message']) {
            messageRef.current.displayToast(body['message'])
        }
    }

    useEffect((props1)=>    {

    },[])

    const NewList=()=>(
    <Formik initialValues={{
        name: '',
        description: '',
        private: false,
    }} validationSchema={yup.object({
        name: yup.string().min(1, 'Name should have atleast 1 character').max(25).required('Please enter name'),
        description: yup.string().max(100),
        private: yup.bool()
    })}
    onSubmit={values=>{
        submitList(values)
    }}>
    {props=>
        (
        
        <Modal show={show} onHide={handleClose} size="lg"
        centered className="List__modal">
       <div className="List__modal_header d-flex justify-content-between align-items-center ">
            <div className="d-flex justify-content-between align-items-center">
                <Cross className="App__icon" />
                <span className="List__modal_title">Create a new List</span>
            </div>
            <button type="button" className="Lists__btn" disabled={!props.isValid}>Next</button>
       </div>
       <div className="List__modal_line"></div>        
        <div className="List__modal_photo"></div>
       <div className="List__modal_body">
            <Form className="text-left">
                <div className="List__form_group List__form_input_bg form-group">
                    <label className="List__label_text" htmlFor="name">
                        Name
                    </label>
                    <Field className="List__input List__form_input_bg form-control" name="name" type="text" />                    
                </div>
                <div className="List__form_group text-right">{props.values.name.length}/25</div>

                <div className="List__form_group List__form_input_bg form-group">
                    <label className="List__label_text" htmlFor="description">
                        Description
                    </label>
                    <Field className="List__input List__form_input_bg form-control" name="description" type="text"  />
                </div>    
                <div className="List__form_group text-right">{props.values.description.length}/100</div>
                <div className="d-flex justify-content-between">
                    <div>Make private</div>
                    <Field type="checkbox" checked={props.values.private} name='private' />
                </div>
                <div className="List__form_group List__note">When you make a List private, only you can see it.</div>
                
            </Form>
       </div>
  </Modal>)}</Formik>)

    return (
     
   
            <div className="Lists__header d-flex justify-content-between align-items-center">
                <NewList    />
                <div className="d-flex align-items-center">
                    <ArrowLeft className="App__back_icon"  />
                    <span className="">
                        <div className="">Lists</div>
                        <div className="Lists__username">@{props.profile.username}</div>
                    </span>                   
                </div>
                <div className="">
                    <span onClick={handleShow}><AddList className="App__icon"  /></span>
                    <More className="App__icon Lists__more_icon" />
                </div>
            </div>




    )
}

export default Lists
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { Button, Modal } from 'react-bootstrap'

import List from '../widgets/List'
import Toast from '../widgets/Toast'

import { ReactComponent as ArrowLeft } from '../../assets/images/arrow_left.svg'
import { ReactComponent as AddList } from '../../assets/images/add_list.svg'
import { ReactComponent as AddPhoto } from '../../assets/images/add_photo.svg'
import { ReactComponent as More } from '../../assets/images/more.svg'
import { ReactComponent as Cross } from '../../assets/images/cross.svg'


import APICalls from '../../networks/APICalls'

import '../../css/Lists.css'

function Lists(props)   {

    const apiCalls=new APICalls({ profile: props.profile })

    const fileRef=useRef(null)
    const messageRef=useRef()

    const [photoFile, setPhotoFile]=useState(null),
        [photoUrl, setPhotoUrl]=useState(null)

    let [lists, setLists]=useState([]), [index, setIndex]=useState(-1)

    const [show, setShow] = useState(false)

    const handleClose = ()=> {
        setPhotoFile(null)
        setPhotoUrl(null)
        setShow(false)
    }     
    const handleShow = () => setShow(true);

    const selectImage=()=>  {
        fileRef.current.click()
    }

    const fileSelectedHandler=e=>{
        setPhotoFile(e.target.files[0])
        
        if(e.target.files[0])  {
            console.log('~~~ url: ',URL.createObjectURL(e.target.files[0]))
            setPhotoUrl(URL.createObjectURL(e.target.files[0]))
        }   else    {
            setPhotoUrl(null)
        }
    }
    
    const uploadPhoto=async ()=>    {
        const formData=new FormData()
        formData.append('file', photoFile)
        const { status, body }=await apiCalls.postFormDataRequest(`${apiCalls.upload}?file_type=lists`,formData)
        if(status===201)    {

        }   else    {  
            if(body['message']) {
                props.showToast(body['message'])
            }
        }
        return body['photo_url']
    }
    const submitList=async (values)=> {
        const formData={
            name: values.name,
            description: values.description,
            profile_id: props.profile._id, 
        }
        if(photoFile)   {
            formData.photo_url_list=await uploadPhoto()
            console.log('~~~ photo_url_list: ',formData.photo_url_list)
        }

        if((photoFile && formData.photo_url_list) || !photoFile)    {

            const { status, body }=await apiCalls.postRequest(apiCalls.list, formData)

        
            if(status===201)    {
                body['list']['profile']=[{_id: props.profile._id, name: props.profile.name, username: props.profile.username, photo_url_profile: props.profile.photo_url_profile}]
                lists.unshift(body['list'])
                setLists([...lists])

                handleClose()
            }
            if(body['message']) {
                messageRef.current.displayToast(body['message'])
            }
        }
    }

    const fetchList=async ()=>    {
        setIndex(index++)

        const { status, body }=await apiCalls.getRequest(`${apiCalls.list}?_id=${props.profile._id}&index=${index}`)
        if(status===200)    {
            lists.push(...body['lists'])
            setLists([...lists])
            console.log('~~~ setLists: ',lists)
        }   else if(body['message']) {
            messageRef.current.displayToast(body['message'])
        }

    }

    useEffect((props1)=>    {
        fetchList()
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
        <Form className="text-left">
       <div className="List__modal_header d-flex justify-content-between align-items-center ">
            <div className="d-flex justify-content-between align-items-center">
                <Cross className="App__icon" onClick={handleClose} />
                <span className="List__modal_title">Create a new List</span>
            </div>
            <button type="submit" className="Lists__btn" disabled={!props.isValid}>Next</button>
       </div>
       <div className="List__modal_line"></div>        
        <input type="file" hidden ref={fileRef} onChange={fileSelectedHandler}   />
        {!photoUrl && <div className="row justify-content-center align-items-center List__modal_photo List__modal_photo_div" ><AddPhoto className="List__add_photo_icon" onClick={selectImage} /></div>}
        {photoUrl && <div className="row justify-content-center align-items-center List__modal_photo" style={{backgroundImage: "url("+photoUrl+")", backgroundPosition: 'cover', backgroundSize: 'fill' }} ><AddPhoto className="List__add_photo_icon" onClick={selectImage} /></div>}    
       <div className="List__modal_body">
         
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
                
            
        
       </div>
       </Form>
       </Modal>
       
 )}</Formik>)

    return (
        <div className="Lists__bg">
            <Toast ref={messageRef} />
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
            <div className="Lists__header">Your Lists</div>
            <div className="">
                {
                    lists.map((list, index)=>(
                        <List key={list._id} index={index} list={list} profile={list.profile[0]} baseUrlProfilePhoto={apiCalls.baseUrlProfilePhoto} baseUrlListPhoto={apiCalls.baseUrlListPhoto} />
                    ))
                }
            </div>
        </div>
    )
}

export default Lists
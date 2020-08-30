import React, { forwardRef, useImperativeHandle } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toast=forwardRef((props, ref)=>   {
    useImperativeHandle(ref, ()=>    ({
        displayToast(message)    {
            toast.info(message)
        }
    }))
    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                closeButton={false}
                pauseOnFocusLoss
                draggable={false}
                limit={1}
                 // style={Toost__twitter_toast}
            />
        </div>
    )
})
const Toost__twitter_toast={
    background: "var(--twitter-login-dark)"
}
export default Toast
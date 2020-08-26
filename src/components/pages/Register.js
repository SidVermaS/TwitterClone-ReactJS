import React, { useEffect } from 'react'

function Register(props)   {
    useEffect(()=>  {
        console.log('~~~ Register')
    })

    return (
        <div>
            <h1>
                Register, we are
            </h1>
            <h1>
                gonna display the components
            </h1>
        </div>
    )
}
export default Register
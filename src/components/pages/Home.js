import React, { useEffect } from 'react'
import { connect } from 'react-redux'
function Home(props)   {
    useEffect((props1)=>  {
    },[])
    return (
        <div>
            <h1>
                Home
            </h1>
        </div>
    )
}
const mapStateToProps=state=>({
    profile: state.profile.profile
})
export default connect(mapStateToProps, {  })(Home)
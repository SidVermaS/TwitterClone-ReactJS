import React from 'react'
import { connect } from 'react-redux'

function Profile(props) {
    return (
        <div>
            <h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1>
        </div>
    )
}
const mapStateToProps=state=>({
    profile: state.profile.profile
})
export default connect(mapStateToProps, {  })(Profile)
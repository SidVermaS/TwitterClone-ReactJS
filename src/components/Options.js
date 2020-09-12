import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'






import {ReactComponent as Search } from '../assets/images/sidebar_items/search.svg'

import '../css/Options.css'

function Options(props) {
    return (
        <div className="Options__bg sticky-top">
            <div className="Options__search sticky-top">
                <Search className="Options__search_icon" />
                <input type="text" placeholder="Search Twitter"  />
            </div>
            <div className="Options__content">
                <div className="Options__whats_happening">What’s happening</div>
                <div className="Options__tweet_embeded">
                    <TwitterTweetEmbed tweetId={"1285823427002068997"}  />
                </div>



            </div>
        </div>
    )
}

export default Options
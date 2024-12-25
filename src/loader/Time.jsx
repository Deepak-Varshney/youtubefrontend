import moment from 'moment'
import React from 'react'

function Time({ time }) {
    const videoTime = moment()?.startOf("day").seconds(time).format("H:mm:ss")

    return (
        <div>
            <span className='bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded-md absolute'>{videoTime}</span>
        </div>
    )
}

export default Time

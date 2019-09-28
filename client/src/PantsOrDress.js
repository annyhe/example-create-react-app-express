import React, { Component } from 'react'
import './index.css'

export default class PantsOrDress extends Component {
    render() {
        const { top, bottom, dress } = this.props
        const _div = top ? (
            <div>
                <img className="tops" src={top} />
                <img className="bottom" src={bottom} />
            </div>
        ) : (
            <div>
                <img className="dress" src={dress} />
            </div>
        )

        return { ..._div }
    }
}
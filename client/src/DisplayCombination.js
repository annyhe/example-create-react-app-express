import React, { Component } from 'react'
import './index.css'

export default class DisplayCombination extends Component {
    render() {
        const {
            jacket,
            shoes,
            handbag,
            children,
            name,
            isFavorite,
            toggleFavorite,
        } = this.props
        let heartClass = 'heart'
        if (isFavorite) heartClass += ' active'
        return (
            <div className='imageContainer'>
                <img className="jacket" src={jacket} />
                {children}
                <img className="shoes" src={shoes} />
                <img className="handbag" src={handbag} />
                <button onClick={toggleFavorite} data-id={name} className={heartClass}>
                    &#9829;
                </button>
            </div>
        )
    }
}

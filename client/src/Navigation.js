import React from 'react'

const Navigation = props => {
    return (
        <div className="navigation">
            <button
                name="all"
                onClick={props.setActive}
                className={props.currentTabIs === 'all' ? 'active' : ''}
            >
                All
            </button>
            <button
                name="favorite"
                onClick={props.setActive}
                className={props.currentTabIs === 'favorite' ? 'active' : ''}
            >
                Favorites
            </button>
        </div>
    )
}

export default Navigation

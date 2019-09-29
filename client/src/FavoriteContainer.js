import React from 'react'
import DisplayCombination from './DisplayCombination'
import PantsOrDress from './PantsOrDress'
const DELIMITER = '#'

// given all clothing items and favorites, render favorites.
// if there are no favorites, say so
const FavoriteContainer = props => {
    const arr = Object.keys(props.favorites);
    return (
        <div>
            {arr.length === 0 && <p>You have not favorited anything yet!</p>}
            {arr.length > 0 && arr.map((key, index) => {
                const itemIndexes = key.split(DELIMITER)
                const _jacket = props.jacket.filter(
                    obj => obj.id === parseInt(itemIndexes[0])
                )[0]
                const _shoes = props.shoes.filter(
                    obj => obj.id === parseInt(itemIndexes[1])
                )[0]
                const _handbag = props.handbag.filter(
                    obj => obj.id === parseInt(itemIndexes[2])
                )[0]
                const obj = {
                    jacket: _jacket.url,
                    shoes: _shoes.url,
                    handbag: _handbag.url,
                }
                if (itemIndexes.length > 4) {
                    let _top = props.top.filter(
                        obj => obj.id === parseInt(itemIndexes[3])
                    )[0]
                    let _bottom = props.bottom.filter(
                        obj => obj.id === parseInt(itemIndexes[4])
                    )[0]
                    obj.top = _top.url
                    obj.bottom = _bottom.url
                } else {
                    let _dress = props.dress.filter(
                        obj => obj.id === parseInt(itemIndexes[3])
                    )[0]
                    obj.dress = _dress.url
                }
                return (
                    <div key={index}>
                        {key}
                        <DisplayCombination
                            {...obj}
                            isFavorite={true}
                            name={key}
                            toggleFavorite={props.toggleFavorite}
                        >
                            <PantsOrDress
                                top={obj.top}
                                bottom={obj.bottom}
                                dress={obj.dress}
                            />
                        </DisplayCombination>
                    </div>
                )
            })}
        </div>
    )
}

export default FavoriteContainer;
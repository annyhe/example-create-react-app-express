import React, { Component } from 'react'
import './index.css'

// Integer param
// returns 0 to endsAt - 1
function getRandom(endsAt) {
    return Math.floor(Math.random() * endsAt)
}
const shoes = [
    // korks black booties
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/07/24/5d38d78c1153ba071a94ee0b/m_5d38d7aeadb58dbeee6dd2d6.jpg',
    'https://m.media-amazon.com/images/I/61ZoPH1UygL._SR500,500_.jpg',
    // red booties
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/06/28/5d1671d219c157100dd6053f/m_5d1671f6afade89aecacde86.jpg',
    // red beautifeel
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/07/04/5d1e03dfbbf0768c475766bf/m_5d1e03ea79df27b717504250.jpg',
]
const bottoms = [
    // yellow skirt
    'https://shop.r10s.jp/crown-store/cabinet/item/112000/112800/112810-1.jpg',
    // black skirt
    'https://di2ponv0v5otw.cloudfront.net/posts/2018/11/12/5bea27e3077391d5aca5966f/m_5bea27e92e1478b30901b14c.jpeg',
    // high waisted black pants
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS3T61h_6pYUCujTemCuTPRp07RlqZ6eWD_rtEyOidSCdShiPqbZmg7zHRiGrhbkL8_FAzP-aTl6qTnInf-7N3jk3lojiM3da332XJ3EJvkkXucNqyDkY9D&usqp=CAc',
]
const handbags = [
    // green
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/05/05/5ccfc918bbf0760713618572/m_5ccfc93dabe1cef286261b78.jpg',
    // black
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/09/03/5d6ef71fc953d81fed1ca89a/m_5d6ef8348557afe6c97a24bc.jpg',
    // pink
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/08/21/5d5dc361e3775300c70b481c/m_5d5dc3648af9ff0a23109269.jpeg',
]
const jackets = [
    // black moto vest
    // black linen vest
    // black BR leather jacket
    // orange elie tahari
]
const dresses = [
    // elie tahari linen dress
    'https://dtpmhvbsmffsz.cloudfront.net/posts/2017/10/05/59d6a816620ff7d516038e5e/m_59d6a8252599fe829c037a89.jpg',
]
const tops = [
    // j crew perfect shirt
    'https://di2ponv0v5otw.cloudfront.net/posts/2019/07/26/5d3b8ab329f0302a53af50de/m_5d3b8afa138e1806d298c77a.jpg',
    // pink linen
    'https://i.ebayimg.com/images/g/r8cAAOSwJDVbLBnE/s-l300.jpg',
]

class PantsOrDress extends Component {
    render() {
        const _div = this.props.pantsOrDress ? (
            <div><img class="tops" src={tops[getRandom(tops.length)]} />
            <img class="bottoms" src={bottoms[getRandom(bottoms.length)]} /></div>
        ) : (
            <div><img class="dresses" src={dresses[getRandom(dresses.length)]} /></div>
        )

        return { ..._div }
    }
}

export default class Closet extends Component {
    state = {
        pantsOrDress: true,
    }
    togglePantsOrDress = () => {
        this.setState({ pantsOrDress: !this.state.pantsOrDress });
    }
    render() {
        return (
            <div>
                <h1>Closet match</h1>
                <button>
                    Generate matches for{' '}
                    {this.state.pantsOrDress ? 'top and pants' : 'dress'}
                </button>
                <button onClick={this.togglePantsOrDress}>Change to {!this.state.pantsOrDress ? 'top and pants' : 'dress'}</button>
                <div className="imageContainer">
                    <img class="shoes" src={shoes[getRandom(shoes.length)]} />
                    <img
                        class="handbags"
                        src={handbags[getRandom(handbags.length)]}
                    />
                    <PantsOrDress pantsOrDress={this.state.pantsOrDress} />
                </div>
            </div>
        )
    }
}

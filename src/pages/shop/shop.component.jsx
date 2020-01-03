import React ,{ Component } from "react";
import SHOP_DATA from './shop-data'
import './shop.styles.scss';
import PreviewCollection from '../../components/preview-collection/preview-collection.component'

class Shop extends Component {
    constructor(props){
        super(props);
        this.state = {
            collection : SHOP_DATA
        }
    }

    render () {
        const {collection} = this.state;
        return (
            <div className=''>
                {collection.map(({id,title,items,routeName})=>(
                    <PreviewCollection key={id} title={title} routeName={routeName} items={items} />
                ))}
            </div>
        )
    }
}

export default Shop;

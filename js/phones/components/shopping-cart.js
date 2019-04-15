import Component from './component.js';

export default class ShoppingCart extends Component{
	constructor({ element, phones = []}){
		super({ element });
		this._render;

	}

	_render(){
		this._element.innerHTML = ` 
		 <p>Shopping Cart</p>
            <ul>
                <li>phone</li>
            </ul>
		`
	}
}
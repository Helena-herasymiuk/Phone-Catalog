import Component from './component.js';

export default class ShoppingCart extends Component{
	constructor({ element, phones}){
		super({ element });
		this._render();
		this._phones = phones;
	}

	addToCart(id){
		const phoneName = this._phones.filter(phone=>{
			if(phone.id === id){
				return phone.name;
			}
			return;
		})
		const li = document.createElement('li');
		li.textContent = phoneName[0].name;
		this._element.querySelector('[data-element="carted-phones"]').appendChild(li);
	}

	_render(){
		this._element.innerHTML = ` 
		 <p>Shopping Cart</p>
            <ul data-element="carted-phones"> </ul>
		`
	}
}
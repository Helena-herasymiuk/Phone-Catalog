import Component from "./component.js"

export default class PhoneViewer extends Component{
    constructor({ 
      element,
    }){
      super({element});

      this.on('click','[data-element="back-button"]', (event) => {
        this.emit('back',);
      })

      this.on('click', '[data-element="small-preview"]', (event) => {
        const bigPreview = this._element.querySelector('[data-element="big-preview"]');
        bigPreview.src = event.target.src;
      })

      this.on('click','[data-element="add-to-cart"]',(event)=>{
            const phoneEl = event.target.closest('[data-element="phone-element"]');
            const phoneId = phoneEl.dataset.phoneId;
            this.emit('add-to-cart',phoneId)
        })
    }

  show(phoneDetails) {
    this._phoneDetails = phoneDetails;
    this._render();
    super.show(); 
    }



  _render() {
        this._element.innerHTML = `
        <img 
        class="phone" 
        src="${this._phoneDetails.images[0]}"
        data-element="big-preview"
        >
        <div  data-element="phone-element"
        data-phone-id=${this._phoneDetails.id}>
          <button data-element="back-button">Back</button>
         <button data-element="add-to-cart">Add to basket</button>
       </div>
    
        <h1>${this._phoneDetails.name}</h1>
    
        <p>${this._phoneDetails.description}</p>
    
        <ul class="phone-thumbs">
           ${this._phoneDetails.images.map(imageUrl => `
          <li>
            <img 
            src="${imageUrl}" 
            data-element="small-preview"
            >
          </li>
          `).join('')}
        </ul>
        `
    }
  }
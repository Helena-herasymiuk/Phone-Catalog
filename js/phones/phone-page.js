import PhonesCatalog from './components/phones-catalog.js';
import PhoneViewer from './components/phoneViewer.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesService from './services/phones-service.js';
import Filter from './components/filter.js';

export default class PhonesPage {
    constructor({ element }) {
        this._element = element;
        this._render();
        
        this._initFilter();
        this._initViewer();
        this._initCatalog();
        this._initCart();

    }

    _initCatalog(){
        this._catalog = new PhonesCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
        })

        this._showPhones();

        this._catalog.subscribe('phone-selected',  (id) => { 
            PhonesService.getById(id).then((phoneDetails)=>{
              this._catalog.hide();
              this._filter.hide();
              this._cart.hide();
              this._viewer.show(phoneDetails); 
        });
        })

        this._catalog.subscribe('add-to-cart', (id)=>{
            this._cart.addToCart(id);
        })
    }

    _initCart() {
        this._cart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]'),
            
        })
    }
    _initFilter() {
        this._filter = new Filter({
          element: this._element.querySelector('[data-component="filter"]'),
        });

        this._filter.subscribe('query-change', (eventData) => {
          this._showPhones();
        });

        this._filter.subscribe('order-change', (eventData) => {
          this._showPhones();
        });
    }

        _initViewer(){
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]')
        })

        this._viewer.subscribe('back',()=>{
            this._viewer.hide();
            this._filter.show();
            this._cart.show();
            this._showPhones();
        })

        this._viewer.subscribe('add-to-cart', (id)=>{
            this._cart.addToCart(id);
        })
    }

    async _showPhones(){
        this._currentFiltering = this._filter.getCurrent();
        const phones = await PhonesService.getAll(this._currentFiltering);
        this._catalog.show(phones);
    }

    _render() {
        this._element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
                <div data-component="filter"></div>
            </section>

            <section>
                <div data-component="shopping-cart"></div> 
            </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">     
            <div data-component="phone-viewer"></div>
            <div data-component="phone-catalog"></div>
        </div>
        </div>`
    }
}
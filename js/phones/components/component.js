export default class Component{
	 constructor({ element}) {
        this._element = element;
        this._callbackArray = {};
    }
    on( eventName, selector, callback ){
    	this._element.addEventListener(eventName, (event)=>{
    		const target = event.target.closest(selector);
    		if (!target){
    			return;
    		}

    		callback(event);
    	})
    }
    subscribe( eventName, callback ){
    	if(!this._callbackArray[eventName]){
    		this._callbackArray[eventName] = [];
    	}
    	this._callbackArray[eventName].push(callback);
    }

	emit( eventName, data){
		const callbacks = this._callbackArray[eventName];
        if (!callbacks) {
            return;
        }

        callbacks.forEach(callback=>{
        	callback(data);
        });
	}

	unsubscribe( eventName, callback ){
		const callbacks = this._callbackArray[eventName];
		if (callbacks){
			this._callbackArray[eventName] = callbacks.filter((cb)=>{
				cb !== callback
			})
		}
	}

    hide(){
    	this._element.hidden = true;
    }

    show() {
        this._element.hidden = false;
    }
}
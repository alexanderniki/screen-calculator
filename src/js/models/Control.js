/**
* RU: Модель произвольного контрола
**/
class Control {
    
    /**
    * @param {Display} display - экран, с которым ведется работа
    **/
    constructor(display){
        
        /*
        * Screen width
        * @type {number}
        * @defaultvalue
        */
        this.width = 0;
        
        /*
        * Screen height
        * @type {number}
        * @defaultvalue
        */
        this.height= 0;
    
    }
    
    
    toString() {
        let str = "CONTROL " + this.width + "x" + this.height;
        return str;
    }
    
    
    /**
    * @todo return correct JSON
    * @return {string}
    **/
    toJSON() {
        
        return "0";
    }
    
    
    /**
    * @param {number} width
    **/
    setWidth(width) {
        
        console.log("Control.setWidth(width = " + width + ")");
        
        if (width >= 0) {
            this.width = width;
        } else {
            this.width = 0;
        }
        
    }
    
    
    /**
    * @param {number} height
    **/
    setHeight(height) {
    
        console.log("Control.setHeight(height = " + height + ")")
        
        if (height >= 0) {
            this.height = height;
        } else {
            this.height = 0;
        }
    }
    
    
    /*
    * @return {number}
    */
    getWidth() {
        return this.width;
    }
    
    
    /*
    * @return {number}
    */
    getHeight() {
        return this.height;
    }

    
}

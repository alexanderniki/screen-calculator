class Control {
    
    /**
    * RU: Модель произвольного контрола
    **/
    
    constructor(display){
        
        /**
        * @param {Display} display - экран, с которым ведется работа
        **/
        
        this.width = 0;
        this.height= 0;
    }
    
    
    toString() {
        let str = "CONTROL " + this.width + "x" + this.height;
        return str;
    }
    
    
    toJSON() {
        
        /**
        * @todo return correct JSON
        **/
        
        return 0;
    }
    
    setWidth(width) {
        
        /**
        * @param {number} width
        **/
        
        console.log("Control.setWidth(width = " + width + ")");
        
        if (width >= 0) {
            this.width = width;
        } else {
            this.width = 0;
        }
        
    }
    
    
    setHeight(height) {
        
        /**
        * @param {number} height
        **/
        
        console.log("Control.setHeight(height = " + height + ")")
        
        if (height >= 0) {
            this.height = height;
        } else {
            this.height = 0;
        }
    }
    
    
    getWidth() {
        return this.width;
    }
    
    
    getHeight() {
        return this.height;
    }

    
}

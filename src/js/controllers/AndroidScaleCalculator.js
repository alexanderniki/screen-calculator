class AndroidScaleCalculator {
    
    constructor() {
        
        /*
        * @type {number}
        * @defaultvalue
        */
        this.size_dp = 0;
        
        /*
        * @type {number}
        * @defaultvalue
        */
        this.dpi = 0;
    }
    
    initialize(size, dpi) {
        this.setSize(size);
        this.setDpi(dpi);
    }
    
    toString() {
        return "AndroidScaleCalculator";
    }
    
    toJSON () {
        // Todo: return correct JSON
    }
    
    /*
    * @param {number} dpi
    */
    setDpi(dpi) {
        if (dpi >= 0) {
            this.dpi = dpi;
        } else {
            this.dpi = 0;
        }
    }
    
    /*
    * @param {number} size
    */
    setSize(size) {
        if (size >= 0) {
            this.size_dp = size;
        } else {
            this.size_dp = 0;
        }
    }
    
    
    getDpi() {
        return this.dpi;
    }
    
    getSize() {
        return this.size_px;
    }
    
    
    /*
    * @private
    * @return {number} - scale
    */
    calculateRealScale() {
        console.log("AndroidScaleCalculator.ccalculateRealScale()");
        
        let real_scale = this.dpi / 160;
        return real_scale;
    }
    
    /*
    * @private
    * @return {number} - size
    */
    calculateRealSize() {
        console.log("AndroidScaleCalculator.calculateRealSize()");
        
        let real_size = this.size_dp * this.calculateRealScale();
        return real_size;
    }
}
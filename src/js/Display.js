class Display {
    
    /**
    * @todo use getters and setters instead of getProperty() and setProperty() methods?
    **/
    
    constructor () {
        this.width = 0;        // px
        this.height = 0;       // px
        this.diagonal = 0;     // inch
        
        this.area = 0;         // square inch
        this.dpi = 0;          // dots per inch (String)
        this.density = 0;      // ldpi, ..., xxxhdpi
        this.aspect_ratio = 0; // aspect ration (String)
    }
    
    initialize(width, height, diagonal) {
        
        /**
        * @param {number} width - screen width
        * @param {number} height - screen height
        * @param {number} diagonal - screen diagonal
        **/
        console.log("Display.initialize(width = " + width + ", height = " + height + ", diagonal = " + diagonal + ")");
        
        this.setWidth(width);
        this.setHeight(height);
        this.setDiagonal(diagonal);
    }
    
    
    toString() {
        /**
        * @return {string}
        **/
        
        let str = "DISPLAY " + this.width + "x" + this.height + "px, " + this.diagonal + "in.";
        return str;
    }
    
    toJSON(){
        /**
        * @todo find more correct way to produce JSON. This is terrible one :)
        * return {string}
        **/
        
        let json_str = "{\"display\": {\"width\":\"" + this.width + "\", \"height\":\"" + this.height + "\", \"diagonal\":\"" + this.diagonal + "\"}}";
        return json_str;
    }
    
    
    setWidth(width) {
        /**
        * 
        * @param {number} width - ширина экрана в пикселях
        * 
        **/
        console.log("Display.setWidth(width = " + width + ")");
        
        if (width >= 0) {
            this.width = width;
        }
        else {
            this.width = 0;
        }
        
        this.updateProperties();
    }
    
    
    setHeight(height) {
        /**
        * 
        * @param {number} height - высота экрана в пикселях
        * 
        **/
        console.log("Display.setHeight(height = " + height + ")");
        
        if (height >= 0) {
            this.height = height;
        }
        else {
            this.height = 0;
        }
        
        this.updateProperties();
    }
    
    
    setDiagonal(diagonal) {
        /**
        * 
        * @param {number} diagonal - диагональ экрана в дюймах
        * 
        **/
        console.log("Display.setDiagonal(diagonal = " + diagonal + ")");
        
        if (diagonal >= 0){
            this.diagonal = diagonal;
        }
        else {
            this.diagonal = 0;
        }
        
        this.updateProperties();
    }
    
    
    updateProperties() {
        /**
        * @private
        **/
        
        this.calculateDPI();
        this.calculateDensity();
        this.calculateAspectRatio();
        this.calculateArea();
    }
    
    
    getArea() {
        /**
        * EN: display's area in inches
        * RU: площадь экрана в кв. дюймах
        *
        * @return {number}
        **/
        console.log("Display.getArea()");
        
        return this.area;
    }
    
    
    getDiagonal() {
        /**
        * EN: display's diagonal in inches
        * RU: диагональ дисплея в дюймах
        *
        * @return {number}
        **/
        console.log("Display.getDiagonal()");
        
        return this.diagonal;
    }
    
    
    calculateArea() {
        /**
        * EN: display's areain sq inch
        * RU: площадь экрана в кв. дюймах
        *
        * Расчет площади экрана по диагонали и соотношению сторон
        *
        * diag^2 = a^2 + b^2 [теорема пифагора]
        * a = kb [мы знаем соотношение сторон]
        * diag*diag = k*k*b*b + b*b
        * diag^2 = b^2 * (k^2 + 1) [выносим b^2 за скобки]
        * b = sqrt(diag^2/(k^2 + 1))
        * 
        * @param {number} diag - значение размера диагонали устройства
        * @param {number} ratio - значение соотношения сторон
        * @private
        * @return {number}
        **/
        console.log("Display.calculateArea()");
        
        let ratio = this.width/this.height;
        
        let side = Math.sqrt(this.diagonal * this.diagonal / (ratio*ratio + 1));
        let side2 = side * ratio;
        let screen_area = Math.round(side * side2); // To do: make correct round
        
        this.area = screen_area;
        
        console.log("Area: " + this.area);
        return 0;
    }
    
    
    calculateDPI() {
        /**
        * EN: dpi measured in dots per inch
        * RU: параметр dpi в точках на дюйм
        *
        * @private
        * @return {Number}
        **/
        console.log("Display.calculateDPI()");
        
        let screen_dpi = 0;
        let diagonal_px = Math.sqrt(this.width * this.width + this.height * this.height);
        
        if (this.diagonal > 0) {
            screen_dpi = Math.round(diagonal_px / this.diagonal);
        } else {
            screen_dpi = 0;
        }
        
        this.dpi = screen_dpi;
        
        console.log("Screen dpi: " + this.dpi);
        return this.dpi; // Not sure if this is really useful
    }
    
    
    calculateDensity() {
        /*
        * EN: returns screen dencity based on Android design guidelines.
        *     Values: ldpi, ..., xxxhdpi.
        * RU: возвращает плотность пикселей экрана по правилам, описанным в Android design guidelines
        *     Значения: ldpi, ..., xxxhdpi
        * 
        * @private
        * @return {string}
        */
        console.log("Display.calculateDensity()");
        
        let density = 0;

        if (this.dpi < 140) {
            density = "ldpi";
        }
        else if (this.dpi >= 140 && this.dpi < 180) {
            density = "mdpi";
        }
        else if (this.dpi >= 180 && this.dpi < 280) {
            density = "hdpi";
        }
        else if (this.dpi >= 280 && this.dpi < 400) {
            density = "xhdpi";
        }
        else if (this.dpi >= 400 && this.dpi < 560) {
            density = "xxhdpi";
        }
        else { // dpi > 560
            density = "xxxhdpi";
        }
        
        this.density = density;
        console.log("Density: " + this.density);
    }
    
    
    round2(i) {
        /**
        * RU: Округление в стиле JavaScript (что бы это ни значило :) )
        *
        * @private
        * @param {number} i - число, которое нужно округлить
        * @return {number}
        **/
        console.log("Display.round2(i = " + i + ")");

        return Math.round(i * 100) / 100;
    }
    
    
    calculateAspectRatio() {
        /**
        * RU: расчитавает соотвношение сторон экрана в виде строки
        * @todo исправитьбаг с неправильным округлением, в случае когда высота больше ширины
        *
        * @private
        **/
        console.log("Display.calculateAspectRatio()");
        
        let common_ratios = {
            "3:4" : 3 / 4,
            "1:1" : 1,
            "5:4" : 5 / 4,
            "4:3" : 4 / 3,
            "IMAX 1.43:1" : 1.43,
            "3:2" : 3 / 2,
            "5:3" : 5 / 3,
            "14:9" : 14 / 9,
            "16:10" : 16 / 10,
            "16:9" : 16 / 9,
            "17:9" : 17 / 9,
            "21:9" : 21 / 9
        };
        
        let ratio = 0;
        if (this.height > 0) {
            ratio = this.width / this.height;
        } else {
            ratio = 0;
        }
        console.log("ratio: " + ratio);

        for (let ratio_name in common_ratios) {
            let r2 = common_ratios[ratio_name];
            if (Math.abs(r2 / ratio - 1) < 0.01) { // 1% error margin is ok
                this.aspect_ratio = ratio_name;
                console.log("Aspect aratio: " + this.aspect_ratio);
                return ratio_name;
            }
        }
        // this aspect ratio is unknown.
        if (this.width - 0 > this.height - 0) {// "1.xx:1"
            this.aspect_ratio = this.round2(this.width / this.height) + ":1";
            return this.round2(this.width / this.height) + ":1";
        } else {
            console.log("Height is greater than width");
            this.aspect_ratio = "1:" + this.round2(this.height / this.width);
            console.log("Aspect aratio: " + this.aspect_ratio);
            return "1:" + this.round2(this.height / this.width);
        }
    }
    
    
}


class AndroidResourceCalculator {

    constructor() {
        this.densities = {
            "ldpi": 0,
            "mdpi": 0,
            "hdpi": 0,
            "xhdpi": 0,
            "xxhdpi": 0,
            "xxxhdpi": 0,
        };
    }
    
    
    getDensities() {
        return this.densities;
    }
    
    matchDensities(value, density) {
        
        /**
        * RU: приводим значение к MDPI и от него пересчитавает все осталные
        * 
        * @param {number} value
        * @paran {string} density
        **/
        console.log("AndroidResourceCalculator.matchDensities(value = " + value + ", density = " + density + ")");
        
        density = density.toLowerCase();
        switch (density) {
            case "ldpi":
                value = value / 0.75;
            case "mdpi":
                break;
            case "hdpi":
                value = value / 1.5;
            case "xhdpi":
                value = value / 2.0;
                break;
            case "xxhdpi":
                value = value / 3.0;
                break;
            case "xxxhdpi":
                value = value / 4.0;
                break;
            default:
                // do something
                break;
        }
        
        this.densities["ldpi"] = value * 0.75; // Приводим к mdpi и пересчитываем от него
        this.densities["mdpi"] = value;
        this.densities["hdpi"] = value * 1.5;
        this.densities["xhdpi"] = value * 2.0;
        this.densities["xxhdpi"] = value * 3.0;
        this.densities["xxxhdpi"] = value * 4.0;
    }
    
}

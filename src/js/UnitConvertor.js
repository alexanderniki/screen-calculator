class UnitConvertor {

    constructor() {
        // do something
    }
    
    
    dp2px(dp, density) {
        
        /**
        * RU: конвертирует android dp в пиксели. Позволяет получить размер контрола в пикселях,
        *     зная его размер в dp и плотность экрана.
        *
        * @param {number} dp - значение величины в android dp
        * @param {string} density - индекс плотности экрана ldpi, ..., xxxhdpi
        * @return {number}
        **/
        console.log("UnitConvertor.dp2px(dp = " + dp + ", density = " + density + ")");
        
        let value = 0;
        density = density.toLowerCase();
        switch (density) {
            case "ldpi":
                break;
            case "mdpi":
                value = dp;
                break;
            case "hdpi":
                value = dp * 1.5;
                break;
            case "xhdpi":
                value = dp * 2;
                break;
            case "xxhdpi":
                value = dp * 3;
                break;
            case "xxxhdpi":
                value = dp * 4;
                break;
            default:
                value = 0;
        }
        
        console.log("UnitConvertor.dp2px: " + value);
        return value;
    }
    
    
    px2in(px, dpi) {
        
        /**
        * RU: имеется величина в пикселях, величина плотности экрана в точках на дюйм.
        *     Пример конвертации есть здесь: https://www.pixelto.net/px-to-mm-converter
        *
        * @param {number} px - значение конвертируемой величины в px
        * @param {number} dpi - значение DPI экрана
        * @return {number}
        **/
        console.log("UnitConvertor.px2in(px = " + px + ", dpi = " + dpi + ")");
        
        let inch = px / dpi;
        
        console.log("UnitConvertor.px2in: " + inch);
        return inch;
    }
    
    
    in2mm(inch) {
        
        /**
        * @private
        * @return {number} - значение параметра в миллиметрах
        **/
        console.log("UnitConvertor.in2mm(inch = " + inch + ")");
        
        let mm = inch * 25.4;
        
        console.log("UnitConvertor.in2mm: " + mm);
        return mm;
    }

}


function test() {
    let uconv = new UnitConvertor();
    uconv.dp2px(56, "xxxhdpi");
    
    uconv.px2in(100, 104);
    uconv.in2mm(uconv.px2in(100, 104));
}
test();
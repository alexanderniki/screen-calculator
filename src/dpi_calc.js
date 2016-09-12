"use strict";

function calculateDpi(x, y, diag_in) {
    /*
    Calculates DPI by parameters
    */
    
    var diagonal_px = Math.sqrt(x * x + y * y);
    var screen_dpi = Math.round(diagonal_px / diag_in);
    return screen_dpi;
    
}


function calculateScreenDensity(dpi) {
    /*
    Returns screen dencity based on Android design guidelines.
    Values: ldpi, mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi.
    */
    
    if (dpi < 140) {
        return "ldpi";
    }
    else if (dpi >= 140 && dpi < 180) {
        return "mdpi";
    }
    else if (dpi >= 180 && dpi < 280) {
        return "hdpi";
    }
    else if (dpi >= 280 && dpi < 400) {
        return "xhdpi";
    }
    else if (dpi >= 400 && dpi < 560) {
        return "xxhdpi";
    }
    else {
        return "xxxhdpi";
    }
}


function printScreenDensity(density) {
    document.getElementById("density_result").innerHTML = density;
}


function printScreenDpi(dpi) {
    document.getElementById("dpi_result").innerHTML = dpi;
}


function cdpi() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var diag = document.getElementById("diag").value;
    
    var dpi = calculateDpi(x, y, diag);
    var density = calculateScreenDensity(dpi);
    var aspect_ratio = calculateAspectRatio2(x, y);
    
    printScreenDpi(dpi);
    printScreenDensity(density);
    printAspectRatio(aspect_ratio);
    
    calculateScreenArea(diag, x/y);
}


var menu_displayed = 0;
function toggleMenu() {
    var menu = document.getElementById("menu");
    
    if (menu_displayed === 0) {
        menu.style.display = "block";
        menu_displayed = 1;
    }
    else {
        menu.style.display = "none";
        menu_displayed = 0;
    }
}


function calculateAspectRatio(x , y) {
    var ratio = x / y;
    if (ratio >= 1.7 && ratio < 1.8) {
        return "16:9";
    }
    else if (ratio >= 1.6 && ratio < 1.7) {
        return "16:10";
    }
    else if (ratio >= 1.3 && ratio < 1.4) {
        return "4:3";
    }
    else {
        return "Unknown. Exact ratio is " + ratio;
    }
}


function printAspectRatio(asp_ratio) {
    document.getElementById("aspectratio_result").innerHTML = asp_ratio;
}


function round2(i) {
    // Округление в стиле JavaScript
    return Math.round(i * 100) / 100;
}


function calculateAspectRatio2(x, y) {
    var common_ratios = {
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
    
    var ratio = x / y;
    
    for (var ratio_name in common_ratios) {
        var r2 = common_ratios[ratio_name];
        if (Math.abs(r2 / ratio - 1) < 0.01)  // 1% error margin is ok
			return ratio_name;
    }
    // this aspect ratio is unknown.
	if (x - 0 > y - 0) // "1.xx:1"
		return round2(x / y) + ":1";
	else
		return "1:" + round2(y / x);
}


function calculateScreenArea(diag, ratio) {
    /*
    diag^2 = a^2 + b^2 [теорема пифагора]
    a = kb [мы знаем соотношение сторон]
    diag*diag = k*k*b*b + b*b
    diag^2 = b^2 * (k^2 + 1) [выносим b^2 за скобки]
    b = sqrt(diag^2/(k^2 + 1))
    */
    
    var side = Math.sqrt(diag*diag / (ratio*ratio + 1));
    var side2 = side * ratio;
    var area = Math.round(side * side2); // To do: make correct round
    
    printText("screenarea_result", area);
}


function printText(elem_id, content) {
    
    /**
    * Обертка над стандартным innerHTML
    * 
    * @param {string} elem_id - id элемента: место, в которое пишем.
    * @param {string} content - то, что пишется в elem_id.
    */
    
    document.getElementById(elem_id).innerHTML = content;
}


function calculateElementSizes(value, density) {
    
    console.log("calculateElementSizes");

    var densities = { // Что пишем
        "ldpi": 0,
        "mdpi": 0,
        "hdpi": 0,
        "xhdpi": 0,
        "xxhdpi": 0,
        "xxxhdpi": 0,
    };
    
    
    density = density.toLowerCase();
    switch (density) {
        case "ldpi":
            value = value / 0.75;
            densities["ldpi"] = value * 0.75; // Приводим к mdpi и пересчитываем от него
            densities["mdpi"] = value;
            densities["hdpi"] = value * 1.5;
            densities["xhdpi"] = value * 2.0;
            densities["xxhdpi"] = value * 3.0;
            densities["xxxhdpi"] = value * 4.0;
            break;
        case "mdpi":
            densities["ldpi"] = value * 0.75; // Приводим к mdpi и пересчитываем от него
            densities["mdpi"] = value;
            densities["hdpi"] = value * 1.5;
            densities["xhdpi"] = value * 2.0;
            densities["xxhdpi"] = value * 3.0;
            densities["xxxhdpi"] = value * 4.0;
            break;
        case "hdpi":
            value = value / 1.5; // Приводим к mdpi и пересчитываем от него
            densities["ldpi"] = value * 0.75;
            densities["mdpi"] = value;
            densities["hdpi"] = value * 1.5;
            densities["xhdpi"] = value * 2.0;
            densities["xxhdpi"] = value * 3.0;
            densities["xxxhdpi"] = value * 4.0;
            break;
        case "xhdpi":
            value = value / 2.0; // Приводим к mdpi и пересчитываем от него
            densities["ldpi"] = value * 0.75;
            densities["mdpi"] = value;
            densities["hdpi"] = value * 1.5;
            densities["xhdpi"] = value * 2.0;
            densities["xxhdpi"] = value * 3.0;
            densities["xxxhdpi"] = value * 4.0;
            break;
        case "xxhdpi":
            value = value / 3.0; // Приводим к mdpi и пересчитываем от него
            densities["ldpi"] = value * 0.75;
            densities["mdpi"] = value;
            densities["hdpi"] = value * 1.5;
            densities["xhdpi"] = value * 2.0;
            densities["xxhdpi"] = value * 3.0;
            densities["xxxhdpi"] = value * 4.0;
            break;
        case "xxxhdpi":
            value = value / 4.0; // Приводим к mdpi и пересчитываем от него
            densities["ldpi"] = value * 0.75;
            densities["mdpi"] = value;
            densities["hdpi"] = value * 1.5;
            densities["xhdpi"] = value * 2.0;
            densities["xxhdpi"] = value * 3.0;
            densities["xxxhdpi"] = value * 4.0;
            break;
        default:
            // do something
            break;
    
    }
    
    printText("ldpi", densities["ldpi"]);
    printText("mdpi",  densities["mdpi"]);
    printText("hdpi", densities["hdpi"]);
    printText("xhdpi", densities["xhdpi"]);
    printText("xxhdpi", densities["xxhdpi"]);
    printText("xxxhdpi", densities["xxxhdpi"]);
    
    //var inputIds = ['ldpi', 'mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
    
    return(densities);

}

function assignValues(value) {
    
    /**
    * Распределяет значение параметра по различным dpi.
    * Предполагается использовать эту функцию в качестве замены повторяющемуся в calculateElementSizes() коду.
    *  
    * @param {number} value - значение mdpi, относительно которого требуется рассчитать остальные.
    */
    
    densities["ldpi"] = value * 0.75;
    densities["mdpi"] = value;
    densities["hdpi"] = value * 1.5;
    densities["xhdpi"] = value * 2.0;
    densities["xxhdpi"] = value * 3.0;
    densities["xxxhdpi"] = value * 4.0;
}

function xCalculateElementSizes(value, density) {
    var densities = {
        // Что пишем
        "ldpi": 0,
        "mdpi": 0,
        "hdpi": 0,
        "xhdpi": 0,
        "xxhdpi": 0,
        "xxxhdpi": 0,
    };
    switch (density.id) {
    case "ldpi":
        value = value / 0.75
        densities["ldpi"] = value * 0.75;
        // Приводим к mdpi и пересчитываем от него
        densities["mdpi"] = value;
        densities["hdpi"] = value * 1.5;
        densities["xhdpi"] = value * 2.0;
        densities["xxhdpi"] = value * 3.0;
        densities["xxxhdpi"] = value * 4.0;
        break;
    case "mdpi":
        densities["ldpi"] = value * 0.75;
        // Приводим к mdpi и пересчитываем от него
        densities["mdpi"] = value;
        densities["hdpi"] = value * 1.5;
        densities["xhdpi"] = value * 2.0;
        densities["xxhdpi"] = value * 3.0;
        densities["xxxhdpi"] = value * 4.0;
        break;
    case "hdpi":
        value = value / 1.5;
        // Приводим к mdpi и пересчитываем от него
        densities["ldpi"] = value * 0.75;
        densities["mdpi"] = value;
        densities["hdpi"] = value * 1.5;
        densities["xhdpi"] = value * 2.0;
        densities["xxhdpi"] = value * 3.0;
        densities["xxxhdpi"] = value * 4.0;
        break;
    case "xhdpi":
        value = value / 2.0;
        // Приводим к mdpi и пересчитываем от него
        densities["ldpi"] = value * 0.75;
        densities["mdpi"] = value;
        densities["hdpi"] = value * 1.5;
        densities["xhdpi"] = value * 2.0;
        densities["xxhdpi"] = value * 3.0;
        densities["xxxhdpi"] = value * 4.0;
        break;
    case "xxhdpi":
        value = value / 3.0;
        // Приводим к mdpi и пересчитываем от него
        densities["ldpi"] = value * 0.75;
        densities["mdpi"] = value;
        densities["hdpi"] = value * 1.5;
        densities["xhdpi"] = value * 2.0;
        densities["xxhdpi"] = value * 3.0;
        densities["xxxhdpi"] = value * 4.0;
        break;
    case "xxxhdpi":
        value = value / 4.0;
        // Приводим к mdpi и пересчитываем от него
        densities["ldpi"] = value * 0.75;
        densities["mdpi"] = value;
        densities["hdpi"] = value * 1.5;
        densities["xhdpi"] = value * 2.0;
        densities["xxhdpi"] = value * 3.0;
        densities["xxxhdpi"] = value * 4.0;
        break;
    default:
        // do something
        break;
    }

    Object.keys(densities).forEach(function(i) {
        if (i!=density.id) // нужно для того, чтобы не переписывать то поле, которое было изменено.
            document.getElementById(i).value = densities[i];
    })
}


function main() {
    var x = document.getElementById("x");
    var y = document.getElementById("y");
    var diag = document.getElementById("diag");
    
    x.value = screen.width;
    y.value = screen.height;
    
    diag.onchange = cdpi;
    diag.onkeyup = cdpi;
    
    x.onchange = cdpi;
    x.onkeyup = cdpi;
    
    y.onchange = cdpi;
    y.onkeyup = cdpi;
    
    
    var value_dp = document.getElementById("value_dp");
    var density_type = document.getElementById("density_type");
    var calculate_button = document.getElementById('calculate_button');
    calculate_button.onclick = function () {
        // Так сделано для того, чтобы в функцию-callback можно было передать параметры.
        calculateElementSizes(value_dp.value, density_type.value);
    };
    
    

    /*var inputIds = ['ldpi', 'mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
    inputIds.forEach(function(i) {
        document.getElementById(i).onchange = function(e) {
            if (e.target.classList.contains('focused'))
                xCalculateElementSizes(e.target.value, e.target);
        };
        document.getElementById(i).onkeyup = function(e) {
            if (e.target.classList.contains('focused'))
                xCalculateElementSizes(e.target.value, e.target);
        };
        
        // Добавляем элементу класс focused, чтобы избежать циклического обновления полей по событию onchange
        document.getElementById(i).onfocus = function(e) {e.target.classList.add('focused')};
        document.getElementById(i).onblur = function(e) {e.target.classList.remove("focused")};
    })*/
    
}
 


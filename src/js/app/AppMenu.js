class AppMenu {

    constructor () {
        
        // Menu buttons
        this.nav_resource = document.getElementById("nav_resource");
        this.nav_display = document.getElementById("nav_display");
        this.nav_convertor = document.getElementById("nav_convertor");
        
        // Fragments
        this.displayprop_fragment = document.getElementById("displayprop_fragment");
        this.rescalc_fragment = document.getElementById("rescalc_fragment");
        this.convertor_fragment = document.getElementById("convertor_fragment");
        
        // Actions
        nav_resource.onclick = this.showResourceCalc;
        nav_display.onclick = this.showDpiCalc;
        nav_convertor.onclick = this.showConvertor;
        
        this.applyDefaultState();
        
    }
    
    
    showDpiCalc() {
        console.log("AppMenu.showDpiCalc()");
        
        // Show content
        displayprop_fragment.style.display = "block";
        rescalc_fragment.style.display = "none";
        convertor_fragment.style.display = "none";
        
        // Highlight link
        nav_display.style.color = "#FFF9C4";
        nav_resource.style.color = "#cfd8dc";
        nav_convertor.style.color = "#cfd8dc";
    }
    
    
    showResourceCalc() {
        console.log("AppMenu.showResourceCalc()")
        
        // Show content
        displayprop_fragment.style.display = "none";
        rescalc_fragment.style.display = "block";
        convertor_fragment.style.display = "none";
        
        // Highlight link
        nav_display.style.color = "#cfd8dc";
        nav_resource.style.color = "#FFF9C4";
        nav_convertor.style.color = "#cfd8dc";
    }
    
    
    showConvertor() {
        console.log("AppMenu.showConvertor()")
        
        // Show content
        displayprop_fragment.style.display = "none";
        rescalc_fragment.style.display = "none";
        convertor_fragment.style.display = "block";
        
        // Highlight link
        nav_display.style.color = "#cfd8dc";
        nav_resource.style.color = "#cfd8dc";
        nav_convertor.style.color = "#FFF9C4";
    }
    
    
    applyDefaultState() {
        console.log("AppMenu.applyDefaultState()");
        
        // Show default content
        displayprop_fragment.style.display = "block";
        rescalc_fragment.style.display = "none";
        convertor_fragment.style.display = "none";
        
        // Highlight default "tab"
        nav_display.style.color = "#FFF9C4" // YELLOW 100
    }

}
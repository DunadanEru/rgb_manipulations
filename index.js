let inputRGB = document.getElementById("rgb-input")
let generateBtn = document.getElementById("generateHSL")



generateBtn.addEventListener("click", function generateBtn() {
    generateTheme(inputRGB.textContent);

})

// hsl(43,100%,50%) 
function generateTheme(color, numberOfTints) {
    let _color = color || "#000";
    let _numberOfTints = numberOfTints || 5;
    let colorHSL = hexToHSL(_color);
    let arr = [];
    hslIntegerValues = getIntegersFromString(colorHSL);
    console.log(hslIntegerValues)
    console.log(colorHSL);
}

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }



function getIntegersFromString(str) {
    _str = str + "e";    // end any char to end of string in case last char is number digit
    _str = _str.split("");
    let onNumberDigit = false;
    let numbersString = "";
    for (i = _str.length - 1; i > -1; i--) {
        if (onNumberDigit) {
            if (isNaN(_str[i - 1])) { onNumberDigit = false };   // check if next char is not number (number finishes here)
            numbersString += _str[i];
        };
        if (isNaN(_str[i - 1])) { numbersString += "," };
        if (!isNaN(_str[i - 1])) { onNumberDigit = true };   // check if we got char of end of number (number starts here)
    };
    return numbersString.split("").reverse().join("").split(",").filter(Number);
}




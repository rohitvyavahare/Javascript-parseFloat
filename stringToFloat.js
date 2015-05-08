
/*
example:

stringToFloat("10") = 10
stringToFloat("10.00") = 10
stringToFloat("10.33") = 10.33
stringToFloat("34 45 66") = 34
stringToFloat("   60   ") =60
stringToFloat("40 years") =40
stringToFloat("2.34e2") =234
stringToFloat("-4.54") =-4.54
stringToFloat("2.34ert") =2.34

*/
function stringToFloat(str) {
    str = String(str);
	
	//Remove all first blanks spaces 
    str = str.trim();	
    str = str.split(" ");
	//if string contains multiple words separated by space take first one. 
    str = str[0];    
    
	
    if(isInfinite(str)){    
        
        return Infinity;
        
     }    
    
    //check if string contains scientific notation.	
    var info = /([\d\.]+)e([-+]?\d+)/i.exec(str);        
    
    if (!info) {    
			
		return stringToFloatHelper(str);       
        
    }   
	
		return stringToFloatHelper(str,info[2]);

}

function isInfinite(str){
    
    if(str.toLowerCase() == 'infinity')
        return true;

    return false;        
}


function stringToFloatHelper(str, power){
    var output =0;
	
    if(!power){
	
     var power =0;    
    
    }
    var isInteger = false;
	
    if( str.indexOf('.') == -1  ){
        
        isInteger = true
    }
	
    if (!isInteger){
                
		//take only float number from string. 		
        str = str.match(/[+-]?\d+\.\d+/g)[0]
        
        for( i = str.indexOf(".")+1; i<str.length; i++){
            
             power--;
        }
    }
        
    var endCharacterIndex = 0;
	

	var isNegative = false;

    if( str.charAt(0) == "-" ){

        isNegative = true;
        
    }
	
    if(isNegative){
	
        endCharacterIndex = 1;
    }
	
    for( i= str.length-1; i>= endCharacterIndex; i-- ){
    
        if(str.charAt(i) == "."){
		
            continue;
        }
    
        output = output + ((str.charAt(i)- "0")*Math.pow(10,power));
        power =power+1;
    }

    if(isNegative){
	
        output = -output
    }
	
    return output;
}
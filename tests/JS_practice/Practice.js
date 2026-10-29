//Reverse a string without changing position of special characters

let str="progr@ammi%ng";
let result="";

for(let i=str.length-1; i>=0; i--){   
 
  if(/[a-zA-Z]/.test(str[i])){
    result=result+str[i];
  }     
}

console.log(result);

for(let i=0; i<str.length; i++){
  if(!/[a-zA-Z]/.test(str[i])){
  result=result.slice(0,i)+str[i]+result.slice(i);
  }
}
console.log(result);
console.log(str);

// Move all zeros to end

let arr= [1, 2, 0, 3, 4, 0, 5, 6, 0, 7, 8, 0];
let resultArr=[];
for(let i=arr.length-1; i>=0; i--){
  if(arr[i]!==0){
    resultArr.unshift(arr[i]);
  }
  else{
    resultArr.push(arr[i]);
  }
}
console.log(resultArr);





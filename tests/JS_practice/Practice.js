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


// ocuurance of each word
let strr = "Javascript is good Javascript is wonerful";

strr= strr.toLowerCase();
let resultt=[];
let count;

let strArr= strr.split(" ");
console.log(strArr);

for(let i=0; i<strArr.length; i++){   
  if(!resultt.includes(strArr[i])){ 
     count=1;
    for(let j=i+1; j<strArr.length; j++){
      if(strArr[i]===strArr[j]){
        count++;        
      }
    } 
    console.log(strArr[i],":",count);
    resultt.push(strArr[i]); 
  }  
}

// add the number in between the array
let arr1= [1, 2, 3, 4, 5 ];

arr1.splice(2,0,10);

console.log(arr1);

// Highest occured letter

let str1= "I am learning JavaScript language";

str1= str1.toLowerCase();

let arrStr1= str1.split("");

let result1=[];

let count1;
let maxCount1=0;
let maxChar='';
console.log(arrStr1);

for(let i=0; i<arrStr1.length; i++){
   if(!result1.includes(arrStr1[i])){
    count1=1;
       for(let j=i+1; j<arrStr1.length; j++){
           if(arrStr1[i]===arrStr1[j]){
               count1++;
           }
       }
       result1.push(arrStr1[i]);
       if(count1>maxCount1){
         maxCount1=count1;
         maxChar=arrStr1[i];
       }
   }
}
console.log("Highest occured letter is",maxChar);
console.log(maxCount1);

//  inverted triangle starting with letter y and when z encounter start with a for 5 rows

let row;
let l=25;

for(let i=4; i>=0; i--){
  row="";
  for(let j=0; j<=5-i; j++){
     row = row + " ";
  }

  for(let j=0; j<=i; j++){
    row=row+String.fromCharCode(96+l)+" ";
    l++;
    if(l==27){
      l=1;
    }
  }
  console.log(row);
  }
  
  //Write a JS function getFormattedPriceList(prices) that takes an array of price strings like
  //  [" $10.50 ", " $20.00 ", " $5.25 "], strips spaces and $ signs, converts them to numbers, 
  // and returns only prices greater than 10.00. - Need more practice on coding and logics

  function getFormattedPriceList(prices){  
 
  for(let i=0; i<prices.length;i++){
    prices[i]=prices[i].trim();    
    let str= prices[i].slice(1);  
    let int= parseFloat(str);
    if(int>10.00){
      console.log(int);
    }    
  }  
}
getFormattedPriceList([" $10.50 ", " $20.00 ", " $5.25 "]);


// WAP unique number and in that highest one 

let arr2= [2,4,5,6,7,8,7,9,3,2,3,4,6,5,1,4,0,9];
let highest=0;
for(let i=0; i<arr2.length; i++){
  if(arr2.indexOf(arr2[i])===arr2.lastIndexOf(arr2[i])){
      if(arr2[i]>highest){
      highest=arr2[i];
  }
}  
}
console.log(highest);

//  find the total execution time of only the "Fail" test cases

const testCases = [
{ name: "Login", status: "Pass", executionTime: 10 },
{ name: "Checkout", status: "Fail", executionTime: 20 },
{ name: "Search", status: "Pass", executionTime: 15 },
{ name: "Payment", status: "Fail", executionTime: 30 }
]

let totalTime=0;
for(let i=0; i<testCases.length; i++){
  if(testCases[i].status=="Fail"){
    totalTime=totalTime+testCases[i].executionTime;
  }
}
console.log(totalTime);


// WAP to find the shortest word in a sentence -

let str2= "We like javascript";
let arr3= str2.split(" ");
let shortest=arr3[0];

for(let i=0; i<arr3.length; i++){
  if(arr3[i].length<shortest.length){
    shortest=arr3[i];    
  }
}
console.log(shortest);


// prime numbers from 1 to 100

for (let i = 2; i <= 100; i++) {
    let isPrime = true;

    for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        console.log(i);
    }
}

// sorting of array

let arr4= [3, 5, 8, 1, 2, 10];

let temp=0;

for(let i=0; i<arr4.length; i++){
  for(let j=i+1; j<arr4.length; j++){
    if(arr4[i]>arr4[j]){
    temp=arr4[i];
    arr4[i]=arr4[j];
    arr4[j]=temp;
  }
  }  
}
console.log(arr4);

//swap numbers in pairs

let arr5= [10, 20, 30, 40, 50, 60];

for(let i=0; i<arr5.length; i+=2){
  // if(i%2===0 || i===0){
  let temp=0;
  temp=arr5[i];
  arr5[i]=arr5[i+1];
  arr5[i+1]=temp;
  }
//}
console.log(arr5);

// reverse array without using push, unshift and reverse

let arr6 = [10, 20, 30, 40, 50];
let i, j;
for(i=0, j=arr6.length-1; i<j; i++,j--){
  let temp=0
  temp= arr6[i];
  arr6[i]=arr6[j];
  arr6[j]=temp;;
}
console.log(arr6);
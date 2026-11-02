// Max consecutive sum

let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let currentSum = 0;
let maxSum = -Infinity;

let start = 0;
let end = 0;
let tempStart = 0;

for(let i=0; i<arr.length; i++){
    tempStart=i;
    currentSum = arr[i];   
    for(let j=i+1; j<arr.length; j++){              
        currentSum = currentSum + arr[j];       
        if(currentSum>maxSum){
            maxSum=currentSum; 
            maxSum = currentSum;
            start = tempStart;
            end = j;        
        }
    }   
}
console.log(maxSum);
console.log("Subarray:", arr.slice(start, end + 1));


// with one loop

let arrr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

let currentsum = arrr[0];
let maxsum = arrr[0];

let startt = 0;
let endd = 0;
let tempStartt = 0;

for (let i = 1; i < arrr.length; i++) {

    if (arrr[i] > currentsum + arrr[i]) {
        currentsum = arrr[i];
        tempStartt = i;
    } else {
        currentsum = currentsum + arrr[i];
    }

    if (currentsum > maxsum) {
        maxsum = currentsum;
        startt = tempStartt;
        endd = i;
    }
}

console.log("Maximum Sum:", maxsum);
console.log("Subarray:", arrr.slice(startt, endd + 1));

//Kadane's Algorithm

let arr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

let currentSum1 = arr1[0];
let maxSum1 = arr1[0];

for (let i = 1; i < arr1.length; i++) {

    currentSum1 = Math.max(arr1[i], currentSum1 + arr1[i]);

    maxSum1 = Math.max(maxSum1, currentSum1);
}

console.log(maxSum1);


// let arr = [2, 2, 1, 2, 3, 2, 2];
// let count;
// let result=[];
// let maxCount=0;
// let maxNum;

// for(let i=0; i<arr.length; i++){
//   if(!result.includes(arr[i])){
//     count=1;
//     for(let j=i+1; j<arr.length; j++){
//       if(arr[i]===arr[j]){
//         count++;
//         result.push(arr[i]);       
//       }
//     }
//     if(count>maxCount){
//       maxCount=count;
//       maxNum=arr[i];
//     }
//   }
// }
// console.log(maxNum);

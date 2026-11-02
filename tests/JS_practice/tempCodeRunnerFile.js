let arr = [2, 2, 1, 2, 3, 2, 2];
let count;
let result=[];
let maxCount=0;
let maxNum;

for(let i=0; i<arr.length; i++){
  if(!result.includes(arr[i])){
    count=1;
  for(let j=i+1; i<arr.length; j++){
    if(arr[i]===arr[j]){
      count++;
      result.push(arr[i]);
    }
  }
    if(count>maxCount){
      maxCount=count;
      maxNum=arr[i];
    }
  }   
}

console.log(maxCount);
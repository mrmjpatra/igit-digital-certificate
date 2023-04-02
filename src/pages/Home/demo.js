let obj={
    name:'mrmj',
    addrs:'asdf',
    age:30
};

const type="name";
let obj1={...obj,[type]:'asdf'};
console.log(obj);
console.log(obj1);

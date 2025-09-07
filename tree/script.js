const printTree = require('./printTree');

let data = {
"name": 1,
"items": [
    {
        "name": 2,
        "items": [
            { "name": 3 }, 
            { "name": 4 }
        ]
}, 
{
"name": 5,
"items": [
    { "name": 6 }
]
}]
};

printTree.printTree(data);
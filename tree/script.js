function printTree(data, level = 0) {
  const indent = '  '.repeat(level);
  console.log(`${indent}${data.name}`);

  if (data.items) {
    data.items.forEach((item, index) => {
      const isLast = index === data.items.length - 1;
      console.log(`${indent}${isLast ? '└── ' : '├── '}`);
      printTree(item, level + 1);
    });
  }
}

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

printTree(data);
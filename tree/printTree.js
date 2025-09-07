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

module.exports = {
    printTree: printTree
};

const printTree = require('./printTree');

// Мокаем console.log для тестирования
jest.spyOn(console, 'log');

describe('printTree function', () => {
    afterEach(() => {
        // Очищаем все вызовы console.log после каждого теста
        console.log.mockClear();
    });

    test('should print single node without children', () => {
        const data = { name: 'root' };
        printTree.printTree(data);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('root');
    });

    test('should print node with one child', () => {
        const data = {
            name: 'root',
            items: [{ name: 'child' }]
        };
        printTree.printTree(data);
        expect(console.log).toHaveBeenCalledTimes(3);
        expect(console.log).toHaveBeenNthCalledWith(1, 'root');
        expect(console.log).toHaveBeenNthCalledWith(2, '└── ');
        expect(console.log).toHaveBeenNthCalledWith(3, '  child');
    });

    test('should print node with multiple children', () => {
        const data = {
            name: 'root',
            items: [
                { name: 'child1' },
                { name: 'child2' },
                { name: 'child3' }
            ]
        };
        printTree.printTree(data);
        expect(console.log).toHaveBeenCalledTimes(7);
        expect(console.log).toHaveBeenNthCalledWith(1, 'root');
        expect(console.log).toHaveBeenNthCalledWith(2, '├── ');
        expect(console.log).toHaveBeenNthCalledWith(3, '  child1');
        expect(console.log).toHaveBeenNthCalledWith(4, '├── ');
        expect(console.log).toHaveBeenNthCalledWith(5, '  child2');
        expect(console.log).toHaveBeenNthCalledWith(6, '└── ');
        expect(console.log).toHaveBeenNthCalledWith(7, '  child3');
    });

    test('should handle nested structure', () => {
        const data = {
            name: 'root',
            items: [
                {
                    name: 'child1',
                    items: [
                        { name: 'grandchild1' },
                        { name: 'grandchild2' }
                    ]
                },
                {
                    name: 'child2'
                }
            ]
        };
        printTree.printTree(data);
        expect(console.log).toHaveBeenCalledTimes(9);
        expect(console.log).toHaveBeenNthCalledWith(1, 'root');
        expect(console.log).toHaveBeenNthCalledWith(2, '├── ');
        expect(console.log).toHaveBeenNthCalledWith(3, '  child1');
        expect(console.log).toHaveBeenNthCalledWith(4, '  ├── ');
        expect(console.log).toHaveBeenNthCalledWith(5, '    grandchild1');
        expect(console.log).toHaveBeenNthCalledWith(6, '  └── ');
        expect(console.log).toHaveBeenNthCalledWith(7, '    grandchild2');
        expect(console.log).toHaveBeenNthCalledWith(8, '└── ');
        expect(console.log).toHaveBeenNthCalledWith(9, '  child2');
    });

    test('should handle empty items array', () => {
        const data = {
            name: 'root',
            items: []
        };
        printTree.printTree(data);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console    .log).toHaveBeenCalledWith('root');
});

test('should handle missing items property', () => {
    const data = { name: 'root' };
    printTree.printTree(data);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('root');
});

test('should handle null items', () => {
    const data = {
        name: 'root',
        items: null
    };
    printTree.printTree(data);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('root');
});

test('should handle empty data object', () => {
    const data = { name: '' };
    printTree.printTree(data);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('');
});
});
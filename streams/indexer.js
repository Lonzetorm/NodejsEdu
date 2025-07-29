const fs = require('fs');
const { Transform, Writable } = require('stream');

// Трансформер для чтения файла
class WordTokenizer extends Transform {
 constructor() {
 super({ encoding: 'utf8' });
 this.buffer = '';
 }

 _transform(chunk, encoding, callback) {
 this.buffer += chunk;
 const lines = this.buffer.split(/\r?\n/);
 this.buffer = lines.pop();

 lines.forEach(line => {
 const words = line.split(/\s+/);
 words.forEach(word => this.push(word));
 });

 if (this.buffer) {
 const words = this.buffer.split(/\s+/);
 words.forEach(word => this.push(word));
 }

 callback();
 }
}

// Трансформер для очистки слов
class WordCleaner extends Transform {
 constructor() {
 super({ encoding: 'utf8' });
 }

 _transform(chunk, encoding, callback) {
 // Преобразуем буфер в строку
 const text = chunk.toString();
 
 // Разбиваем на слова и очищаем каждое
 text.split(/\s+/).forEach(word => {
 const cleanedWord = word.replace(/[^a-zA-Za-яА-Я0-9]/g, '');
 if (cleanedWord) {
 this.push(cleanedWord.toLowerCase());
 }
 });
 
 callback();
 }
}

// Трансформер для индексации
class WordIndexer extends Transform {
 constructor() {
 super({ objectMode: true });
 this.wordMap = new Map();
 }

 _transform(word, encoding, callback) {
 if (this.wordMap.has(word)) {
 this.wordMap.set(word, this.wordMap.get(word) + 1);
 } else {
 this.wordMap.set(word, 1);
 }
 callback();
 }

 _flush(callback) {
 const sortedWords = Array.from(this.wordMap.keys()).sort();
 const result = sortedWords.map(word => this.wordMap.get(word));
 this.push({ words: sortedWords, counts: result });
 callback();
 }
}

// Записываем результат в файл
class ResultWriter extends Writable {
 constructor(outputFile) {
 super({ objectMode: true });
 this.outputFile = outputFile;
 this.writeStream = fs.createWriteStream(this.outputFile);
 }

 _write(data, encoding, callback) {
 const { words, counts } = data;
 const result = words.map((word, index) => `${word}: ${counts[index]}`);
 this.writeStream.write(result.join('\n'), callback);
 }

 _final(callback) {
 this.writeStream.end(callback);
 }
}

// Основная функция
function processFile(inputFile, outputFile) {
 return new Promise((resolve, reject) => {
 fs.createReadStream(inputFile, 'utf8')
 .pipe(new WordTokenizer())
 .pipe(new WordCleaner())
 .pipe(new WordIndexer())
 .pipe(new ResultWriter(outputFile))
 .on('finish', () => {
 console.log('Данные записаны');
 resolve();
 })
 .on('error', (err) => {
 console.error('Ошибка при обработке:', err);
 reject(err);
 });
 });
}

if (require.main === module) {
 const inputFile = process.argv[2];
 const outputFile = process.argv[3]; 

 if (!inputFile || !outputFile) {
 console.error('Использование: node indexer.js <inputFile> <outputFile>');
 process.exit(1);
 }

 processFile(inputFile, outputFile)
 .then(() => console.log('Индексация завершена'))
 .catch(err => console.error('Ошибка:', err));
}

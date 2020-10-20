const fs = require("fs")
const path = require("path")

const dir = './media/minor/'

// fs.existsSync(dir) ? console.log("Exists") : fs.mkdir(dir, () => console.log("Created"))

const array = [2018, 2019, 2020]

// console.log(path.join(__dirname, dir, array[0].toString()))

array.forEach(year => fs.mkdir(path.join(__dirname, dir, year.toString()), ()=>console.log(`Created file at ${path.join(__dirname, dir, year.toString())}`)))
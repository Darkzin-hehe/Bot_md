const chalk = require("chalk")

const color = (text, color) => {
return !color ? chalk.Red(text) : chalk.keyword(color)(text)
}

module.exports = {
color
}
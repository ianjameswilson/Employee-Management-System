const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function init() {
    inquirer.prompt([
        {
            type: "input",
            name: "year",
            message: "Enter the current year"
        },
        {
            type: "input",
            name: "name",
            message: "Enter your full name"
        },
        {
            type: "input",
            name: "title",
            message: "Enter the title of this app"
        },
        {
            type: "input",
            name: "description",
            message: "Write the main function of this app"
        },
        {
            type: "input",
            name: "installation",
            message: "Write the steps to install dependencies"
        },
        {
            type: "input",
            name: "usage",
            message: "Write the steps to use the app"
        },
        {
            type: "input",
            name: "tests",
            message: "Enter the command(s) to run a test",
        },
        {
            type: "input",
            name: "questions",
            message: "Enter your email address"
        }

    ]).then((answers) => {
        const text = generateREADME(answers);

        writeFileAsync("README.md", text);

        console.log("Succesfully written to README.md");
    }
)}

function generateREADME(answers) {
    return `# ${answers.title}
## Description
${answers.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
* [License](#license)
## Installation
To install neccessary dependancies, run the following command:
\`\`\`
${answers.installation}
\`\`\`
## Usage 
\`\`\`
${answers.usage}
\`\`\`
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## Tests
To run tests, run the following command: 
\`\`\`
${answers.tests}
\`\`\`
## Questions
Direct all questions regarding the app to ${answers.questions}
## License
MIT License
Copyright (c) ${answers.year} ${answers.name}
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}

init();

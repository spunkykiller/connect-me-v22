const fs = require('fs');
const css = fs.readFileSync('live_index.css', 'utf8');

const rootMatch = css.match(/:root\s*{([^}]+)}/);
if (rootMatch) {
    const rootContent = rootMatch[1];
    const variables = {};
    const variableRegex = /(--color-[a-zA-Z0-9-]+|--bg-[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = variableRegex.exec(rootContent)) !== null) {
        variables[match[1]] = match[2].trim();
    }
    console.log(JSON.stringify(variables, null, 2));
} else {
    console.log('No :root found');
}

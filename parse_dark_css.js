const fs = require('fs');
const css = fs.readFileSync('live_index.css', 'utf8');

// The dark mode root variables are usually under a media query or a .dark class.
// Let's get everything inside @media (prefers-color-scheme: dark) { :root { ... } }
// Or just extract the second occurrence of :root 
let match;
const rootRegex = /:root\s*\{([^}]+)\}/g;
const roots = [];
while ((match = rootRegex.exec(css)) !== null) {
    roots.push(match[1]);
}

if (roots.length > 1) {
    const rootContent = roots[1]; // second root is usually dark mode
    const variables = {};
    const variableRegex = /(--color-[a-zA-Z0-9-]+|--bg-[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
    let varMatch;
    while ((varMatch = variableRegex.exec(rootContent)) !== null) {
        variables[varMatch[1]] = varMatch[2].trim();
    }
    console.log("Found Dark Root Variables:");
    console.log(JSON.stringify(variables, null, 2));
} else {
    console.log("Only one root found. Checking for .dark instead.");
    const darkMatch = css.match(/\.dark\s*\{([^}]+)\}/);
    if (darkMatch) {
        const rootContent = darkMatch[1];
        const variables = {};
        const variableRegex = /(--color-[a-zA-Z0-9-]+|--bg-[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
        let varMatch;
        while ((varMatch = variableRegex.exec(rootContent)) !== null) {
            variables[varMatch[1]] = varMatch[2].trim();
        }
        console.log("Found .dark Variables:");
        console.log(JSON.stringify(variables, null, 2));
    } else {
        console.log("Could not find dark mode schema.");
        // let's print the dark media query specifically
        const darkMedia = css.match(/@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{[^}]*\}?/g);
        console.log("Dark media match:", !!darkMedia);
        if (darkMedia && darkMedia[0]) {
            console.log(darkMedia[0].substring(0, 300) + '...');
        }
    }
}

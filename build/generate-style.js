const path = require('path');
const fs=require('fs');
const glob=require('glob');
const componentStylesDir= path.join(__dirname, '../src/components')
const lessEntry = path.join(__dirname, '../src/styles/components/index.less');
const styles = glob.sync(path.join(componentStylesDir, './*/style/index.less'));

let content=''
styles.forEach(style => {
    content += `@import "${style}";\n`;
});

fs.writeFileSync(lessEntry, content)
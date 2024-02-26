function getNumOfSpaces(str) {
    for(let i = 0 ; i < str.length ; i++) {
        if(str[i] !== ' ') return i;
    }
}

module.exports = function (data) {
    const lines = data.split('\n');
    const result = {parent: null, children:[], name: 'main'};
    let currentObj = result;

    let numOfSpacesPrev = -1;
    let numOfSpacesCurr = 0;
    for(let i = 0 ; i < lines.length ; i++) {
        if (lines[i] === '') continue;
        numOfSpacesCurr = getNumOfSpaces(lines[i]);
        const str = lines[i].substring(numOfSpacesCurr, lines[i].length);
        if (numOfSpacesCurr < numOfSpacesPrev) {
            for(let j = 0 ; j <= (numOfSpacesPrev - numOfSpacesCurr); j += 2) {
                currentObj = currentObj.parent;
            }
            currentObj.children.push({name: str, parent: currentObj, children: []})
            currentObj = currentObj.children[currentObj.children.length - 1]
        } else {
            if (numOfSpacesCurr > numOfSpacesPrev) {
                currentObj.children.push({name: str, parent: currentObj, children: []})
                currentObj = currentObj.children[currentObj.children.length - 1]
            } else {
                currentObj.parent.children.push({name: str, parent: currentObj.parent, children: []})
                currentObj = currentObj.parent.children[currentObj.parent.children.length - 1]
            }
        }
        numOfSpacesPrev = numOfSpacesCurr;
    }
    return result;
}

var path = require('path');
var fs = require('fs');

var walkSync = function(dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

const rootDir = path.normalize(__dirname + '/../../node_modules/radaller-mock-data/');
const fileList = walkSync(rootDir);

const filesContent = [];
fileList.forEach(filePath => {
    const relativePath = filePath.replace(rootDir, "");
    filesContent.push({
        id: relativePath.replace(/\//g, '_'),
        dir: path.dirname(relativePath),
        name: path.basename(relativePath),
        path: relativePath,
        content: fs.readFileSync(filePath, {encoding: "utf8"}),
        type: "file",
        encoding: "base64",
        sha: relativePath.replace(/\//g, '_')
    });
});

module.exports = () => {
    return {
        user: require('./data/user.json'),
        repositories: require('./data/repositories.json'),
        authorizations: require('./data/authorizations.json'),
        empty_repository: [],
        repository_with_content: filesContent
    }
};
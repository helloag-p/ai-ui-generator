let versions = [];

function addVersion(data) {
  const id = versions.length;
  versions.push({ id, ...data });
  return id;
}

function getVersion(id) {
  return versions[id];
}

function getAllVersions() {
  return versions;
}

module.exports = {
  addVersion,
  getVersion,
  getAllVersions
};
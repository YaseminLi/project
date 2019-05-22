function convertToStars(stars) {
  var starsArray = [];
  var starsNum = stars.toString().substring(0, 1);
  for (var i = 0; i < 5; i++) {
    starsArray[i] = (i < starsNum ? 1 : 0);
  };
  return starsArray;
}
function convertToCastString(array) {
  var string = '';
  for (var idx in array) {
    string = string + array[idx].name + '/';
  }
  return string.substring(0, string.length - 1);
}
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}
module.exports = {
  convertToStars: convertToStars,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}

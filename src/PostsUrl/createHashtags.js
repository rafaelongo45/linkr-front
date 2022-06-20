export default function createHashtags(string){
  const hashtags = [];
  const stringArr = string.split(' ');

  for(let i = 0; i < stringArr.length; i++){
    if(stringArr[i][0] === '#'){
      const hashtag = stringArr[i].replace('#', '')
      hashtags.push({hashtag});
    }
  }

  return hashtags;
}
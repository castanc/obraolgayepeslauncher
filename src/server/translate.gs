
//GENERIC WAY TO HANDLE BIG TEXTS TO TRANSLETE


function splitText(text, chunkSize)
{
  let arr = [];
  let chSize = chunkSize;
  while ( text.length > 0 )
  {
    while (  (chSize)< text.length && text[chSize] != " ")
    {
      chSize++;
    }
    if ( text.length > (chSize))
    {
      arr.push(text.substr(0,chSize));
      text = text.substr(chSize);
    }
    else
    {
      arr.push(text);
      text = "";
    }
  }
  return arr;
}


function getText(text,lang)
{
  let result = "";
  let arr = []

  if ( lang == "en")
  {
    result = text;
  }
  else
  {
    arr = splitText(text,4000);
    for(let i=0; i<arr.length; i++)
    {
      result = result + LanguageApp.translate(arr[i], 'en', lang);
    }
  }
  return result;
}


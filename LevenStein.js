let lookupdomains=[];

 const jaroWinkler = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
  
    if (len1 === 0 && len2 === 0) return 1;
  
    const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;
  
    let matches1 = new Array(len1).fill(false);
    let matches2 = new Array(len2).fill(false);
  
    let matches = 0;
    let transpositions = 0;
  
    for (let i = 0; i < len1; i++) {
      const start = Math.max(0, i - matchDistance);
      const end = Math.min(i + matchDistance + 1, len2);
  
      for (let j = start; j < end; j++) {
        if (matches2[j]) continue;
        if (str1[i] !== str2[j]) continue;
        matches1[i] = true;
        matches2[j] = true;
        matches++;
        break;
      }
    }
  
    if (matches === 0) return 0;
  
    let k = 0;
    for (let i = 0; i < len1; i++) {
      if (!matches1[i]) continue;
      while (!matches2[k]) k++;
      if (str1[i] !== str2[k]) transpositions++;
      k++;
    }
  
    transpositions /= 2;
  
    const similarity =
      (matches / len1 + matches / len2 + (matches - transpositions) / matches) / 3;
  
    const prefixLength = 4;
    let k2 = 0;
    for (let i = 0; i < Math.min(prefixLength, len1); i++) {
      if (str1[i] === str2[i]) k2++;
      else break;
    }
  
    return similarity + 0.1 * k2 * (1 - similarity);
  }
  
  
  const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= s.length; j++) {
        arr[i][j] =
          i === 0
            ? j
            : Math.min(
                arr[i - 1][j] + 1,
                arr[i][j - 1] + 1,
                arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
              );
      }
    }
    return arr[t.length][s.length];
  };
  
  const containsSearch = (s, t) => {
   if (t.includes(s)){
    console.log(s);
    console.log(t);
    return t;
   }
  
  };
  function lookupDomain() {  
  
  document.getElementById("levensteinResult").innerHTML="<h2>LevenSteinDistance Results:</h2>";
  document.getElementById("containsResult").innerHTML="<h2>List Contains Results:</h2>";
  document.getElementById("jaroWinklerResult").innerHTML="<h2>jaroWinkler Results:</h2>";
  domain=document.getElementById("domain").value;
  let finalresult=[];  
    
console.log(lookupdomains)
  lookupdomains.forEach(element => {
    levensteinResult=levenshteinDistance(domain,element)
    if (levensteinResult<5){
      document.getElementById("levensteinResult").innerHTML+=element+"<br/>";
    }
    containsResult=containsSearch(domain,element);
    if (containsResult){
      document.getElementById("containsResult").innerHTML+=element+"<br/>";
    }
    jaroWinklerResult=jaroWinkler(domain,element);
    if (jaroWinklerResult>0.75){
      document.getElementById("jaroWinklerResult").innerHTML+=element+"<br/>";
    }
  
  });
  document.getElementById("youEntered").innerHTML="<h1>You Entered:</h1>"+domain;
  
  }
  document.getElementById('file').onchange  = function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent) {
      var fileContentArray = this.result.split(/\r\n|\n/);
      var lines=fileContentArray
      for (var line = 0; line < lines.length - 1; line++) {
        lookupdomains.push(lines[line]);
      }
    };
    reader.readAsText(file);
  };  
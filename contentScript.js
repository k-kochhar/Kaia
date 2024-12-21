function getArticleText() {
  const paragraphs = document.querySelectorAll('p');
  let text = "";
  paragraphs.forEach((p) => {
    text += p.innerText + "\n";
  });
  return text;
}

const articleText = getArticleText();
console.log("Extracted article text:", articleText);

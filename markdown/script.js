const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

const convertMarkdown = () => {
  const img = /!\[(.*?)\]\((.*?)\)/g;
  const link = /\[(.*?)\]\((.*?)\)/g;
  const headings = /^\s*(#{1,3})\s+(.*)$/gm;
  const quotes = /^\s*>\s+(.*)$/gm;
  const strong = /(\*\*|__)(.*?)\1/g;
  const em = /(?<!\*)\*(?!\*)(.*?)\*(?!\*)|(?<!_)_(?!_)(.*?)_(?!_)/g;

  let result = markdownInput.value;

  
  result = result.replace(img, `<img alt="$1" src="$2">`);
  result = result.replace(link, `<a href="$2">$1</a>`);
  result = result.replace(headings, (m, h, t) =>
    `<h${h.length}>${t}</h${h.length}>`
  );
  result = result.replace(quotes, `<blockquote>$1</blockquote>`);
  result = result.replace(strong, `<strong>$2</strong>`);
    result = result.replace(em, (m, g1, g2) =>
    `<em>${g1 || g2}</em>`
  );

  return result;
};

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  htmlOutput.textContent = html;
  preview.innerHTML = html;
});
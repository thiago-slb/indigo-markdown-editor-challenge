import { useState } from "react";

function App() {
  const [formattedText, setFormmatedText] = useState<any>([]);

  const escapeRegExp = (strToReplace: string) => strToReplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function replaceAllOccurrences({ str, find, replace }: { str: string, find: string, replace: string }) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

  }

  function isH2(text: string) {
    return text[0] === '#' && text[1] === '#';
  }
  function isH1(text: string) {
    return text[0] === '#' && text[1] !== '#';
  }

  function createNewLine(text: string, cleanedText: string) {
    if (isH2(text)) {
      return <h2>{cleanedText}</h2>;
    } else if (isH1(text)) {
      return <h1>{cleanedText}</h1>;
    } else {
      return <p>{text}</p>;
    }
  }

  function parseMarkdown(text: string) {
    let textArray = text.split("\n");
    let formattedElements: any[] = [];

    for (let i = 0; i < textArray.length; i++) {
      const cleanedText = replaceAllOccurrences({ str: textArray[i], find: '#', replace: '' });
      formattedElements.push(createNewLine(textArray[i], cleanedText));
    }
    setFormmatedText(formattedElements)
  }

  function getFormattedValue() {
    return formattedText.map((line: any, index: string) => {
      return (
        <div key={index}>{line}</div>
      )
    })
  }
  return (
    <div style={{ width: "100%", margin: "0 auto", display: "flex" }}>
      <textarea style={{ flex: 1, height: '100%' }} onChange={(e) => parseMarkdown(e.target.value)} rows={5} />
      <div style={{ flex: 1, border: "1px solid #ccc" }}>
        {getFormattedValue()}
      </div>
    </div>
  );
}

export default App;

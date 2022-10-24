import { useState } from "react";

function App() {
  const [formattedText, setFormmatedText] = useState<any>([]);

  const escapeRegExp = (strToReplace: string) => strToReplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function replaceAllOccurrences({ str, find, replace }: { str: string, find: string, replace: string }) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  function isH2(text: string) {
    const newRegex = new RegExp('^##');
    return newRegex.test(text);
  }
  function isH1(text: string) {
    const newRegex = new RegExp('^#');
    return newRegex.test(text);
  }
  function isHr(text: string) {
    const newRegex = new RegExp('^---');
    return newRegex.test(text);
  }

  function createNewLine(text: string, cleanedText: string) {
    if (isH2(text)) {
      return <h2>{cleanedText}</h2>;
    } else if (isH1(text)) {
      return <h1>{cleanedText}</h1>;
    } else if (isHr(text)) {
      return <hr />;
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
    <div style={styles.container}>
      <textarea style={styles.textArea} onChange={(e) => parseMarkdown(e.target.value)} rows={5} placeholder="Type here..." />
      <div style={styles.formmatedArea}>
        {getFormattedValue()}
      </div>
    </div>
  );
}

const styles = {
  container: { width: "100%", height: "100%", margin: "0 auto", display: "flex" },
  textArea: { flex: 1, height: '100%' },
  formmatedArea: { flex: 1, height: "100%", border: "1px solid #ccc" }
}

export default App;

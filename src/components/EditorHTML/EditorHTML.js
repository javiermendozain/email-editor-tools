// Dependencies
import React from "react";
import EmailEditor from "react-email-editor";

const HTMLEditor = ({ setEditor }) => {
  return (
    <div>
      <EmailEditor
        displayMode="web"
        // style={{ margin: "0" }}
        className="editorHTML"
        ref={(editor) => setEditor(editor)}
        options={{
          locale: "es-ES",
          customJS: [
            window.location.protocol +
              "//" +
              window.location.host +
              "/custom.js",
          ],
          customCSS: [" body { background-color: yellow;  } "],
        }}
      />
    </div>
  );
};

export default HTMLEditor;

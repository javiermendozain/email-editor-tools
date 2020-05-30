// Dependencies
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorTinymce = ({
  handleEditorChange,
  defaultValue = "",
  value = "",
}) => {
  return (
    <Editor
      initialValue={defaultValue}
      value={value}
      init={{
        height: 350,
        menubar: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "  undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | link image tinydrive  | help",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default EditorTinymce;

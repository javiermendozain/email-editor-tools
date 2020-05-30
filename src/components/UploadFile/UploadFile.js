import * as React from "react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  OpenFolder,
  UploadFile as UploadFileIcon,
  UploadPicture,
  Upload,
} from "../../assets";

function UploadFile({
  callBack,
  accept = "image/*",
  maxSize = 10000000, //default 10000000 5MB,
  reject = () => alert(`El tamaño max archivo es: ${maxSize / 1000000} MB`),
  multiple = false,
}) {
  const [fileUploaded, setfileUploaded] = useState(false);
  const [name, setname] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      setname(acceptedFiles[0].name);
      setfileUploaded(true);

      // Return files uploaded to do something with the files
      callBack(acceptedFiles);
    } else {
      reject();
    }
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <img width="60" height="60" src={OpenFolder} alt="archivoSubido" />
      ) : (
        <div>
          {fileUploaded ? (
            <div>
              <img width="60" height="60" src={UploadFileIcon} alt="archivo" />
              <p>{name}</p>
            </div>
          ) : (
            <div>
              <img
                width="60"
                height="60"
                src={accept.split("/")[0] === "image" ? UploadPicture : Upload}
                alt="subirImagen"
              />
              <p>Haga clic para seleccionar</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadFile;

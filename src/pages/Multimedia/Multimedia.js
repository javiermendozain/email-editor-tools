// Dependencies
import * as React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { useToasts } from "react-toast-notifications";
import * as Clipboard from "clipboard";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Components
import { Layout, UploadFile } from "../../components";

// Helpers
import { getExtensionFile } from "../../helpers";

// Assets
import { Ranking_Blanco } from "../../assets";
import "./multimediaStyle.css";

// More info: https://clipboardjs.com/
const clipboard = new Clipboard(".copier");
// clipboard.destroy();

const Multimedia = () => {
  // Hooks
  const { addToast } = useToasts();

  // States
  const [Refresh, setRefresh] = useState(true);
  const [AddFile, setAddFile] = useState(false);

  const [TemporalFile, setTemporalFile] = useState([]);
  const [Folders, setFolders] = useState([]);
  const [searchFile, setSearchFile] = useState("");
  let [dropdownOpen, setDropdownOpen] = useState(0);
  let [folderSelect, setFolderSelect] = useState("");

  useEffect(() => {
    var temporalFiles = [];

    const storageRef = firebase.storage();

    storageRef
      .ref()
      .listAll()
      .then(async (res) => {
        // Files
        /*
          res.items.map(({ name, fullPath, ...item }) => {
            temporalFiles = [
              ...temporalFiles,
              ...[
                {
                  name,
                  fullPath,
                },
              ],
            ];
            setTemporalFile(temporalFiles);
          });
          */

        const folderInside = [];

        // Folders
        await res.prefixes.map(async (item) => {
          folderInside.push(item.fullPath);

          // Files inside folders
          await item.listAll().then((res) => {
            res.items.map(async ({ name, fullPath }) => {
              await storageRef
                .ref(fullPath)
                .getDownloadURL()
                .then((url) => {
                  temporalFiles = [
                    ...temporalFiles,
                    ...[
                      {
                        name,
                        fullPath,
                        url,
                      },
                    ],
                  ];
                  setTemporalFile(temporalFiles);
                });
            });
          });
        });

        setFolders(folderInside);
      });
  }, [Refresh]);

  const handleOnChange = async (files, path = "") => {
    await files.map(async (file) => {
      await uploadFile(file, path)
        .then((res) => {
          addToast(`Archivo subido correctamente!`, {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((error) => {
          console.log(`ERROR[handleOnChange] :`, error.message);

          addToast(`Ha ocurrido un error al subir archivo`, {
            appearance: "danger",
            autoDismiss: true,
          });
        });
    });

    setAddFile(!AddFile);
    setTimeout(() => {
      setRefresh(!Refresh);
    }, 1000);
  };

  const uploadFile = async (file, path) => {
    return await new Promise((resolve, reject) => {
      const name = file.name.replace("_", "-");
      const dateUpdated = new Date().getTime();
      const extension = getExtensionFile(name);
      const fileName = `${name}___${dateUpdated}.${extension}`;

      console.log("path: ", path);

      const storageRef = firebase.storage().ref(`${path}/${fileName}`);
      const task = storageRef.put(file);

      task.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        reject,
        () => {
          storageRef.getDownloadURL().then(resolve);
        }
      );
    });
  };

  const copiedSuccess = () => {
    addToast(`URL Copiada!`, {
      appearance: "success",
      autoDismiss: true,
    });
    closetDropdown();
  };

  const closetDropdown = () =>
    setTimeout(() => {
      setDropdownOpen(0);
    }, 0);

  const deteleFile = (item) => {
    if (window.confirm("¿Está seguro de borrar el archivo?")) {
      const storageRef = firebase.storage().ref(`${item.fullPath}`);
      storageRef.delete().then((res) => {
        addToast(`Archivo eliminado`, {
          appearance: "success",
          autoDismiss: true,
        });
        closetDropdown();
        setTimeout(() => {
          setRefresh(!Refresh);
        }, 1000);
      });
    }
  };

  // Waiting Render and clear btn styles
  changeStyleButton();

  return (
    <Layout>
      <div className=" shadow m-2 p-2 rounded  bg-secondary ">
        <div className="row">
          <div className="col">
            <h4 className=" m-3">Gestinar archivo</h4>
          </div>
          <div className="col">
            {folderSelect && AddFile && (
              <>
                <UploadFile
                  callBack={(files) =>
                    handleOnChange(files, folderSelect.trim())
                  }
                  multiple={true}
                  accept="application/*, image/*"
                />
              </>
            )}
          </div>
          <div className="col-auto">
            {folderSelect && (
              <div
                onClick={() => setAddFile(!AddFile)}
                className="btn btn-outline-primary mr-1"
              >
                <i
                  className={`fas fa-${
                    AddFile ? "window-close" : "plus"
                  } fa-1x`}
                ></i>
              </div>
            )}
            <div
              onClick={() => setRefresh(!Refresh)}
              className="btn btn-outline-primary"
            >
              <i className="fas fa-sync fa-1x"></i>
            </div>
          </div>
        </div>

        <div className=" py-3">
          <div className="row">
            <div className="col-md-4">
              <div className="container h-100  border-dark border-right">
                <div className="input-group  mb-3">
                  <input
                    type="search"
                    onChange={(e) => setSearchFile(e.target.value)}
                    className="form-control form-control-sm"
                    aria-controls="dataTable"
                    placeholder="Search"
                  />
                  <div className="input-group-append border  rounded-right  ">
                    <button className="btn btn-primary py-0" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {Folders.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          closetDropdown();
                          setFolderSelect(item);
                        }}
                        className={`list-group-item ${
                          folderSelect === item && "active"
                        } `}
                      >
                        <i className="fas fa-folder " />
                        &nbsp; {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-md-8 p-5">
              <div className="row">
                {folderSelect.length < 1 && (
                  <p className="text-center">Seleciona una carpeta</p>
                )}
                {TemporalFile.filter(
                  (item) => item.fullPath.split("/")[0] === folderSelect
                )
                  .filter((item) =>
                    searchFile.length > 0
                      ? item.name
                          .toLowerCase()
                          .search(searchFile.toLowerCase()) >= 0
                      : true
                  )
                  .sort(orderByDate)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="col-xs-6 col-sm-3 col-md-3 text-center "
                      >
                        <FilePreview File={item} />

                        <Dropdown
                          isOpen={dropdownOpen === index + 1}
                          toggle={() => setDropdownOpen(index + 1)}
                        >
                          <DropdownToggle className="quite-btn bg-transparent border-0 text-white">
                            <i className="fas fa-ellipsis-h"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              className="copier"
                              data-clipboard-action="copy"
                              data-clipboard-target={`.toCopy-${index}`}
                              onClick={copiedSuccess}
                            >
                              <div className="input-group mb-3">
                                <input
                                  className={` form-control form-control-sm toCopy-${index}`}
                                  defaultValue={item.url}
                                  aria-controls="dataTable"
                                />
                                <div className="input-group-append border  rounded-right  ">
                                  <button className="btn btn-primary py-0">
                                    <i className="fas fa-copy"></i>
                                  </button>
                                </div>
                              </div>
                            </DropdownItem>
                            <DropdownItem onClick={() => deteleFile(item)}>
                              Eliminar
                            </DropdownItem>
                            <DropdownItem onClick={closetDropdown}>
                              Cerrar
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        <p className="text-center">
                          {item.name.split("___")[0]}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const FilePreview = ({ File }) => {
  const extension = getExtensionFile(File.name);

  if (["jpg", "jpeg", "png", "bmp", "jfif", "svg"].includes(extension)) {
    return <img className="card-img-top rounded " src={File.url} />;
  }

  if (["pdf"].includes(extension)) {
    return <i className="fas fa-file-pdf fa-6x" />;
  }

  return <i className="fas fa-file fa-6x" />;
};

const extensionMappingIcon = (ext) => {
  if (["jpg", "jpeg", "png", "bmp", "jfif"].includes(ext)) {
    return "-image";
  }

  if (["pdf"].includes(ext)) {
    return "-" + ext;
  }

  return "";
};

const changeStyleButton = () => {
  setTimeout(() => {
    const buttons = document.getElementsByClassName("quite-btn");

    for (let index = 0; index < buttons.length; index++) {
      const element = buttons.item(index);
      element.classList.remove("btn");
      element.classList.remove("btn-secondary");
    }
  }, 100);
};

// Orden by last created file
const orderByDate = (a, b) => {
  const { name: nameOne } = a;
  const { name: nameTwo } = b;

  const getDateFromName = (name) => {
    const [_, lastPart] = name.split("___");
    if (lastPart) {
      const [dateCreated] = lastPart.split(".");
      return parseInt(dateCreated);
    }
    return 0;
  };

  return getDateFromName(nameTwo) - getDateFromName(nameOne);
};

export default Multimedia;

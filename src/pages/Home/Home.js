// Dependencies
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFirebase } from "react-redux-firebase";

import { useToasts } from "react-toast-notifications";

//Components
import { Layout, HTMLEditor } from "../../components";
import { DB_PATHS, isEmpty } from "../../helpers";

const Home = () => {
  // const
  const PATH_FIREBASE_EMAILS = DB_PATHS.root.emails.ref();
  const content = useSelector((state) => state.firebase.ordered);

  // States
  const [Temaples, setTemaples] = useState([]);
  const [Status, setStatus] = useState("");
  const [Item, setItem] = useState({});
  const { push, update } = useFirebase();
  const { addToast } = useToasts();
  const [updateDesign, setUpdateDesign] = useState([]);
  const [Editor, setEditor] = useState({});
  const [nameTemplate, setNameTemplate] = useState("");

  const checkEditor =
    !isEmpty(Editor) && Editor && Object.keys(Editor).includes("loadDesign");

  useFirebaseConnect([
    {
      path: PATH_FIREBASE_EMAILS,
    },
  ]);

  useEffect(() => {
    if (content[PATH_FIREBASE_EMAILS]) {
      const data = content[PATH_FIREBASE_EMAILS];

      setTemaples(data);
    }
    // eslint-disable-next-line
  }, [content[PATH_FIREBASE_EMAILS]]);

  useEffect(() => {
    if (!isEmpty(Item)) {
      setUpdateDesign(Item?.value?.design);
      if (!isEmpty(Item?.value?.design)) {
        onLoad();
      }
    }
    // eslint-disable-next-line
  }, [Editor]);

  const exportHtml = () => {
    if (!checkEditor) return;

    Editor.exportHtml((data) => {
      const { design, html } = data;

      // Structure data to save
      const dataContent = {
        design: JSON.stringify(design),
        html,
        name: nameTemplate,
      };

      // Keep last edition
      setUpdateDesign([]);
      setNameTemplate("");

      if (Status === "Edit") {
        // update data on firebase
        update(`${PATH_FIREBASE_EMAILS}/${Item.key}`, dataContent);
      } else {
        // Save data on firebase
        push(PATH_FIREBASE_EMAILS, dataContent);
      }

      setStatus("");

      // Show alert
      addToast(`HTML guardado correctamente!`, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const onLoad = () => {
    if (checkEditor) {
      try {
        Editor.loadDesign(JSON.parse(updateDesign));
      } catch (error) {
        console.log("ERROR:[onLoad]", error.message);
      }
    }
  };

  const editItem = (item) => {
    setItem(item);
    if (!isEmpty(item)) {
      setUpdateDesign(item?.value?.design);
      setNameTemplate(item?.value?.name);
      setStatus("Edit");
      onLoad();
    }
  };

  const createNewTemplate = () => {
    setUpdateDesign([]);
    setNameTemplate("");
    setStatus("New");
    onLoad();
    setItem({});
  };

  return (
    <Layout>
      <div className=" shadow m-2 p-2 rounded  bg-secondary ">
        <div className="row">
          <div className="col pt-2">
            <small className="m-3 alert alert-info">
              Doble click para editar
            </small>
          </div>
          <div className="col-auto">
            <div
              onClick={createNewTemplate}
              className="btn btn-outline-primary m-1"
            >
              <i className="fas fa-plus fa-1x"></i>
            </div>

            {Status !== "" && (
              <div onClick={exportHtml} className="btn btn-outline-info">
                <i className="fas fa-save fa-1x"></i>
              </div>
            )}
          </div>
        </div>

        <div className=" py-3">
          <div className="row">
            <div className="col-md-3">
              <div className="container h-100  border-dark border-right">
                <ul className="">
                  {Temaples.map((item) => {
                    return (
                      <li
                        onClick={() => editItem(item)}
                        key={item?.value?.name}
                      >
                        <p>{item?.value?.name}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className="col-md-9"
              {...{ style: { display: Status === "" ? "none" : "" } }}
            >
              <div className="form-group">
                <input
                  className="form-control w-50"
                  type="text"
                  placeholder="Ingresa el nombre de plantilla"
                  value={Item?.value?.name}
                  onChange={(ev) => setNameTemplate(ev.target.value)}
                />
              </div>
              <HTMLEditor setEditor={setEditor} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

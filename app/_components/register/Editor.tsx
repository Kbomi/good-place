import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./styles.module.css";

export interface EditorComponentRef {
  getContent: () => string;
}

interface EditorProps {
  initContent?: string;
}

export const EditorComponent = forwardRef<EditorComponentRef, EditorProps>(
  ({ initContent = "" }: EditorProps, ref) => {
    const [content, setContent] = useState("");

    useImperativeHandle(ref, () => ({
      getContent: () => content,
    }));

    useLayoutEffect(() => {
      if (initContent) {
        setContent(initContent);
      }
    }, [initContent]);

    return (
      <div className={styles["editor-wrap"]}>
        <Editor
          id="tinyEditor"
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_EDITOR_KEY}
          init={{
            menubar: false,
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
          }}
          value={content}
          onEditorChange={(text: string) => setContent(text)}
        />
      </div>
    );
  }
);

EditorComponent.displayName = "Editor";
export default EditorComponent;

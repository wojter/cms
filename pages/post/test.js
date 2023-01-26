import { useEffect, useState } from "react";
import CKeditor from "../../components/front/CKeditor";
import parse from "html-react-parser";
// import Base64UploadAdapter from "@ckeditor/ckeditor-upload/src/adapters/base64uploadadapter";

export default function index() {
  // const articleText = <p>How do we become better every single day? We develop practices that will help move us incrementally forward. Small steps, taken consistently. This is the path to a good life.</p><blockquote>“Seneca gives a pretty simple prescription for the good life. “Each day,” he wrote, “acquire something that will fortify you against poverty, against death, indeed against other misfortunes, as well and after you have run over many thoughts, select one to be thoroughly digested that day.” One gain per day. That’s it.”- <a href="https://forge.medium.com/all-you-need-are-a-few-small-wins-every-day-f1a6d2bf9fb3" rel="noopener" target="_blank">Ryan Holiday</a></blockquote><p>While routines can be important for consistency and productivity, what is even more important is our practices. These are things we do, no matter what our routine looks like, no matter if something comes up that derails us.</p><p>But we need to start small and make sure our practices are sustainable. The idea is to take small but consistent steps, every single day — 1% improvement.</p>;
  const testArticleBody =
    '<p>How do we become better every single day? We develop practices that will help move us incrementally forward. Small steps, taken consistently. This is the path to a good life.</p><blockquote><p><i>“Seneca gives a pretty simple prescription for the good life. “Each day,” he wrote, “acquire something that will fortify you against poverty, against death, indeed against other misfortunes, as well and after you have run over many thoughts, select one to be thoroughly digested that day.” One gain per day. That’s it.”- </i><a href="https://forge.medium.com/all-you-need-are-a-few-small-wins-every-day-f1a6d2bf9fb3"><i>Ryan Holiday</i></a></p></blockquote><p>While routines can be important for consistency and productivity, what is even more important is our practices. These are things we do, no matter what our routine looks like, no matter if something comes up that derails us.</p><p>But we need to start small and make sure our practices are sustainable. The idea is to take small but consistent steps, every single day — 1% improvement.</p>';
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <div>
      <CKeditor
        name="description"
        onChange={(data) => {
          setData(data);
          console.log(data);
        }}
        editorLoaded={editorLoaded}
      />
      {JSON.stringify(data)}
      {parse(testArticleBody)}
    </div>
  );
}

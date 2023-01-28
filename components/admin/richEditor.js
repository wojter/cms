import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState, useEffect } from "react";
import { HiPhotograph } from "react-icons/hi";
import ModalImagesGrid from "./modals/modalImagesGrid";
import ModalThumbnail from "./modals/modalThumbnail";
import useModal from "./hooks/useModal";
import { useToast } from "./providers/toastProvider";
import { useRefetch } from "./providers/refetchProvider";
import { Button, Label, TextInput } from "flowbite-react";

class MyUploadAdapter {
  constructor(loader, user_id) {
    this.loader = loader;
    this.user_id = user_id;
  }

  upload() {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        const file = await this.loader.file;
        formData.append("file", file);
        formData.append("upload_preset", "uploads");
        let data = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        data = await data.json();

        const body = {
          user_id: this.user_id,
          slug: file.name,
          url: data.secure_url,
          public_id: data.public_id,
        };

        const res = await fetch("/api/admin/images/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (res.status === 200) {
          resolve({
            default: data.secure_url,
          });
        } else {
          const msg = await res.text();
          throw new Error(msg);
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  abort() {
    console.log("abort");
  }
}

const RichEditor = ({ post, wrapperToggleOpen }) => {

  const [value, setValue] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const imagesGridModalHook = useModal();
  const thumbnailModalHook = useModal();
  const { setToast } = useToast();
  const { refetch } = useRefetch();

  useEffect(() => {
    if (post) {
      fetchUserImages();
      setValue(post.body)
      setThumbnailUrl(post.thumbnail_url);
    }
  }, []);

  const fetchUserImages = async () => {
    try {
      const res = await fetch(
        `/api/admin/images?limit=50&filter=user_id:${post.user_id._id.toString()}`
      );
      if (res.status === 200) {
        const {documents} = await res.json();
        imagesGridModalHook.setData(documents);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUrlAndQuit = (url) => {
    navigator.clipboard.writeText(url);
    imagesGridModalHook.toggleOpen();
  }

  const onSave = async () => {
    try {
      const body = {
        id: post._id.toString(),
        body: value,
        thumbnail_url: thumbnailUrl,
      };
      const res = await fetch("/api/admin/posts/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("Post successfully updated");
        refetch("post");
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
      wrapperToggleOpen();
    } catch (err) {
      console.log(err);
      setToast("An unexpected error occurred while updating post", false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {imagesGridModalHook.data && (
        <ModalImagesGrid
          images={imagesGridModalHook.data}
          isOpen={imagesGridModalHook.isOpen}
          toggleOpen={imagesGridModalHook.toggleOpen}
          getUrlAndQuit={getUrlAndQuit}
        />
        
      )}
      {thumbnailUrl && (

        <ModalThumbnail
        isOpen={thumbnailModalHook.isOpen}
        toggleOpen={thumbnailModalHook.toggleOpen}
        url={thumbnailUrl}
        />
      )}
      <div className="flex flex-row justify-between">
        <div
          className="text-white bg-blue-600 rounded-xl flex flex-row gap-2 px-3 py-1 items-center hover:cursor-pointer hover:bg-blue-700"
          onClick={imagesGridModalHook.toggleOpen}
        >
          <div className="w-8">
            <HiPhotograph className="w-full h-full" />
          </div>
          <p className="whitespace-nowrap">User's images</p>
        </div>
        
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-1 rounded-xl hover:bg-green-600"
          onClick={onSave}
        >
          Save
        </button>
      </div>
      <div className="flex flex-col gap-2">

        <div className="flex flex-row gap-2 items-center ">
          <Label htmlFor="url" value="Thumbnail Url" className="whitespace-nowrap"/>
          <TextInput
            id="url"
            name="url"
            placeholder="Thumbnail Url"
            type="text"
            required={true}
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="w-full"
          />
          <Button className="whitespace-nowrap" onClick={thumbnailModalHook.toggleOpen}>
            Show Thumbnail
          </Button>
        </div> 


        <CKEditor
          editor={Editor}
          data={post.body}
          onReady={(editor) => {

            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader
            ) => {
              return new MyUploadAdapter(loader, post.user_id._id.toString());
            };

            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "500px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data);
            // console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
      </div>

    </div>
  );
};

export default RichEditor;

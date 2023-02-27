import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle, HiTable, HiX, HiTrash, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Breadcrumb from "../../components/admin/breadcrumb";
import useModal from "../../components/admin/hooks/useModal";
import Layout from "../../components/admin/layout";
import ModalDetails from "../../components/admin/modals/modalDetails";
import ModalLookupTable from "../../components/admin/modals/modalLookupTable";
import { useToast } from "../../components/admin/providers/toastProvider";

const PublicContent = () => {
  const [config, setConfig] = useState(null);

  const { setToast } = useToast();
  const postsTableModalHook = useModal();
  const postDetailsModalHook = useModal();

  const [post, setPost] = useState(null);
  const [postId, setPostId] = useState("");

  const setDataAndQuit = (data, input) => {
    setPost(data);
    setPostId(data._id.toString());
    postsTableModalHook.toggleOpen();
  };

  const onMove = async (id, direction) => {
    try {
      const body = {
        array_id: id,
        direction,
      };
      const res = await fetch("/api/admin/public_content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        fetchConfig();
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      setToast(
        "An unexpected error occurred while modifying config",
        false
      );
    }
  }

  const onDelete = async (id) => {
    try {
      const body = {
        array_id: id,
      };
      const res = await fetch("/api/admin/public_content/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("Successfully deleted front post");
        fetchConfig();
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      setToast(
        "An unexpected error occurred while modifying config",
        false
      );
    }
  }

  


  const handleSubmitNewFrontPost = async (e) => {
    e.preventDefault();
    try {
      const body = {
        post_id: e.target["post_id"].value,
      };
      if (!body.post_id) {
        setToast("Please provide post id", false);
        return;
      }
      const res = await fetch("/api/admin/public_content/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("Added new post to front successfully");
        fetchConfig();
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log(error);
      setToast(
        "An unexpected error occurred while adding new front post",
        false
      );
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    console.log("configgggg", config);
  }, [config]);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/public_content");
      if (res.status === 200) {
        const config = await res.json();
        setConfig(config);
      } else {
        Router.push("/admin");

        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      setToast("An error occured while fetching data", false);
    }
  };

  const postsTableProps = {
    title: "Posts",
    refetchName: "lookup-posts",
    apiPath: "posts",
    headers: ["id", "title", "category", "created", "modified"],
    headerTypes: ["string", "string", "string", "date", "date"],
    dataMapper: (post) => [
      post._id,
      post.title,
      post.category_id?.name,
      post.created,
      post.modified,
    ],
    setDataAndQuit,
    headerNameToReturnFrom: "id",
  };

  const postDetailsProps = {
    title: "Post Details",
    formData: [
      ["ID", "_id", "string"],
      ["Category", "category_id", "object", "name", "string"],
      ["Title", "title", "string"],
      ["Created", "created", "date"],
      ["Last modified", "modified", "date"],
    ],
  };

  return (
    <Layout active={"Public content"}>
      <ModalLookupTable
        isOpen={postsTableModalHook.isOpen}
        toggleOpen={postsTableModalHook.toggleOpen}
        tableProps={postsTableProps}
      />
      {post && (

        <ModalDetails
        isOpen={postDetailsModalHook.isOpen}
        toggleOpen={postDetailsModalHook.toggleOpen}
        object={{ ...post, title: post.title.substring(0, 30) + "..." }}
        details={postDetailsProps}
        />
      )}
      <p className="text-4xl">Public content</p>

      <Breadcrumb paths={[["Public content", "/admin/public-content"]]} />
      {config && (
        <div className="flex flex-col gap-4">
            <>
              <div className="flex flex-row gap-24">
                <p className="text-4xl">Front page posts:</p>
                <form
                  id="new-from-post-form"
                  onSubmit={handleSubmitNewFrontPost}
                  className="bg-gray-600 flex flex-row gap-16 items-center px-4 py-2 w-[720px]"
                >
                  <Label
                    htmlFor="post_id"
                    value="Choose new front post"
                    className="text-xl"
                  />
                  <div className="flex flex-row gap-2 relative">
                    <TextInput
                      id="post_id"
                      name="post_id"
                      placeholder="Post ID"
                      type="text"
                      required={true}
                      readOnly={true}
                      className="w-[250px]"
                      value={postId}
                    />
                    <button
                      className="w-6 text-white hover:text-gray-300 absolute h-full right-2"
                      type="button"
                      onClick={() => {
                        postsTableModalHook.toggleOpen();
                      }}
                    >
                      <HiTable className="w-full h-full" />
                    </button>
                    {postId && (
                      <>
                        <button
                          className="w-6 text-blue-500 hover:text-blue-600 absolute h-full -left-8 hover:cursor-pointer"
                          type="button"
                          onClick={postDetailsModalHook.toggleOpen}
                        >
                          <HiInformationCircle className="w-full h-full" />
                        </button>
                        <div className="h-full w-8 absolute top-0 right-8 grid place-items-center">
                          <div
                            onClick={() => {
                              setPostId("");
                              setPost(null);
                            }}
                            className="w-4 text-gray-500 hover:cursor-pointer"
                          >
                            <HiX className="w-full h-full" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <Button type="submit" color="success">
                    Add Post
                  </Button>
                </form>
              </div>
              <div className="flex flex-row gap-4 overflow-x-auto w-[1200px] py-4">
                {config.frontPosts.map((post, key) => (
                  <div
                    key={key}
                    className="min-w-[300px] max-w-[300px] flex flex-col gap-2 bg-gray-600 p-4 rounded hover:bg-gray-700 relative group"
                  >
                    <div className="flex flex-row gap-2 justify-between">
                      <div className="w-10 cursor-pointer hover:text-gray-300" onClick={() => onMove(key, "left")}>
                        <HiChevronLeft className="w-full h-full" />
                      </div>
                      <div className="w-8 cursor-pointer hover:text-gray-300" onClick={() => onDelete(key)}>
                      <HiTrash className="w-full h-full" />
                      </div>
                      <div className="w-10 cursor-pointer hover:text-gray-300" onClick={() => onMove(key, "right")}>
                        <HiChevronRight className="w-full h-full" />
                      </div>
                    </div>
                    <p className="text-2xl">{post.title}</p>
                    <img src={post.thumbnail_url} alt="thumbnail" />

                  </div>
                ))}
              </div>
            </>
        </div>
      )}
    </Layout>
  );
};
PublicContent.theme = 'dark'
export default PublicContent;

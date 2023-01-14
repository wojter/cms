import Breadcrumb from "../../../components/admin/breadcrumb";
import Layout from "../../../components/admin/layout";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Title from "../../../components/admin/title";
import ModalEditReaction from "../../../components/admin/modals/modalEditReaction";
import ModalDeleteReaction from "../../../components/admin/modals/modalDeleteReaction";
import { useRefetch } from "../../../components/admin/providers/refetchProvider";
import useModal from "../../../components/admin/hooks/useModal";
import { Spinner } from "flowbite-react";
import Form from "../../../components/admin/form";
import { useToast } from "../../../components/admin/providers/toastProvider";

const ReactionDetails = () => {
  const [reaction, setReaction] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const router = useRouter();
  const { id: reactionId } = router.query;

  const editReactionModalHook = useModal();
  const deleteReactionModalHook = useModal();

  const { setToast } = useToast();
  const { toRefetch, refetch, refetchReset } = useRefetch();

  useEffect(() => {
    if (toRefetch) {
      if (toRefetch === "reaction") {
        fetchReaction();
        refetchReset();
      }
    }
  }, [toRefetch]);

  useEffect(() => {
    if (router && router.route === router.asPath) {
      Router.push("/admin/reactions");
    } else if (reactionId) {
      fetchReaction();
    }
  }, [reactionId]);

  const fetchReaction = async () => {
    try {
      setDataLoading(true);
      const res = await fetch(`/api/admin/reactions/${reactionId}`);
      if (res.status === 200) {
        const reaction = await res.json();
        setReaction(reaction);
        editReactionModalHook.setData(reaction);
        deleteReactionModalHook.setData(reaction);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        Router.push("/admin/reactions");

        throw new Error(await res.text());
      }
    } catch (err) {
      setDataLoading(false);
      console.log(err);
      setToast("An error occured while fetching data", false);
    }
  };

  const formData = [
    ["ID", "_id", "string"],
    ["User", ["user_id", "email"], "link:user"],
    ["Post", ["post_id", "title"], "link:post"],
    ["Category", ["category_id", "name"], "link:category"],
    ["Created", "created", "date"],
    ["Last modified", "modified", "date"],
  ];
  const links = {
    user: {
      linkPrototype: "users/user-details?id=__user_id__",
      linkParams: [["__user_id__", (object) => object.user_id._id.toString()]],
    },
    post: {
      linkPrototype: "posts/post-details?id=__post_id__",
      linkParams: [["__post_id__", (object) => object.post_id._id.toString()]],
    },
    category: {
      linkPrototype: "reactions/categories/category-details?id=__category_id__",
      linkParams: [
        ["__category_id__", (object) => object.category_id._id.toString()],
      ],
    },
  };

  const titleButtons = () => (
    <>
      <button
        onClick={deleteReactionModalHook.toggleOpen}
        className="w-6 h-6 dark:text-red-500 dark:hover:text-red-600 tooltip-delete"
      >
        <HiTrash className="w-full h-full" />
      </button>
      <button
        onClick={editReactionModalHook.toggleOpen}
        className="w-6 h-6 dark:text-blue-500 dark:hover:text-blue-600 tooltip-edit"
      >
        <HiPencilAlt className="w-full h-full" />
      </button>
    </>
  );

  return (
    <Layout active={"Reactions"}>
      {editReactionModalHook.data && (
        <ModalEditReaction
          reaction={editReactionModalHook.data}
          isOpen={editReactionModalHook.isOpen}
          toggleOpen={editReactionModalHook.toggleOpen}
          refetchName="reaction"
        />
      )}
      {deleteReactionModalHook.data && (
        <ModalDeleteReaction
          reaction={deleteReactionModalHook.data}
          isOpen={deleteReactionModalHook.isOpen}
          toggleOpen={deleteReactionModalHook.toggleOpen}
          refetchName="reaction"
        />
      )}
      <Breadcrumb
        paths={[
          ["Reactions", "/admin/reactions"],
          [
            "Reaction Details",
            `/admin/reactions/reaction-details?id=${reactionId}`,
          ],
        ]}
      />
      <Title
        text="Reaction Details"
        buttons={titleButtons}
        returnPath="/admin/reactions"
      />
      {dataLoading ? (
        <Spinner aria-label="Loading data.." />
      ) : !reaction ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <Form formData={formData} object={reaction} links={links} />
      )}
    </Layout>
  );
};

export default ReactionDetails;

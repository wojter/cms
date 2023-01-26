import { Modal as ModalFL, Button, Label, TextInput } from "flowbite-react";
import { useRefetch } from "../providers/refetchProvider";
import { useToast } from "../providers/toastProvider";

const ModalNewPostCategory = ({ isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const body = {
        name: e.target["name"].value,
      };
      const res = await fetch("/api/admin/posts/categories/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("New post category created successfully");
        refetch(refetchName);
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log(error);
      setToast(
        "An unexpected error occurred while creating new post category",
        false
      );
    }
  };

  return (
    <>
      <ModalFL show={isOpen} size="xl" onClose={toggleOpen}>
        <ModalFL.Header>New Post Category</ModalFL.Header>
        <ModalFL.Body>
          <form
            id="new-post-category-form"
            onSubmit={handleSubmit}
            className="space-y-6 px-6 lg:px-8"
          >
            <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                required={true}
              />
            </div>
          </form>
        </ModalFL.Body>
        <ModalFL.Footer className="justify-between">
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button type="submit" form="new-post-category-form" color="success">
            Create Post Category
          </Button>
        </ModalFL.Footer>
      </ModalFL>
    </>
  );
};

export default ModalNewPostCategory;

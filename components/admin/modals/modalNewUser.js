import {
  Modal as ModalFL,
  Button,
  Label,
  TextInput,
  Checkbox,
} from "flowbite-react";
import { useRefetch } from "../providers/refetchProvider";
import { useToast } from "../providers/toastProvider";

const ModalNewUser = ({ isOpen, toggleOpen, refetchName }) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleOpen();
    try {
      const body = {
        email: e.target["email"].value,
        username: e.target["username"].value,
        password: e.target["password"].value,
        is_admin: e.target["is_admin"].checked,
      };
      const res = await fetch("/api/admin/users/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("New user created successfully");
        refetch(refetchName);
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log(error);
      setToast("An unexpected error occurred while creating new user", false);
    }
  };

  return (
    <>
      <ModalFL show={isOpen} size="xl" onClose={toggleOpen}>
        <ModalFL.Header>New User</ModalFL.Header>
        <ModalFL.Body>
          <form
            id="new-user-form"
            onSubmit={handleSubmit}
            className="space-y-6 px-6 lg:px-8"
          >
            <div className="grid grid-cols-[150px_1fr] items-center gap-y-2">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required={true}
              />
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                required={true}
              />
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required={true}
              />
              <Label htmlFor="is_admin" value="Is Admin" />

              <Checkbox id="is_admin" name="is_admin" className="my-2.5" />
            </div>
          </form>
        </ModalFL.Body>
        <ModalFL.Footer className="justify-between">
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button type="submit" form="new-user-form" color="success">
            Create User
          </Button>
        </ModalFL.Footer>
      </ModalFL>
    </>
  );
};

export default ModalNewUser;

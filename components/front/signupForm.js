import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";

const SignupForm = ({ errorMessage, onSubmit }) => {
  return (
    <div className="flex sm:rounded-lg max-w-lg sm:border sm:border-gray-200 bg-white sm:shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-full sm:w-2/3 lg:w-1/3">
      <div className="flex h-full flex-col justify-center gap-4 p-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-1">
          <div>
            <div className="mb-2 block">
              <p className="text-2xl text-gray-900 dark:text-white">
                Signup Form
              </p>
            </div>
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              required={true}
              shadow={true}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="email" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="username"
              placeholder="Email"
              required={true}
              shadow={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Password"
              required={true}
              shadow={true}
            />
            <div className="mb-2 block">
              <Label htmlFor="password" value="Repeat password" />
            </div>
            <TextInput
              id="rpassword"
              type="password"
              placeholder="Password"
              required={true}
              shadow={true}
            />
          </div>
          {errorMessage && (
            <div>
              <div className="mb-2 block">
                <p className="text-red-500">Error: {errorMessage}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col mt-4">
            <div className="flex-col hidden dark:flex">
              <Button type="submit" color="light">
                Sign up
              </Button>
            </div>
            <div className="flex-col flex dark:hidden">
              <Button type="submit">Sign up</Button>
            </div>
          </div>
          <a
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign in
          </a>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

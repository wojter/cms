import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = ({ errorMessage, onSubmit }) => {
  return (
    <div className="flex sm:rounded-lg sm:border sm:border-gray-200 bg-white sm:shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-full sm:w-2/3 lg:w-1/3">
      <div className="flex h-full flex-col justify-center gap-4 p-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div>
            <div className="mb-2 block">
              <p className="text-2xl text-gray-900 dark:text-white">
                Admin Login Form
              </p>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
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
                Sign In
              </Button>
            </div>
            <div className="flex-col flex dark:hidden">
              <Button type="submit">Sign In</Button>
            </div>
          </div>
          <Link href="/test">
            <a className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Visit front page
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

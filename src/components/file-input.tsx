import { getInstagramUsersFromFile } from "@/lib/extract-data-insta";
import {
  $instagramUsers,
  loadFollowersUsers,
  loadFollowingUsers,
  removeFollowersUsers,
  removeFollowingUsers,
} from "@/stores/instagram-users-store";
import { instagramFileNames } from "@/types/instagram-data.types";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone-esm";
import { FaPlusCircle } from "react-icons/fa";
import { FaFile, FaUpload } from "react-icons/fa6";
import { Button } from "./ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FileInput = () => {
  const { followers, following } = useStore($instagramUsers);

  const canViewStats = followers.length > 0 && following.length > 0;

  console.log(followers.length, following.length);

  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setFiles([...files, ...acceptedFiles]);

      acceptedFiles.forEach(async (file) => {
        const users = await getInstagramUsersFromFile(file);

        switch (file.name) {
          case "following.json":
            loadFollowingUsers(users);
            break;

          case "followers_1.json":
            loadFollowersUsers(users);
            break;
        }
      });
    },
    validator: (file) => {
      const fileExists = files.some((f) => f.name === file.name);
      if (fileExists) {
        return {
          code: "file_exists",
          message: `El archivo ${file.name} ya existe.`,
        };
      }
      return null;
    },

    accept: {
      "text/json": [".json"],
    },
  });

  const handleRemoveFile = (file: File) => {
    switch (file.name) {
      case "following.json":
        removeFollowingUsers();

        break;
      case "followers_1.json":
        removeFollowersUsers();

        break;
    }

    setFiles(files.filter((f) => f.name !== file.name));
  };

  return files.length > 0 ? (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Archivos subidos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center">
          {files.map((file, index) => (
            <li key={file.name}>
              <Button
                onClick={() => handleRemoveFile(file)}
                variant={"outline"}
                className="h-fit flex hover:bg-destructive items-center flex-wrap gap-2 border rounded-sm p-4"
              >
                <FaFile className="size-6" />
                <p key={index}>{file.name}</p>
              </Button>
            </li>
          ))}
          {!canViewStats && (
            <Button
              onClick={() => open()}
              variant="secondary"
              className="gap-2"
            >
              <span className="md:hidden">Subir más archivos</span>
              <FaPlusCircle className="size-4" />
            </Button>
          )}
        </ul>
      </CardContent>
      <input {...getInputProps()} />
    </Card>
  ) : (
    <div className="space-y-2 w-full">
      <div
        {...getRootProps({})}
        className="relative w-full h-96  text-primary flex justify-center items-center border-2 rounded-lg border-dashed transition-colors duration-300 hover:bg-primary/5  cursor-pointer ease-in-out "
      >
        <input {...getInputProps()} />{" "}
        <div className="flex flex-col items-center gap-4">
          <FaUpload className="size-16 " />
          <p className=" font-light">
            Arrastra tus archivos o haz click para subirlos
          </p>
        </div>
      </div>
      <small className="text-sm text-gray-400">
        Los archivos necesarios son estos {instagramFileNames.join(", ")}
      </small>
    </div>
  );
};
export default FileInput;

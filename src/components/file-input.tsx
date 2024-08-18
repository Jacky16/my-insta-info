import { getInstagramUsersFromFile } from "@/lib/extract-data-insta";
import {
  loadFollowersUsers,
  loadFollowingUsers,
  removeFollowersUsers,
  removeFollowingUsers,
} from "@/stores/instagram-users-store";
import { useState } from "react";
import { useDropzone } from "react-dropzone-esm";
import { FaFileArrowUp, FaFileCircleCheck } from "react-icons/fa6";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Props {
  placeholder?: string;
  fileName: string;
}

const FileInput = ({ fileName, placeholder }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      acceptedFiles.forEach(async (file) => {
        const users = await getInstagramUsersFromFile(file);

        switch (file.name) {
          case "following.json":
            loadFollowingUsers(users);
            setFile(acceptedFiles[0]);

            break;

          case "followers_1.json":
            loadFollowersUsers(users);
            setFile(acceptedFiles[0]);

            break;
        }
      });
    },
    validator: (_file) => {
      const differentFileName = _file.name !== fileName;

      if (differentFileName) {
        return {
          code: "file_exists",
          message: ``,
        };
      }
      return null;
    },

    accept: {
      "text/json": [".json"],
    },
    noDrag: true,
    multiple: false,
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

    setFile(null);
  };

  return file ? (
    <Card className="size-full h-64 md:h-96 flex flex-col gap-2 justify-center items-center">
      <FaFileCircleCheck className="size-16 text-green-500 animate-in" />
      <p className="text-sm font-light">{file.name}</p>

      <Button onClick={() => handleRemoveFile(file)} variant="ghost">
        Eliminar archivo
      </Button>
      <input {...getInputProps()} />
    </Card>
  ) : (
    <div
      {...getRootProps({})}
      className="size-full relative  h-64 md:h-96  text-primary flex justify-center items-center border-2 rounded-lg border-dashed transition-colors duration-300 hover:bg-primary/5  cursor-pointer ease-in-out "
    >
      <input {...getInputProps()} />{" "}
      <div className="flex flex-col items-center gap-4">
        <FaFileArrowUp className="size-12 " />
        <p className=" font-light">{placeholder}</p>
      </div>
    </div>
  );
};
export default FileInput;

import { $instagramUsers } from "@/stores/instagram-users-store";
import { useStore } from "@nanostores/react";
import FileInput from "../file-input";
import { buttonVariants } from "../ui/button";

const DragAndDropSection = () => {
  const { followers, following } = useStore($instagramUsers);

  const canViewStats = followers.length > 0 && following.length > 0;
  return (
    <div className="w-full h-dvh flex flex-col gap-8 justify-center items-center ">
      <div className="hidden md:block absolute top-0 blur-3xl opacity-15 w-[800px] h-96 -translate-y-1/2 rounded-full bg-primary" />

      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl font-medium max-w-3xl text-center">
          Comparador de seguidores de Instagram
        </h1>

        <p className="text-lg font-extralight">
          Nunca fue tan fácil comparar seguidores
        </p>
      </div>
      <a
        href="/#tutorial-insta-data"
        className={buttonVariants({
          variant: "outline",
          className: "cursor-pointer",
        })}
      >
        Como obtener los archivos desde Instagram
      </a>

      <div className="w-full flex flex-col md:flex-row gap-4">
        <FileInput
          fileName="followers_1.json"
          placeholder="Sube el archivo followers_1.json"
        />
        <FileInput
          fileName="following.json"
          placeholder="Sube el archivo following.json"
        />
      </div>
    </div>
  );
};

export default DragAndDropSection;

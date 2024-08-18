import { FaBook } from "react-icons/fa6";
import FileInput from "../file-input";
import { buttonVariants } from "../ui/button";

const DragAndDropSection = () => {
  return (
    <div className="relative w-full flex flex-col gap-8 justify-center items-center ">
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-4xl  font-medium max-w-3xl text-center leading-[3rem] text-pretty  ">
          Comparador de Seguidores de Instagram: Descubre Quién Te Sigue y{" "}
          <span className=" font-semibold">Quién No</span>
        </h1>

        <p className=" font-extralight">
          Comparar seguidores nunca fue tan fácil.{" "}
          <strong>
            Analiza quién te ha dejado de seguir en solo unos pasos.
          </strong>
        </p>
      </div>
      <a
        href="/tutorial"
        className={buttonVariants({
          variant: "outline",
          className: "cursor-pointer flex items-center gap-2",
        })}
      >
        Como descargar los datos de Instagram
        <FaBook />
      </a>

      <div className="w-full h-96  flex flex-col md:flex-row gap-4">
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

import FiveStepImage from "../../src/assets/tutorial-instagram-data/step-five.webp";
import FourthStepImage from "../../src/assets/tutorial-instagram-data/step-four.webp";
import FirstStepImage from "../../src/assets/tutorial-instagram-data/step-one.webp";
import SevenStepImage from "../../src/assets/tutorial-instagram-data/step-seven.webp";
import SixStepImage from "../../src/assets/tutorial-instagram-data/step-six.webp";
import ThirdStepImage from "../../src/assets/tutorial-instagram-data/step-three.webp";
import SecondStepImage from "../../src/assets/tutorial-instagram-data/step-two.webp";

const stepsDataInstagram = [
  {
    title: "Ir a configuración de tu cuenta",
    Image: FirstStepImage.src,
  },
  {
    title: "Sección Descargar tu información",
    Image: SecondStepImage.src,
  },
  {
    title: "Ir a Descargar o transferir información ",
    Image: ThirdStepImage.src,
  },

  {
    title: "Seleccionamos nuestra cuenta de Instagram",
    Image: FourthStepImage.src,
  },

  {
    title: "Seleccionamos Parte de nuestra información",
    Image: FiveStepImage.src,
  },

  {
    title: "Elegir la información que deseas descargar",
    description:
      "Como mínimo hay que seleccionar la opción Seguidores y Seguidos",
    Image: SixStepImage.src,
  },

  {
    title: "Descargar la información en formato JSON",
    description:
      "Si no los descargamos en formato JSON no podremos cargar los datos",
    Image: SevenStepImage.src,
  },
];

export default stepsDataInstagram;

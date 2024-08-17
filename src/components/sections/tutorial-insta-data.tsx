import stepsDataInstagram from "@/data/steps-data-instagram";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";

const TutorialInstaData = () => {
  const [apiSteps, setApiSteps] = useState<CarouselApi>();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!apiSteps) {
      return;
    }

    setCurrentStep(apiSteps.selectedScrollSnap() + 1);

    apiSteps.on("select", () => {
      setCurrentStep(apiSteps.selectedScrollSnap() + 1);
    });
  }, [apiSteps]);

  return (
    <section
      id="tutorial-insta-data"
      className="relative min-h-dvh bg-foreground text-secondary py-16 space-y-12 overflow-hidden  "
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-center">
        Como obtener tus estadísticas desde Instagram
      </h2>

      <div className="absolute size-96 right-0 bottom-0 translate-x-1/2 bg-white/10 rounded-full blur-2xl "></div>
      <div className="absolute size-60 left-0 bottom-0 translate-x-1/2 bg-white/10 rounded-full blur-2xl "></div>

      <div className="absolute size-36 left-96 top-16 translate-x-1/2 bg-white/10 rounded-full blur-2xl "></div>

      <div className=" flex flex-col md:flex-row gap-6  items-center justify-center  max-w-6xl mx-auto overflow-hidden ">
        <div className="flex-col gap-4 hidden md:flex">
          {stepsDataInstagram.map((step, index) => (
            <Button
              key={step.title}
              size="lg"
              className="h-fit flex-col p-4  text-start justify-start items-start w-full "
              onClick={() => apiSteps?.scrollTo(index)}
              variant={currentStep === index + 1 ? "secondary" : "ghost"}
            >
              <div className="flex justify-start gap-2 ">
                <span className="mx-2">{index + 1}</span>
                <div className="flex flex-col ">
                  <span className="font-bold text-base">{step.title}</span>
                  {step.description && index + 1 === currentStep && (
                    <p className="text-sm font-normal text-wrap">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>

        {stepsDataInstagram.map(
          (step, index) =>
            currentStep === index + 1 && (
              <Button
                key={index}
                size="lg"
                className="h-fit text-start p-4  justify-start md:hidden "
                onClick={() => apiSteps?.scrollTo(index)}
                variant={"secondary"}
              >
                <span className="mx-2">{index + 1}</span>
                <span className="font-bold">{step.title}</span>
                {step.description && index + 1 === currentStep && (
                  <p className="text-sm font-normal">{step.description}</p>
                )}
              </Button>
            ),
        )}

        <Carousel
          setApi={setApiSteps}
          opts={{
            align: "center",
          }}
        >
          <CarouselContent>
            {stepsDataInstagram.map((step) => (
              <CarouselItem
                key={step.description}
                className="basis-full flex justify-center "
              >
                <img
                  src={step.Image}
                  height={600}
                  alt={step.title}
                  className="rounded-lg h-[600px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TutorialInstaData;

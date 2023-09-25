import React from "react";
import Image from "next/image";

interface Props {}

const Hero = (props: Props) => {
  return (
    <section className="px-32 py-24">
      <div className="relative  ">
        <Image src="/final.svg" alt="svg" height={440} width={100} />
        <p className="absolute left-[65px] top-[50%]">
          Project Ask Your Document
        </p>
      </div>
      <h1 className="text-5xl font-bold text-left pt-3 pl-[35px]">
        Revolutionize the way you interact with your documents and uncover
        hidden insights.
      </h1>
    </section>
  );
};

export default Hero;

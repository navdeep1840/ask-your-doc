import React from "react";
import Image from "next/image";
import Header from "./Header";

type Props = {};

const SummaryAndStats = (props: Props) => {
  return (
    <section className="">
      <Header />
      <div className="px-12 py-12 ">
        <div className="relative ">
          <Image src="/final.svg" alt="svg" height={440} width={100} />
          <p className="absolute left-[65px] top-[50%] text-2xl">
            Summary of the pdf
          </p>
        </div>
        <div className="m-4 p-4  bg-[rgb(30,140,251)] backdrop-blur-lg bg-opacity-60   w-full   border-none outline-none rounded-lg text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          distinctio a repellendus praesentium, libero nesciunt optio totam
          culpa, eos, quos unde obcaecati adipisci deserunt dolore inventore
          quasi maxime at hic. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Porro distinctio a repellendus praesentium, libero
          nesciunt optio totam culpa, eos, quos unde obcaecati adipisci deserunt
          dolore inventore quasi maxime at hic.
        </div>
      </div>
    </section>
  );
};

export default SummaryAndStats;

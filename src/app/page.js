import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className=" text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
            aut porro sequi saepe ullam odio veritatis, repudiandae iusto quos
            fuga vel, consequatur iste optio rem delectus tenetur veniam
            voluptates voluptatem.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
            nemo nostrum, in neque et eaque magni perspiciatis praesentium
            suscipit nulla minima, tempora perferendis consectetur, recusandae
            aperiam similique ratione sed voluptatibus!
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+46 1111 11 11"
          >
            +46 1111 11 11
          </a>
        </div>
      </section>
    </>
  );
}

import { Button } from "@/components/ui/button";



const HeroSection = () => {
  return (
    <section className="py-20 px-6  h-[700px] flex flex-col gap-10 items-center justify-center text-center ">
      <h1 className="relative text-4xl md:text-6xl font-bold after:content-[''] after:w-[auto] after:h-[300px] after:-z-10 after:absolute after:left-24 after:top-10 after:bg-slate-300 after:blur-[90px] after:rounded-full">
        Your Gateway to Knowledge,<br />
        Connections, and Growth
      </h1>

      <p className="text-gray-600 max-w-2xl mx-auto  after:content-[''] after:w-[300px] after:h-[auto] after:-z-10 after:absolute after:right-36 after:top-20 after:bg-purple-200 after:blur-[90px] after:rounded-full">
        Connect, learn, and grow with our platform designed for professional development
      </p>
      <Button className="bg-black text-white px-8 py-6 w-fit">
        Get Started Now
      </Button>

    </section>
  );
};

export default HeroSection
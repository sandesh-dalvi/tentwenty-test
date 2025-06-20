import BannerSlider from "./components/BannerSlider";
import Navbar from "./components/Navbar";

import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/banner2.jpg";
import banner3 from "./assets/banner3.jpg";
import banner4 from "./assets/banner7.jpg";
import ImageCardSlider from "./components/ImageCardSlider";

const IMAGES = [banner1, banner2, banner3, banner4];

function App() {
  return (
    <main className="md:p-10 overflow-x-hidden ">
      <Navbar />
      <section className=" h-[calc(100vh-80px)] z-[-2]">
        <BannerSlider images={IMAGES} />
      </section>
      <section className=" w-full pt-8 md:pt-12 text-center flex flex-col justify-center items-center gap-2 md:gap-4  animate-fade-in-up">
        <h2 className=" text-3xl md:text-5xl lg:text-6xl font-semibold mb-2 md:mb-4">
          Quality Products
        </h2>
        <p className=" text-[#7A7777] text-base max-w-sm lg:max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis beatae
          sapiente ipsum corporis similique culpa reprehenderit neque
          repellendus veniam debitis accusantium possimus, fugiat totam. Fugit
          ratione ab sunt, in voluptates similique, doloribus sequi fugiat
          asperiores soluta illum consequatur. Laborum, cumque.
        </p>
      </section>

      {/* card Slider */}
      <section className=" h-screen w-full">
        <ImageCardSlider />
      </section>
    </main>
  );
}

export default App;

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {Autoplay,Navigation,Pagination} from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
function HomeSectionFour() {
    return (
        <>
            <section className="w-full h-auto bg-[#ffffff] flex flex-col lg:flex-row items-center justify-end lg:gap-[18vw] px-[4vw] py-[4vw] lg:px-[4vw]">
                <h1 className="lg:text-6xl text-[10vw] text-[#0B0E14] font-bold">Promotions</h1>
                <Swiper spaceBetween={30} autoplay={{delay:3000}} loop={true} slidesPerView={1} modules={[Autoplay,Navigation,Pagination]} className="">
                    <SwiperSlide>
                        <div className="w-[90vw] h-auto lg:w-[40vw] ml-[10vw] lg:ml-0  bg-[#0B0E14] flex rounded-[1.6vw] overflow-hidden border-2 border-[#0B0E14]">
                            <div className="w-1/2 p-6 flex flex-col gap-1">
                                <h1 className="text-[4vw] lg:text-[1.3vw] text-white">Vic Firth AJ6 - American Jazz</h1>
                                <p className="lg:text-[.8vw] text-[2vw] flex grow text-white">Vic Firth - American Jazz AJ6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim non itaque explicabo unde, temporibus tempora, accusamus praesentium recusandae esse dolorem provident labore vero in sapiente adipisci voluptatibus et, placeat quod?</p>
                                <p className="text-white text-[2vw] lg:text-[1vw]">plus de 2 paires <span className="text-2xl text-[#2dfd2d]"> -50%</span></p>
                                <div className="flex gap-1">
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                </div>
                                <button className="text-[3.4vw] lg:text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                            </div>
                            <img src="../src/assets/images/2000-X-2000-JPG-AJ6_Vic_Firth_American_Jazz-1.jpg" alt="" className="w-1/2 lg:w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-[90vw] h-auto lg:w-[40vw] ml-[10vw] lg:ml-0  bg-[#0B0E14] flex rounded-[1.6vw] overflow-hidden border-2 border-[#0B0E14]">
                            <div className="w-1/2 p-6 flex flex-col gap-1">
                                <h1 className="text-[4vw] lg:text-[1.3vw] text-white">Aquarian-performance Pack</h1>
                                <p className="text-[2vw] lg:text-[.8vw] flex grow text-white">Aquarian-performance Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim non itaque explicabo unde, temporibus tempora, accusamus praesentium recusandae esse dolorem provident labore vero in sapiente adipisci voluptatibus et, placeat quod?</p>
                                <p className="text-white text-[2vw] lg:text-[1vw]">plus de 1 pack <span className="text-2xl text-[#2dfd2d]"> -50%</span></p>
                                <div className="flex gap-1">
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                </div>
                                <button className="text-[3.4vw] lg:text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                            </div>
                            <img src="../src/assets/images/aquarian-performance-2-pf-c-510x510.jpg" alt="" className="w-1/2 lg:w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-[90vw] h-auto lg:w-[40vw] ml-[10vw] lg:ml-0  bg-[#0B0E14] flex rounded-[1.6vw] overflow-hidden border-2 border-[#0B0E14]">
                            <div className="w-1/2 p-6 flex flex-col gap-1">
                                <h1 className="text-[4vw] lg:text-[1.3vw] text-white">Meinl Byzance Pack</h1>
                                <p className="text-[2vw] lg:text-[.8vw] flex grow text-white">Meinl Byzance pack Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim non itaque explicabo unde, temporibus tempora, accusamus praesentium recusandae esse dolorem provident labore vero in sapiente adipisci voluptatibus et, placeat quod?</p>
                                <p className="text-white text-[2vw] lg:text-[1vw]">plus de 1 pack <span className="text-2xl text-[#2dfd2d]"> -50%</span></p>
                                <div className="flex gap-1">
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                    <Star className="Star w-[2vw] lg:w-[1.2vw]" />
                                </div>
                                <button className="text-[3.4vw] lg:text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                            </div>
                            <img src="../src/assets/images/Meinl_Byzance_Mike_Johnston_Cymbal_Set_MJ401_18.jpg" alt="" className="w-1/2 lg:w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                        </div>
                    </SwiperSlide>
                </Swiper>

            </section>
        </>
    )
}

export default HomeSectionFour;
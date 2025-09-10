"use client";
import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Image from "next/image";
import { PenLine, MessageCircle, HelpCircle, Heart, CircleIcon as CircleLetterA } from 'lucide-react';
import TeamSection from "@/components/card-component/card/MemberComponent";
import AnimatedBackground from '@/components/card-component/card/AnimatedBackground'


export default function about() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden ">
      <div className="relative z-10">

        <main className="overflow-hidden relative z-10">
          {/* Hero Section */}
          
          <section className=" mt-40">
          <AnimatedBackground />
            {/* Main Content */}
            <div className=" grid grid-cols-2 gap-12 items-center  ">
              {/* Text Section */}
              <div className="space-y-8" data-aos="fade-right">
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl ml-28 font-extrabold text-secondary">
                    អំពី​​​ CodeAdvisors
                  </h1>
                </div>
                <p className="text-lg ml-28  text-gray-700">
                  CodeAdvisors ផ្តល់ជូនពិតជាមួយនឹង Developers
                  តាមរយៈការរៀបចាក់ការជំនាញ វិជ្ជាជីវៈថ្មីៗ
                  និងបង្កើតនូវការទំនាក់ទំនងល្អៗជាមួយគ្នាបន្ថែមទៀត។
                </p>
              </div>

              {/* Image Section */}
              <div
                className="relative h-[300px] md:h-[400px] lg:h-[450px] mr-20 "
                data-aos="fade-left"
              >
                <Image
                  src="/about-us/1.png"
                  alt="Programming Education Illustration"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </section>
          

          {/* Features Section */}
          <section className="py-10 mt-[100px]  bg-white border border-gray-100">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-3 ">
                {/* Goal Feature */}
                <div className="text-center mx-28  space-y-4" data-aos="fade-up">
                  <div className="flex justify-center">
                    <Image
                      src="/about-us/vision.png"
                      alt="Code Advisors Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <h3 className="text-[24px]  font-semibold text-primary">
                    បេសកម្ម
                  </h3>
                  <p className="text-gray-600 flex justify-center text-[18px]">
                    ផ្តល់វិធីសាស្រ្តក្នុងការចែករំលែក ចំណេះដឹង ការដោះស្រាយបញ្ហា
                    និងអភិវឌ្ឍន៍ចំណេះដឹង។
                  </p>
                </div>

                {/* Meaning Feature */}
                <div className="text-center mx-28 space-y-4" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex justify-center">
                    <Image
                      src="/about-us/vision.png"
                      alt="Code Advisors Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <h3 className="text-[24px] font-semibold text-primary">
                    ចក្ខុវិស័យ
                  </h3>
                  <p className="text-gray-600 flex justify-center text-[18px]">
                    ផ្តល់ឱកាសឲ្យ Developers សិក្សាស្វែងយល់ សហការណ៍
                    និងបង្កើនការច្នៃប្រឌិត។
                  </p>
                </div>

                {/* Quality Feature */}
                <div className="text-center mx-28 space-y-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex justify-center">
                    <Image
                      src="/about-us/vision.png"
                      alt="Code Advisors Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <h3 className="text-[24px] font-semibold text-primary">
                    គុណតម្លៃ
                  </h3>
                  <p className="text-gray-600 flex justify-center text-[18px]">
                    ការសហការណ៍ ការដោះស្រាយបញ្ហា
                    ការចែករំលែកចំណេះដឹង​និងបង្កើនការអភិវឌ្ឍន៍។
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="container  bg-white mt-20 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
              <div
                className="h-[300px] md:h-[350px] lg:h-[400px]"
                data-aos="fade-right"
              >
                <Image
                  src="/about-us/4.png"
                  alt="Planning Illustration"
                  fill
                  className="object-contain"
                />
              </div>
              <div className=" mr-56" data-aos="fade-left">
                <h2 className="text-3xl font-bold text-red-600">តើពួកយើងជានរណា?</h2>
                <p className="text-lg mt-2 text-gray-600">
                  CodeAdvisors គឺជាវេទិកាមួយដែលត្រូវបានអភិវឌ្ឍឡើងដោយនិស្សិត Spring
                  Microservices នៅ ISTAD។ វេបសាយមួយនេះជួយ Developers ក្នុងការ
                  សិក្សាស្វែងយល់ ចែករំលែកចំណេះដឹង និងសហការណ៍គ្នា តាមរយៈវេទិកាសន្ទនា
                  ក៏ដូចជាការចែករំលែកមាតិកា។
                </p>
              </div>
            </div>
          </section>

          {/* Learning Path Section */}
          <section className="text-white mt-20 border border-gray-100  bg-white">
            <div className="">
              <h2 className="text-center text-3xl font-bold text-secondary py-7">
                ការផ្តល់ពិន្ទុទៅតាមកម្រិត
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 mx-52 items-center mb-10">
                <div className="space-y-6">
                  {[
                    {
                      icon: <PenLine className="w-6 h-6" />,
                      title: "យកចិត្តទុក",
                      text: "ទទួលបាន ១៥ពិន្ទុសម្រាប់ការស្រាវជ្រាវស៊ីជម្រៅ",
                    },
                    {
                      icon: <MessageCircle className="w-6 h-6" />,
                      title: "ផ្តល់មតិ",
                      text: "ទទួលបាន ២០ពិន្ទុសម្រាប់ការស្រាវជ្រាវល្អ",
                    },
                    {
                      icon: <HelpCircle className="w-6 h-6" />,
                      title: "ចោទសួរ",
                      text: "ទទួលបាន ១០ពិន្ទុសម្រាប់ការស្រាវជ្រាវ",
                    },
                    {
                      icon: <Heart className="w-6 h-6" />,
                      title: "ផ្តល់គុណ",
                      text: "ទទួលបាន ២០ពិន្ទុសម្រាប់ការស្រាវជ្រាវចប់",
                    },
                    {
                      icon: <CircleLetterA className="w-6 h-6" />,
                      title: "ផ្តើមសំខាន់",
                      text: "ទទួលបាន ២៥ពិន្ទុសម្រាប់ការស្រាវជ្រាវស៊ីជម្រៅ",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4" data-aos="fade-up" data-aos-delay={index * 100}>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center border border-secondary">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {item.title}
                        </h3>
                        <p className="text-black">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="relative h-[300px] md:h-[350px] lg:h-[400px] mb-10"
                  data-aos="fade-left"
                >
                  <Image
                    src="/about-us/3.png"
                    alt="Learning Path Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
           {/* Team Section */}
           <TeamSection />

          {/* About Section */}
          <div className='mb-10 '>
          <section className="mx-36 rounded-sm  bg-white mt-10">
            <div className="grid md:grid-cols-2 gap-5 items-center">
              <div 
                className="relative w-[400px] h-[400px] ml-40"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <Image
                  src="/about-us/6.png"
                  alt="Planning Illustration"
                  fill
                  className="object-cover rounded-lg "
                />
              </div>
              <div 
                className="space-y-8"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <h2 className="text-4xl font-extrabold text-secondary" data-aos="fade-up" data-aos-delay="300">
                  ទំនាក់ទំនង
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
                  CodeAdvisors ទទួលនូវរាល់មតិទាំងឡាយពីអ្នកប្រើប្រាស់
                  ជាទីស្រលាញ់​របស់ពួកយើង
                </p>
                <ul className="space-y-6 text-gray-700 text-lg">
                  <li data-aos="fade-up" data-aos-delay="500" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">អុីម៉ែល:</span> istad.tk@edu.kh
                  </li>
                  <li data-aos="fade-up" data-aos-delay="600" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-semibold">លេខទូរស័ព្ទ:</span> +855 123 456 789
                  </li>
                  <li data-aos="fade-up" data-aos-delay="700" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold">ទីតាំង:</span> Near 23 Street 564, Phnom Penh
                  </li>
                </ul>
              </div>
            </div>
          </section>
       </div>

         
        </main>
      </div>
    </div>
  );
}


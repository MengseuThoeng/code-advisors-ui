'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Send, Facebook } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const leaders = [
  {
    name: "Chan Chhaya",
    image: "/about-us/cher chhaya.png",
    quote: "If you don't help yourself, teacher can't help you..!",
  },
  {
    name: "Sin Sreyphea",
    image: "/about-us/cher-phea.png",
    quote: "Your most unhappy customers are your greatest source of learning",
  },
]

const members = [
  {
    name: "Yith Sopheaktra",
    image: "/about-us/leader.png",
    quote: "This user is so lazy, they can't even be bothered to put quotes on a card.",
  },
  {
    name: "Eung Lyzhia",
    image: "/about-us/zhai.png",
    quote: "Everything is difficult until you know how to do it",
  },
  {
    name: "Thoeng Mengseu",
    image: "/about-us/sue.png",
    quote: "just a poor boy fight for his dream and wish to have a good future..",
  },
  {
    name: "Art Vandeth",
    image: "/about-us/det.png",
    quote: "This user is so lazy, they can't even be bothered to put quotes on a card.",
  },
  {
    name: "Chan Samangrathana",
    image: "/about-us/me.png",
    quote: "One day, all your hard work will pay off",
  },
  {
    name: "Pol sokkhann",
    image: "/about-us/khann.png",
    quote: "This user is so lazy, they can't even be bothered to put quotes on a card.",
  },
]

function MemberCard({ name, image, quote }: { name: string; image: string; quote: string }) {
  return (
    <div className="rounded-[50px] border-[5px] w-[270px] h-[390px] border-primary p-4 flex flex-col items-center bg-white" data-aos="fade-up" data-aos-duration="1000">
      <div className="relative w-[150px] h-[150px] mb-10">
        <div className="absolute inset-0 transform rotate-45 " />
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="relative rounded-xl object-cover w-[180px] h-[180px]"
        />
      </div>
      
      <h4 className="text-lg font-mono mb-2">
        {`{${name}}`}
      </h4>
      
      <p className="text-sm text-center text-primary mb-6">
        {quote}
      </p>

      <div className="flex gap-10 bg-primary text-white p-3 rounded-full">
        <Link href="#" className="hover:text-secondary transition-colors duration-300">
          <Github className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:text-blue-400 transition-colors duration-300">
          <Send className="w-[20px] h-[20px]" />
        </Link>
        <Link href="#" className="hover:text-blue-400 transition-colors duration-300">
          <Facebook className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

export default function TeamSection() {
  useEffect(() => {
    AOS.init({
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-red-600 text-center mb-12" data-aos="fade-down" data-aos-duration="1000">
        អ្នកដឹកនាំរបស់យើង
      </h2>
      
      {/* Leaders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-[700px] mx-auto mb-20">
        {leaders.map((leader, index) => (
          <div key={leader.name} data-aos="fade-up" data-aos-delay={index * 200}>
            <MemberCard {...leader} />
          </div>
        ))}
      </div>

      <h3 className="text-3xl font-bold text-red-600 text-center mb-20" data-aos="fade-down" data-aos-duration="1000">
        សមាជិករបស់ CodeAdvisors
      </h3>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {members.map((member, index) => (
          <div key={member.name} data-aos="fade-up" data-aos-delay={index * 100}>
            <MemberCard {...member} />
          </div>
        ))}
      </div>
    </section>
  )
}


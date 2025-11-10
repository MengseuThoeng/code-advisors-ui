"use client";
import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Image from "next/image";
import { PenLine, MessageCircle, HelpCircle, Heart, CircleIcon as CircleLetterA, Target, Eye, Award, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import TeamSection from "@/components/card-component/card/MemberComponent";
import { Card, CardContent } from "@/components/ui/card";


export default function About() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="overflow-hidden">
        {/* Hero Section - Modern Redesign */}
        <section className="relative pt-24 pb-16 px-4 md:px-8 lg:px-16">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Section */}
              <div className="space-y-6" data-aos="fade-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-700">Welcome to CodeAdvisors</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
                  About CodeAdvisors
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  CodeAdvisors empowers developers through skill development, 
                  professional growth, and building meaningful connections within the community.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">Active Community</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">Expert Support</span>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative" data-aos="fade-left">
                <div className="relative h-[350px] md:h-[450px] lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                  <Image
                    src="/about-us/1.png"
                    alt="Programming Education Illustration"
                    fill
                    className="object-contain relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
          

          {/* Features Section - Mission, Vision, Values */}
          <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Core Values
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our commitment to helping the developer community grow and thrive
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mission */}
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20" data-aos="fade-up">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Target className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Provide methods for sharing knowledge, problem-solving,
                      and continuous learning development.
                    </p>
                  </CardContent>
                </Card>

                {/* Vision */}
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-secondary/20" data-aos="fade-up" data-aos-delay="100">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Eye className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Provide opportunities for developers to learn, collaborate,
                      and foster innovation.
                    </p>
                  </CardContent>
                </Card>

                {/* Values */}
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-500/20" data-aos="fade-up" data-aos-delay="200">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Values</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Collaboration, problem-solving,
                      knowledge sharing, and continuous development.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* About Section - Who We Are */}
          <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1" data-aos="fade-right">
                  <div className="relative h-[400px] lg:h-[500px]">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                    <Image
                      src="/about-us/4.png"
                      alt="Planning Illustration"
                      fill
                      className="object-contain relative z-10"
                    />
                  </div>
                </div>

                <div className="space-y-6 order-1 lg:order-2" data-aos="fade-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full">
                    <Award className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-gray-700">About Us</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Who <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Are We?</span>
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    CodeAdvisors is a platform developed by Spring Microservices students at ISTAD. 
                    This website helps developers learn, share knowledge, and collaborate through 
                    discussion forums and content sharing.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">500+</div>
                        <div className="text-sm text-gray-600">Active Users</div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-secondary/20 hover:border-secondary transition-colors">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-secondary mb-1">1K+</div>
                        <div className="text-sm text-gray-600">Articles Shared</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Path Section - Points System */}
          <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Points & Rewards System
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Earn points through positive engagement and contributions
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-4" data-aos="fade-right">
                  {[
                    {
                      icon: <PenLine className="w-6 h-6" />,
                      title: "Write Articles",
                      text: "Earn 15 points for in-depth research articles",
                      gradient: "from-blue-500 to-blue-600",
                    },
                    {
                      icon: <MessageCircle className="w-6 h-6" />,
                      title: "Post Comments",
                      text: "Earn 20 points for quality research contributions",
                      gradient: "from-green-500 to-green-600",
                    },
                    {
                      icon: <HelpCircle className="w-6 h-6" />,
                      title: "Ask Questions",
                      text: "Earn 10 points for research questions",
                      gradient: "from-yellow-500 to-yellow-600",
                    },
                    {
                      icon: <Heart className="w-6 h-6" />,
                      title: "Give Likes",
                      text: "Earn 20 points for completed research appreciation",
                      gradient: "from-red-500 to-red-600",
                    },
                    {
                      icon: <CircleLetterA className="w-6 h-6" />,
                      title: "Provide Answers",
                      text: "Earn 25 points for comprehensive research answers",
                      gradient: "from-purple-500 to-purple-600",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-x-2" data-aos="fade-up" data-aos-delay={index * 100}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <div className="text-white">{item.icon}</div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">{item.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="relative" data-aos="fade-left">
                  <div className="relative h-[400px] lg:h-[550px]">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                    <Image
                      src="/about-us/3.png"
                      alt="Learning Path Illustration"
                      fill
                      className="object-contain relative z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
           {/* Team Section */}
           <TeamSection />

          {/* Contact Section */}
          <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1" data-aos="fade-right">
                  <div className="relative w-full h-[400px] lg:h-[500px]">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                    <Image
                      src="/about-us/6.png"
                      alt="Contact Illustration"
                      fill
                      className="object-contain relative z-10 rounded-2xl"
                    />
                  </div>
                </div>

                <div className="space-y-8 order-1 lg:order-2" data-aos="fade-left">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-gray-700">Get In Touch</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                      Contact Us
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      CodeAdvisors welcomes all feedback and inquiries from our valued users
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Email */}
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Mail className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <p className="text-lg font-semibold text-gray-900">istad.tk@edu.kh</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Phone */}
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-secondary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Phone className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                            <p className="text-lg font-semibold text-gray-900">+855 123 456 789</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Location */}
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-500/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <MapPin className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-1">Location</p>
                            <p className="text-lg font-semibold text-gray-900">Near 23 Street 564, Phnom Penh</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
    </div>
  );
}

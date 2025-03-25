"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import drone from "../public/Screenshot 2025-03-07 183451.png"
import farm1 from "../public/a-man-in-a-turban-stands-in-a-field-ai-generated-free-photo.jpg"
import farm2 from "../public/happy-indian-farmer-his-farm_510370-880.jpg"
import farm3 from "../public/portrait-smiling-indian-farmer-with-field-tractor-background_975284-5481.jpg"
import {
  Leaf,
  ChevronRight,
  DrillIcon as Drone,
  Tractor,
  Microscope,
  BarChart4,
  Menu,
  X,
  ArrowRight,
  Check,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function LandingPage() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Drone,
      title: "Drone Surveillance",
      description: "High-resolution aerial imaging for comprehensive monitoring of large plantations.",
    },
    {
      icon: Tractor,
      title: "Rover Technology",
      description: "Ground-level monitoring with sensors for detailed soil and plant health analysis.",
    },
    {
      icon: Microscope,
      title: "Disease Detection",
      description: "AI-powered early detection of areca nut diseases with 95% accuracy.",
    },
    {
      icon: BarChart4,
      title: "Data Analytics",
      description: "Comprehensive reports and insights to optimize your agricultural practices.",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Areca Nut Farmer",
      content:
        "AgroTech's disease detection system helped me identify koleroga disease early, saving over 70% of my plantation.",
      image: farm1,
    },
    {
      name: "Meena Patil",
      role: "Agricultural Cooperative Leader",
      content:
        "The drone and rover combination provides unprecedented insights into our areca nut plantations. Highly recommended!",
      image: farm2,
    },
    {
      name: "Dr. Suresh Gowda",
      role: "Agricultural Scientist",
      content:
        "The precision of AgroTech's disease prediction algorithms for areca nut is impressive. A game-changer for farmers.",
      image: farm3,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-green-700 dark:text-green-400">{t("app.name")}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400">
              Features
            </Link>
            <Link
              href="#disease-detection"
              className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400"
            >
              Disease Detection
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-orange-200 dark:border-orange-50">
                  {t("auth.login")}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  {t("auth.signup")}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                        <Leaf className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-lg text-green-700 dark:text-green-400">{t("app.name")}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="#features"
                      className="px-4 py-2 rounded-md hover:bg-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Features
                    </Link>
                    <Link
                      href="#disease-detection"
                      className="px-4 py-2 rounded-md hover:bg-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Disease Detection
                    </Link>
                    <Link
                      href="#testimonials"
                      className="px-4 py-2 rounded-md hover:bg-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Testimonials
                    </Link>
                    <Link
                      href="#pricing"
                      className="px-4 py-2 rounded-md hover:bg-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                  </nav>

                  <div className="mt-auto pt-6 border-t space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <LanguageSelector />
                      <ThemeToggle />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          {t("auth.login")}
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          {t("auth.signup")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-green-950 dark:to-green-900 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 dark:text-or-300 leading-tight">
                Advanced Areca Nut Disease Detection
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                Protect your areca nut plantation with our AI-powered disease detection technology using drones and
                rovers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#disease-detection">
                  <Button size="lg" variant="outline" className="border-green-200 dark:border-green-800">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Areca nut plantation with drone monitoring"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-medium">Drone & Rover Technology</h3>
                    <p className="text-sm opacity-90">Real-time monitoring and disease detection</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300 mb-4">
              Our Advanced Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive agricultural technology solutions for modern farming
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-xl text-green-700 dark:text-green-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Detection Section */}
      <section id="disease-detection" className="py-20 bg-green-50 dark:bg-green-950/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300 mb-6">
                Areca Nut Disease Detection
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our advanced AI algorithms can detect common areca nut diseases with over 95% accuracy, including:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300">Koleroga (Fruit Rot)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Early detection of this fungal disease that causes nuts to drop prematurely.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300">Yellow Leaf Disease</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Identification of phytoplasma infection causing yellowing of leaves.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300">Bud Rot</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Detection of Phytophthora infection affecting the crown of the palm.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300">Stem Bleeding</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Identification of reddish-brown liquid oozing from the trunk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/services">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <Tabs defaultValue="drone" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="drone">Drone Technology</TabsTrigger>
                  <TabsTrigger value="rover">Rover Technology</TabsTrigger>
                </TabsList>
                <TabsContent value="drone" className="mt-0">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={drone}
                      alt="Drone monitoring areca nut plantation"
                      className="w-full h-auto"
                    />
                    <div className="p-4 bg-white dark:bg-gray-900">
                      <h3 className="font-medium text-lg mb-2">Aerial Disease Detection</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our drones capture high-resolution multispectral images to identify disease patterns across your
                        entire plantation.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="rover" className="mt-0">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="/placeholder.svg?height=300&width=500"
                      alt="Rover analyzing areca nut plants"
                      className="w-full h-auto"
                    />
                    <div className="p-4 bg-white dark:bg-gray-900">
                      <h3 className="font-medium text-lg mb-2">Ground-Level Analysis</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our rovers perform detailed ground-level inspection with specialized sensors to detect early
                        signs of disease.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Hear from areca nut farmers who have transformed their plantations with our technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-green-100 dark:border-green-900">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-green-700 dark:text-green-300">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-green-50 dark:bg-green-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the plan that works best for your areca nut plantation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-green-100 dark:border-green-900">
              <CardHeader>
                <CardTitle className="text-xl text-green-700 dark:text-green-300">Rover And Drone Service</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  ₹15,000<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/Acre</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Disease detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Crop suggestion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Multi-cropping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Manure and pesticide optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Expert advice and support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Community access</span>
                  </li>
                </ul>

              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
              </CardFooter>
            </Card>

            <Card className="border-green-600 dark:border-green-600 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-green-700 dark:text-green-300">Rover And Drone Service</CardTitle>
                <div className="text-3xl font-bold mt-2">
                  ₹1,00,000/Acre<span className="text-sm font-normal text-gray-500 dark:text-gray-400"> /yearly</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Disease detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Crop suggestion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Multi-cropping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Manure and pesticide optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Expert advice and support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Community access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>includes yearly crop season optimised care</span>
                  </li>
                </ul>

              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
              </CardFooter>
            </Card>


          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 dark:bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Areca Nut Plantation?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of farmers who have increased their yields and reduced losses with our technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg text-green-700 dark:text-green-400">{t("app.name")}</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advanced agricultural technology for modern farming, specializing in areca nut disease detection.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Drone Monitoring
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Rover Technology
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Disease Detection
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Data Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 AgroTech. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


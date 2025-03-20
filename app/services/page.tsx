"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DrillIcon as Drone, Tractor, Combine, Microscope, AlertTriangle, Leaf } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ServicesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    land: "",
    location: "",
    cropType: "areca-nut",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBookService = (service: string) => {
    setSelectedService(service)
    setOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would submit to an API
    console.log("Booking service:", selectedService, formData)

    toast({
      title: "Service Booked",
      description: `Your ${selectedService} service has been booked successfully.`,
      duration: 5000,
    })

    setOpen(false)
    setFormData({
      name: "",
      phone: "",
      land: "",
      location: "",
      cropType: "areca-nut",
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const services = [
    {
      id: "rover",
      title: t("services.rover"),
      description:
        "Our rover service provides ground-level monitoring of your crops, soil analysis, and targeted treatments.",
      icon: Tractor,
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      features: [
        "Detailed soil health analysis",
        "Close-up plant inspection",
        "Precise disease detection",
        "Targeted treatment application",
        "Weekly monitoring reports",
      ],
    },
    {
      id: "drone",
      title: t("services.drone"),
      description:
        "Drone service offers aerial imaging, crop health assessment, and large area monitoring for efficient farm management.",
      icon: Drone,
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      features: [
        "High-resolution aerial imaging",
        "Multispectral analysis",
        "Large area coverage",
        "Early disease pattern detection",
        "Bi-weekly comprehensive reports",
      ],
    },
    {
      id: "both",
      title: t("services.both"),
      description:
        "Comprehensive solution combining both rover and drone services for complete farm monitoring and management.",
      icon: Combine,
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
      features: [
        "Complete aerial and ground monitoring",
        "Comprehensive data integration",
        "Advanced predictive analytics",
        "Priority support and consultation",
        "Weekly detailed reports and recommendations",
      ],
    },
  ]

  const arecanutDiseases = [
    {
      name: "Koleroga (Fruit Rot)",
      description:
        "A fungal disease causing nuts to drop prematurely, characterized by black spots on nuts and leaves.",
      symptoms: "Black spots on nuts, premature nut drop, rotting of nuts, black patches on leaves.",
      detection:
        "Our drones detect early color changes in the canopy, while rovers analyze fungal presence on lower nuts.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Yellow Leaf Disease",
      description: "A phytoplasma disease causing yellowing of leaves and severe yield reduction.",
      symptoms: "Progressive yellowing of leaves, stunted growth, reduced yield, eventual plant death.",
      detection:
        "Multispectral imaging from drones identifies spectral signatures of infected plants before visible symptoms appear.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Bud Rot",
      description: "A fungal disease affecting the crown of the palm, caused by Phytophthora species.",
      symptoms: "Yellowing of the spear leaf, rotting of the bud, wilting of young leaves, plant death.",
      detection:
        "Thermal imaging from drones detects temperature variations in the crown, while rovers analyze spore presence.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Stem Bleeding",
      description: "A fungal disease causing reddish-brown liquid to ooze from the trunk.",
      symptoms: "Reddish-brown liquid oozing from cracks in the trunk, decay of internal tissues.",
      detection: "Rovers with specialized sensors detect early fluid seepage and analyze trunk integrity.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="space-y-8 mt-5 mx-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-green-700 dark:text-green-300">{t("services.title")}</h1>
        <p className="text-muted-foreground">
          Advanced agricultural technology services with specialized areca nut disease detection
        </p>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="areca-nut">Areca Nut Disease Detection</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <motion.div className="grid gap-6 md:grid-cols-3" variants={container} initial="hidden" animate="show">
            {services.map((service) => (
              <motion.div key={service.id} variants={item}>
                <Card className="h-full flex flex-col border-green-100 dark:border-green-800 overflow-hidden">
                  <CardHeader className={`p-4 ${service.color}`}>
                    <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow pt-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <svg
                            className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleBookService(service.title)}
                    >
                      {t("services.book")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center text-green-700 dark:text-green-300">How Our Services Work</CardTitle>
              <CardDescription className="text-center">
                Our comprehensive approach to agricultural monitoring and disease detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <Drone className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">Data Collection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drones and rovers collect multispectral images and sensor data from your plantation
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <Microscope className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">AI Analysis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our AI algorithms analyze the data to identify disease patterns and crop health issues
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">Early Detection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Diseases are detected in early stages, often before visible symptoms appear
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">Treatment Plans</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You receive detailed reports with treatment recommendations and intervention plans
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areca-nut" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-300">Areca Nut Disease Detection</CardTitle>
              <CardDescription>
                Our specialized technology for early detection of common areca nut diseases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {arecanutDiseases.map((disease, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-3 gap-4 border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="md:col-span-1">
                      <img
                        src={disease.image || "/placeholder.svg"}
                        alt={disease.name}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <h3 className="text-lg font-medium text-green-700 dark:text-green-300">{disease.name}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{disease.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Symptoms</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{disease.symptoms}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-green-600 dark:text-green-400">How We Detect It</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{disease.detection}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-300">Our Detection Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Koleroga (Fruit Rot)</span>
                    <span className="text-sm text-green-600 dark:text-green-400">95% accuracy</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "95%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Yellow Leaf Disease</span>
                    <span className="text-sm text-green-600 dark:text-green-400">92% accuracy</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "92%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bud Rot</span>
                    <span className="text-sm text-green-600 dark:text-green-400">90% accuracy</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Stem Bleeding</span>
                    <span className="text-sm text-green-600 dark:text-green-400">88% accuracy</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700 dark:text-green-300">Pricing</CardTitle>
              <CardDescription>Our service pricing is based on land area and service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 px-4 font-medium">Service</th>
                      <th className="text-left py-3 px-4 font-medium">Area (acres)</th>
                      <th className="text-left py-3 px-4 font-medium">Monthly Price</th>
                      <th className="text-left py-3 px-4 font-medium">Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4">Rover Service</td>
                      <td className="py-3 px-4">Up to 5</td>
                      <td className="py-3 px-4">₹15,000</td>
                      <td className="py-3 px-4">Weekly monitoring, soil analysis, disease detection</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4">Drone Service</td>
                      <td className="py-3 px-4">Up to 10</td>
                      <td className="py-3 px-4">₹25,000</td>
                      <td className="py-3 px-4">Bi-weekly aerial monitoring, multispectral imaging</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4">Complete Package</td>
                      <td className="py-3 px-4">Up to 15</td>
                      <td className="py-3 px-4">₹35,000</td>
                      <td className="py-3 px-4">Weekly drone & rover monitoring, advanced analytics</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Custom Solution</td>
                      <td className="py-3 px-4">15+</td>
                      <td className="py-3 px-4">Contact us</td>
                      <td className="py-3 px-4">Tailored solutions for large plantations</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Special Offer</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Sign up for a 6-month contract and get the first month free! Contact us for more details.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-green-700 dark:text-green-300">
              {t("services.book")}: {selectedService}
            </DialogTitle>
            <DialogDescription>Fill in your details to book this service for your plantation</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("services.name")}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-green-200 dark:border-green-800"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">{t("services.phone")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-green-200 dark:border-green-800"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select value={formData.cropType} onValueChange={(value) => handleSelectChange("cropType", value)}>
                  <SelectTrigger className="border-green-200 dark:border-green-800">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="areca-nut">Areca Nut</SelectItem>
                    <SelectItem value="coconut">Coconut</SelectItem>
                    <SelectItem value="coffee">Coffee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="land">{t("services.land")}</Label>
                <Input
                  id="land"
                  name="land"
                  type="number"
                  value={formData.land}
                  onChange={handleInputChange}
                  className="border-green-200 dark:border-green-800"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">{t("services.location")}</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="border-green-200 dark:border-green-800"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                {t("services.submit")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}


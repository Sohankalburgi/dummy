"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Droplets, Sun, Thermometer } from "lucide-react"
import { motion } from "framer-motion"
import logo from "../../public/Krishi Bhoomi AI.png"
export default function CropSuggestionPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    cropType: "",
    landArea: "",
    location: "",
  })
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cropType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock data for demonstration
      const mockSuggestions = [
        {
          id: 1,
          name: "Tomato",
          variety: "Roma",
          waterNeeds: "Medium",
          sunlight: "Full sun",
          temperature: "65-85°F",
          soilType: "Well-drained, slightly acidic",
          growthPeriod: "70-80 days",
          icon: Leaf,
        },
        {
          id: 2,
          name: "Cucumber",
          variety: "Marketmore",
          waterNeeds: "High",
          sunlight: "Full sun",
          temperature: "70-90°F",
          soilType: "Rich, well-drained",
          growthPeriod: "50-70 days",
          icon: Droplets,
        },
        {
          id: 3,
          name: "Bell Pepper",
          variety: "California Wonder",
          waterNeeds: "Medium",
          sunlight: "Full sun",
          temperature: "70-85°F",
          soilType: "Loamy, well-drained",
          growthPeriod: "60-90 days",
          icon: Sun,
        },
      ]

      setSuggestions(mockSuggestions)
      setLoading(false)
    }, 1500)
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

  return (
    <div className="space-y-6 mt-10 mx-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-green-700 dark:text-green-300">{t("crop.title")}</h1>
        <p className="text-muted-foreground">
          Get AI-powered suggestions for optimal crops based on your land and location
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("crop.title")}</CardTitle>
            <CardDescription>Enter your details to get personalized crop suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">{t("crop.type")}</Label>
                <Select value={formData.cropType} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="pulses">Pulses</SelectItem>
                    <SelectItem value="oilseeds">Oilseeds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="landArea">{t("crop.land")}</Label>
                <Input
                  id="landArea"
                  name="landArea"
                  type="number"
                  value={formData.landArea}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t("crop.location")}</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                {loading ? "Processing..." : t("crop.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggestions</CardTitle>
            <CardDescription>Recommended crops based on your inputs</CardDescription>
          </CardHeader>
          <CardContent>
            {suggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
               <Image
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
                <p>Enter your details and submit to get crop suggestions</p>
              </div>
            ) : (
              <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
                {suggestions.map((crop) => (
                  <motion.div key={crop.id} variants={item}>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                            <crop.icon className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-medium">
                              {crop.name} ({crop.variety})
                            </h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <Droplets className="h-3 w-3" />
                                <span>{crop.waterNeeds}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Sun className="h-3 w-3" />
                                <span>{crop.sunlight}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-3 w-3" />
                                <span>{crop.temperature}</span>
                              </div>
                              <div className="flex items-center gap-1">
                              <Image
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
                                <span>{crop.growthPeriod}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">Soil: {crop.soilType}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


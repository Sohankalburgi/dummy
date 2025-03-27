"use client"

import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, MessageSquare, Leaf, Database } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import  image1 from "../../public/areca-tree-4754234_1280.jpg" 
import Image from "next/image"
export default function DashboardPage() {
  const { t } = useLanguage()
  const { user } = useAuth()

  const services = [
    {
      title: t("nav.services"),
      description: t("services.title"),
      icon: Settings,
      href: "/services",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: t("nav.chatbot"),
      description: t("chatbot.title"),
      icon: MessageSquare,
      href: "/chatbot",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: t("nav.crop"),
      description: t("crop.title"),
      icon: Leaf,
      href: "/crop-suggestion",
      color: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: t("nav.data"),
      description: t("dashboard.subtitle"),
      icon: Database,
      href: "/your-data",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ]

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
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-green-700 dark:text-green-300">
          {t("dashboard.welcome")}, {user?.fullName}
        </h1>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={item}>
            <Link href={service.href}>
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className={`p-4 ${service.color}`}>
                  <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                  <Button variant="link" className="mt-2 p-0 text-green-600 dark:text-green-400">
                    {t("services.book")} →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-700 dark:text-green-300">
            {t("app.name")} {t("dashboard.subtitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 h-full">
            <Image
              src={image1}
              alt="Agriculture technology"
              className="rounded-lg object-cover w-full h-72"
            />
            <div className="space-y-4">
              <p>
              Krishi Bhoomi AI provides modern solutions for agriculture, helping farmers optimize their crop yields and
                reduce costs through technology.
              </p>
              <p>
                Our services include drone and rover-based field monitoring, AI-powered crop suggestions, and real-time
                agricultural assistance.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">{t("services.book")}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { useState } from "react"

import CMSLoginPage from "./landing/CMSLoginPage"
import ExternalResourcesPage from "./landing/ExternalResourcesPage"
import GradeSelectorPage from "./landing/GradeSelectorPage"
import InfoPage from "./InfoPage"
import LandingHome from "./landing/LandingHome"
import type { CurrentPage, GradeId } from "./landing/types"

export default function ChemistryApp() {
  return <ChemistryAppContent />
}

function ChemistryAppContent() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("landing")
  const [isCmsAuthenticated, setIsCmsAuthenticated] = useState(false)

  if (currentPage === "info") {
    return <InfoPage onBack={() => setCurrentPage("landing")} onStart={() => setCurrentPage("grade-selector")} />
  }

  if (currentPage === "cms") {
    if (!isCmsAuthenticated) {
      return (
        <CMSLoginPage onBack={() => setCurrentPage("landing")} onSuccess={() => setIsCmsAuthenticated(true)} />
      )
    }
    return null
  }

  if (currentPage === "resources") {
    return <ExternalResourcesPage onBack={() => setCurrentPage("landing")} />
  }

  if (currentPage === "grade-selector") {
    return (
      <GradeSelectorPage
        onBack={() => setCurrentPage("landing")}
        onSelectGrade={(grade: GradeId) => setCurrentPage(grade)}
      />
    )
  }

  return (
    <LandingHome
      onStart={() => setCurrentPage("grade-selector")}
      onInfo={() => setCurrentPage("info")}
      onResources={() => setCurrentPage("resources")}
      onCms={() => setCurrentPage("cms")}
    />
  )
}
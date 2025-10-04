"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { useTheme } from "next-themes"

export interface UserSettings {
  name: string
  email: string
  currency: string
  timezone: string
  theme: "light" | "dark"
}

interface SettingsContextType {
  settings: UserSettings
  updateSettings: (partial: Partial<UserSettings>) => void
  resetSettings: () => void
}

const DEFAULT_SETTINGS: UserSettings = {
  name: "",
  email: "",
  currency: "INR",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  theme: "dark",
}

const STORAGE_KEY = "financial-tracker:user-settings"

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme()
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as UserSettings
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
        if (parsed.theme) setTheme(parsed.theme)
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // ignore
    }
  }, [settings])

  const updateSettings = useCallback(
    (partial: Partial<UserSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...partial }
        if (partial.theme) setTheme(partial.theme)
        return next
      })
    },
    [setTheme],
  )

  const resetSettings = useCallback(() => setSettings(DEFAULT_SETTINGS), [])

  const value = useMemo<SettingsContextType>(
    () => ({ settings, updateSettings, resetSettings }),
    [settings, updateSettings, resetSettings],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider")
  return ctx
}



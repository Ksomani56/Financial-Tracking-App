"use client"

import { useState } from "react"
import { useSettings } from "@/lib/settings-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const timezones = Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : [settings.timezone]

  const canSavePassword = password.length >= 8 && password === confirm

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 space-y-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-serif text-3xl font-bold text-foreground">Settings</h1>
        </div>
        <div className="bg-card/60 mt-2 rounded-xl border p-6 backdrop-blur">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={settings.email} onChange={(e) => updateSettings({ email: e.target.value })} />
            </div>

            <div className="grid gap-2">
              <Label>Currency</Label>
              <Select value={settings.currency} onValueChange={(v) => updateSettings({ currency: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "USD",
                    "EUR",
                    "GBP",
                    "INR",
                    "JPY",
                    "AUD",
                    "CAD",
                  ].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Timezone</Label>
              <Select value={settings.timezone} onValueChange={(v) => updateSettings({ timezone: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-muted-foreground text-sm">Toggle dark/light theme</p>
              </div>
              <Switch checked={settings.theme === "dark"} onCheckedChange={(v) => updateSettings({ theme: v ? "dark" : "light" })} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <Button disabled={!canSavePassword}>Update Password</Button>
              <Button variant="outline" onClick={resetSettings}>Reset</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}



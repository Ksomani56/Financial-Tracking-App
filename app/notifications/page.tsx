"use client"

import { useNotifications } from "@/lib/notifications-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function NotificationsPage() {
  const { notifications, markRead, remove, clear } = useNotifications()

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
                <BreadcrumbPage>Notifications</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl font-bold text-foreground">Notifications</h1>
            <Button variant="outline" onClick={clear} disabled={notifications.length === 0}>
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {notifications.length === 0 && (
            <div className="text-center text-muted-foreground">No notifications yet</div>
          )}

          {notifications.map((n) => (
            <Card key={n.id} className="bg-card/60 border backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">
                  <span className="mr-2">{n.title}</span>
                  {!n.read && <Badge variant="secondary">New</Badge>}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => markRead(n.id, !n.read)}>
                    {n.read ? "Mark Unread" : "Mark Read"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(n.id)}>
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">{n.message}</div>
                <div className="text-foreground/60 mt-2 text-xs">{new Date(n.createdAt).toLocaleString()}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}



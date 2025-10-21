"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Bot, CreditCard, Ghost, GhostIcon, LayoutDashboardIcon, Plus, Presentation} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot,
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
    }
]

const projects = [
    {
        title: "Project Alpha",
        icon: Bot,
    },
    {
        title: "Project Beta",
        icon: Bot,
    }
]

export function AppSidebar() {

    const pathname = usePathname();
    const {open} = useSidebar();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Image src={'/favicon.ico'}
                className="rounded-sm"
                alt="RepoMind Logo"
                width={40}
                height={40}
            />
            {open &&
                <h1 className="text-2xl font-bold">
                    Repomind
                </h1>
            }    
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn({
                        "!bg-primary !text-white": pathname === item.url,
                      })}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.title}>
                  <SidebarMenuButton asChild>
                    {/* <Link href={project.url} >
                                <project.icon />
                                <span>{project.title}</span>
                            </Link> */}
                    <div>
                      <div
                        className={cn(
                          "text-primary flex size-6 items-center justify-center rounded-sm border bg-white text-sm",
                          { "bg-primary text-white": true },
                        )}
                      >
                        {project.title.charAt(0)}
                      </div>
                      <span>{project.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
                {open &&
                    <SidebarMenuItem>
                        <Link href="/create">
                            <Button size="sm" className="mt-2 w-fit" variant={"outline"}>
                                <Plus/>
                                Create New Project
                            </Button>
                        </Link> 
                    </SidebarMenuItem>
                }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
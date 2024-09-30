import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Inbox, Send, Archive, Settings } from "lucide-react";

// Utility function to conditionally join classNames
const cn = (...classes) => classes.filter(Boolean).join(" ");

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Schedule Meets", href: "/create-meet", icon: Inbox },
  { name: "Chat", href: "/chat", icon: Send },
  { name: "Forum", href: "/forum", icon: Archive },
];

export default function AppLayout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const NavLinks = ({ onClick }) => (
    <nav className="space-y-2 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )}
          onClick={onClick}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 flex-col border-r lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center font-semibold">
            My App
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <NavLinks />
        </ScrollArea>
      </aside>

      {/* Mobile sidebar */}
      {/* <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="px-2 lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link to="/" className="flex items-center font-semibold" onClick={() => setOpen(false)}>
              My App
            </Link>
          </div>
          <ScrollArea className="flex-1">
            <NavLinks onClick={() => setOpen(false)} />
          </ScrollArea>
        </SheetContent>
      </Sheet> */}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="flex h-14 items-center border-b px-4 lg:hidden">
          <Button variant="ghost" size="icon" className="mr-2 px-2" onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <div className="font-semibold">My App</div>
        </div>
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  );
}
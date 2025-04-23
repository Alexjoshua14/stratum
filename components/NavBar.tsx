import { signOutAction } from "@/app/actions"
import { commissioner } from "@/app/fonts"
import HeaderAuth from "@/components/header-auth"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

import { createClient } from "@/utils/supabase/server";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "./ui/navigation-menu"
import { Sign } from "crypto"
import supabase from "@/lib/supabaseClient"
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useClerk, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

const SignedInView = async () => {
  const user = await currentUser()
  return (
    <div className="flex items-center gap-8">
      <ul className="flex items-center justify-center gap-6">
        <li>
          <Link href="/create" className="text-sm text-foreground/80 hover:text-foreground/100">
            Create Guide
          </Link>
        </li>
        <li>
          <Link href="/" className="text-sm text-foreground/80 hover:text-foreground/100">
            Dashboard
          </Link>
        </li>
      </ul>
      <UserButton />
      {/* <div className="flex items-center  gap-4 hover:scale-110 duration-500 ease-in-out">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <UserButton />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-2 flex flex-col gap-2">
                <NavigationMenuLink>
                  <div className="flex flex-col items-start border-b-2 pr-2 pb-2">
                    <p className="text-sm font-medium cursor-default">{user?.firstName}</p>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <SignOutButton />
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div> */}
    </div>
  )
}

const SignedOutView = () => {
  return (
    <div className="flex gap-2 ">
      <div className="hover:text-accent-foreground px-3 py-1 hover:bg-zinc-100/5 active:bg-zinc-50/5 rounded-lg transition-all duration-300">
        <SignInButton />
      </div>
      <div className="hover:text-accent-foreground px-3 py-1 hover:bg-zinc-100/5 active:bg-zinc-50/5 rounded-lg transition-all duration-300">
        <SignUpButton />
      </div>
    </div >
  )

}

export default async function NavBar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
        <div>
          <Link href="/">
            <h2 className={`font-medium text-lg ${commissioner.className} tracking-wider`}>
              Stratum
            </h2>
          </Link>
        </div>
        <div className="px-2">
          <SignedOut>
            <SignedOutView />
          </SignedOut>
          <SignedIn>
            <SignedInView />
          </SignedIn>
        </div>
      </div>
    </nav >
  )
}

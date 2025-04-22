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

const SignedInView = () => {
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
      <div className="flex items-center  gap-4 hover:scale-110 duration-500 ease-in-out">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <form action={signOutAction}>
                    <Button type="submit" variant={"outline"}>
                      Sign out
                    </Button>
                  </form>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

const SignedOutView = () => {
  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  )

}

export default async function NavBar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        {
          user ? (
            <SignedInView />
          ) : (
            <SignedOutView />
          )
        }


      </div>
    </nav >
  )
}

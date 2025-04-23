import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "./ui/navigation-menu";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUp } from "@clerk/nextjs";

export default async function AuthButton() {

  // TODO: Link to user profile
  return (
    <>
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton />
          <SignUp />
        </div>
      </SignedOut>
      <SignedIn>
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
                    <SignOutButton />
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </SignedIn >
    </>
  )
}

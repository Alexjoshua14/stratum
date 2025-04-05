import { commissioner } from "@/app/fonts"
import HeaderAuth from "@/components/header-auth"
import Link from "next/link"

export default function NavBar() {

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
        <div className="flex items-center gap-8">
          <ul className="flex items-center justify-center gap-6">
            <li>
              <Link href="/create" className="text-sm text-foreground/80 hover:text-foreground/100">
                Create Guide
              </Link>
            </li>
            <li>
              <Link href="/create" className="text-sm text-foreground/80 hover:text-foreground/100">
                Dashboard
              </Link>
            </li>
          </ul>
          <HeaderAuth />
        </div>
      </div>
    </nav>
  )
}

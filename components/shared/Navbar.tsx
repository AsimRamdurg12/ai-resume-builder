import { navLinks } from "@/lib/constants";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="border sticky">
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto p-4">
        <Link href="/" className="flex gap-2">
          Asim
          <Star />
        </Link>

        <div className="flex gap-4">
          {navLinks.map((link) => (
            <Link href={link.link} key={link.id}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="bg-pink-600 hover:bg-pink-700 rounded-full text-white font-semibold"
                >
                  {session.user.name?.slice(0, 1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Asim</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

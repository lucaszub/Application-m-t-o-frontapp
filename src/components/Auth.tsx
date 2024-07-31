"use client"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut, MenubarSeparator } from "@/components/ui/menubar"

export function Auth() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Authentification</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Sign in <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Sign up </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
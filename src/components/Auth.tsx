"use client"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut, MenubarSeparator } from "@/components/ui/menubar"
import * as React from "react"

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
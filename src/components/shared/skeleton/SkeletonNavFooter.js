import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'

export default function SkeletonNavFooter() {
  return (
      <SidebarMenu>
          <SidebarMenuItem>
              <div className="flex items-center p-3 w-full bg-[#F2F2F2] rounded-2xl animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                  <div className="flex flex-col items-start justify-start space-y-1">
                      <div className="w-20 h-4 bg-gray-300 rounded"></div>
                      <div className="w-32 h-3 bg-gray-300 rounded"></div>
                  </div>
              </div>
          </SidebarMenuItem>
      </SidebarMenu>
  )
}

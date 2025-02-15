import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/users/AppSidebar"; 

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {/* {children} */}
      </main>
    </SidebarProvider>
  );
}

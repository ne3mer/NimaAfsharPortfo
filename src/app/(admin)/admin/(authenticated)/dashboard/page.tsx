import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const workCount = await prisma.work.count();
  // Assuming we might have a leads table later, for now we'll mock or just use work count
  // const leadsCount = await prisma.lead.count(); 
  const leadsCount = 0; 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{workCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active portfolio items
            </p>
            <Link href="/admin/work" className="text-xs text-primary flex items-center mt-4 hover:underline">
              Manage Projects <ArrowUpRight className="h-3 w-3 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{leadsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Potential clients
            </p>
            <Link href="/admin/leads" className="text-xs text-blue-400 flex items-center mt-4 hover:underline">
              View Leads <ArrowUpRight className="h-3 w-3 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

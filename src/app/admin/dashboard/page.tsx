import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card"; // We need to create this or use a div
import { Users, DollarSign, Briefcase } from "lucide-react";

export default async function DashboardPage() {
  const totalLeads = await prisma.lead.count();
  const newLeads = await prisma.lead.count({ where: { status: "NEW" } });
  
  // Mock revenue calculation based on budget ranges
  // In a real app, this would be more complex
  const potentialRevenue = totalLeads * 5000; 

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          title="Total Leads" 
          value={totalLeads.toString()} 
          icon={Users} 
          trend="+12% from last month"
        />
        <StatCard 
          title="New Inquiries" 
          value={newLeads.toString()} 
          icon={Briefcase} 
          highlight 
        />
        <StatCard 
          title="Pipeline Value" 
          value={`$${potentialRevenue.toLocaleString()}`} 
          icon={DollarSign} 
        />
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">No recent activity to show.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, highlight }: any) {
  return (
    <div className={`p-6 rounded-2xl border ${highlight ? 'bg-primary/10 border-primary/20' : 'bg-card border-white/10'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground font-medium">{title}</span>
        <Icon className={`h-5 w-5 ${highlight ? 'text-primary' : 'text-white'}`} />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      {trend && <div className="text-xs text-green-400">{trend}</div>}
    </div>
  );
}

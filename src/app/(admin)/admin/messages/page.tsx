import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { format } from "date-fns";
import { Mail, MessageSquare } from "lucide-react";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Messages</h1>
        <div className="text-muted-foreground">
          Total: <span className="text-white font-bold">{messages.length}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card className="bg-card border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
              <p>No messages yet.</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className="bg-card border-white/10 overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">
                        {msg.firstName} {msg.lastName}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">{msg.email}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">
                    {format(msg.createdAt, "MMM d, yyyy • h:mm a")}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

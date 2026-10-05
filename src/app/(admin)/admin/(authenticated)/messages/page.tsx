import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { format } from "date-fns";
import { Mail, MessageSquare } from "lucide-react";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
          <p className="text-xs text-muted-foreground">
            Direct messages received through the public portfolio contact form
          </p>
        </div>
        <div className="self-start sm:self-auto rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground">
          Total: <span className="font-bold text-white">{messages.length}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card className="border-white/10 bg-card">
            <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <MessageSquare className="mb-4 h-12 w-12 opacity-20" />
              <p className="text-sm">No contact messages yet.</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className="overflow-hidden border-white/10 bg-card">
              <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="truncate text-base text-white">
                        {msg.firstName} {msg.lastName}
                      </CardTitle>
                      <a
                        href={`mailto:${msg.email}`}
                        className="truncate text-xs text-muted-foreground hover:text-white hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>
                  <div className="self-start sm:self-auto rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                    {format(new Date(msg.createdAt), "MMM d, yyyy • h:mm a")}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
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

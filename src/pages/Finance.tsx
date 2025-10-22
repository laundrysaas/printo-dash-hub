import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Finance() {
  const invoices = [
    {
      id: "INV-001",
      customer: "Fatima Al-Zahra",
      amount: "KD 45.500",
      status: "Paid",
      date: "2024-01-15",
      dueDate: "2024-01-30",
    },
    {
      id: "INV-002",
      customer: "Omar Hassan",
      amount: "KD 32.750",
      status: "Pending",
      date: "2024-01-14",
      dueDate: "2024-01-29",
    },
    {
      id: "INV-003",
      customer: "Noura Al-Sabah",
      amount: "KD 67.250",
      status: "Overdue",
      date: "2024-01-10",
      dueDate: "2024-01-25",
    },
    {
      id: "INV-004",
      customer: "Hasan Al-Rashid",
      amount: "KD 28.500",
      status: "Paid",
      date: "2024-01-12",
      dueDate: "2024-01-27",
    },
    {
      id: "INV-005",
      customer: "Reem Al-Mutawa",
      amount: "KD 54.000",
      status: "Pending",
      date: "2024-01-13",
      dueDate: "2024-01-28",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Pending</Badge>;
      case "Overdue":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Finance</h1>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Payment records and transaction history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Refund requests and processing will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

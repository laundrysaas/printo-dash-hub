import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Search, Plus, Target, Tag, Mail, CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  usedCoupons: number;
  description?: string;
  couponCode?: string;
  discountValue?: string;
}

export default function Marketing() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "CAMP-001",
      name: "Summer Discount Campaign",
      type: "Promotional",
      status: "Active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      usedCoupons: 245,
    },
    {
      id: "CAMP-002",
      name: "New Customer Welcome",
      type: "Onboarding",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      usedCoupons: 128,
    },
    {
      id: "CAMP-003",
      name: "Weekend Special Offer",
      type: "Promotional",
      status: "Scheduled",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      usedCoupons: 0,
    },
    {
      id: "CAMP-004",
      name: "Loyalty Rewards Program",
      type: "Retention",
      status: "Draft",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      usedCoupons: 0,
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [addCampaignOpen, setAddCampaignOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Promotional",
    status: "Draft",
    description: "",
    couponCode: "",
    discountValue: "",
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const filteredCampaigns = campaigns.filter(campaign => {
    if (statusFilter === "all") return true;
    return campaign.status === statusFilter;
  });

  const handleAddCampaign = () => {
    if (!newCampaign.name) {
      toast.error("Please enter a campaign name");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    
    const campaign: Campaign = {
      id: `CAMP-${String(campaigns.length + 1).padStart(3, '0')}`,
      name: newCampaign.name,
      type: newCampaign.type,
      status: newCampaign.status,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      usedCoupons: 0,
      description: newCampaign.description,
      couponCode: newCampaign.couponCode,
      discountValue: newCampaign.discountValue,
    };
    
    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({
      name: "",
      type: "Promotional",
      status: "Draft",
      description: "",
      couponCode: "",
      discountValue: "",
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setAddCampaignOpen(false);
    toast.success("Campaign created successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Active</Badge>;
      case "Expired":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">Expired</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">Scheduled</Badge>;
      case "Draft":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketing</h1>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns" className="gap-2">
            <Target className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="merchandising" className="gap-2">
            <Mail className="h-4 w-4" />
            Newsletters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Search and Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => setAddCampaignOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </div>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Used Coupons</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-xs text-muted-foreground">{campaign.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.type}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell className="text-sm">
                        <div className="space-y-0.5">
                          <div><span className="text-muted-foreground">From:</span> {campaign.startDate}</div>
                          <div><span className="text-muted-foreground">Until:</span> {campaign.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{campaign.usedCoupons.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Coupons Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Coupons
                  </CardTitle>
                  <CardDescription>Discount codes and vouchers</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Coupon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold font-mono text-lg">PRINT20</h4>
                    <p className="text-sm text-muted-foreground">Used 45 times</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold font-mono text-lg">WELCOME15</h4>
                    <p className="text-sm text-muted-foreground">Used 128 times</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="merchandising" className="space-y-6">
          {/* Newsletter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Newsletter
                  </CardTitle>
                  <CardDescription>Email subscription management</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  Settings
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="text-3xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Subscribers</div>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="text-3xl font-bold">+48</div>
                    <div className="text-sm text-muted-foreground mt-1">This Week</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Export Subscriber List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Campaign Dialog */}
      <Dialog open={addCampaignOpen} onOpenChange={setAddCampaignOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>Set up a new marketing campaign with discount codes and scheduling</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Campaign Name */}
            <div className="space-y-2">
              <Label>Campaign Name *</Label>
              <Input 
                placeholder="e.g., Summer Sale 2024"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
            </div>

            {/* Type and Status */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select 
                  value={newCampaign.type} 
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Promotional">Promotional</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Retention">Retention</SelectItem>
                    <SelectItem value="Seasonal">Seasonal</SelectItem>
                    <SelectItem value="Flash Sale">Flash Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={newCampaign.status} 
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Duration */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Coupon Details */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Coupon Details
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Coupon Code</Label>
                  <Input 
                    placeholder="e.g., SUMMER20"
                    value={newCampaign.couponCode}
                    onChange={(e) => setNewCampaign({ ...newCampaign, couponCode: e.target.value.toUpperCase() })}
                    className="font-mono uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <Input 
                    placeholder="e.g., 20% or 5 KD"
                    value={newCampaign.discountValue}
                    onChange={(e) => setNewCampaign({ ...newCampaign, discountValue: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Campaign Description</Label>
              <Textarea 
                placeholder="Describe your campaign objectives and target audience..."
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCampaignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCampaign}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

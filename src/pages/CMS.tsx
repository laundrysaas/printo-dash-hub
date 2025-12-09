import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Layout, 
  Image, 
  Globe, 
  ShoppingBag, 
  FormInput, 
  GitBranch,
  Plus,
  Edit,
  Eye,
  Calendar,
  Languages,
  Megaphone,
  Tag,
  Mail,
  FileQuestion
} from "lucide-react";

const CMS = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Website CMS Management Console</h1>
        <p className="text-muted-foreground">Publish and optimize your public site without developer help</p>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Page Builder</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        {/* Page Builder Tab */}
        <TabsContent value="pages" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Layout className="h-8 w-8 text-primary" />
                  <Badge>Live</Badge>
                </div>
                <CardTitle className="mt-4">Home Page</CardTitle>
                <CardDescription>Main landing page with hero slider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Last updated: 2 hours ago
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate("/cms/home-page")}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">Draft</Badge>
                </div>
                <CardTitle className="mt-4">Manage Products</CardTitle>
                <CardDescription>Edit and modify titles, images, and categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Last updated: 1 day ago
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate("/cms/products")}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Globe className="h-8 w-8 text-primary" />
                  <Badge>Live</Badge>
                </div>
                <CardTitle className="mt-4">Manage Printing Services</CardTitle>
                <CardDescription>Edit and modify titles, paper sizes, bindings, academic works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  12 pages active
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate("/cms/printing-services")}>
                    <Edit className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Help Center</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Article
                  </Button>
                </div>
                <CardDescription>Customer support documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileQuestion className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">How to Upload Files</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">45 views</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileQuestion className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Order Tracking Guide</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">128 views</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Multilingual Content
                    </div>
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    Settings
                  </Button>
                </div>
                <CardDescription>Manage EN/AR translations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">English (EN)</h4>
                      <p className="text-sm text-muted-foreground">Primary language</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Arabic (AR)</h4>
                      <p className="text-sm text-muted-foreground">85% translated</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>


      </Tabs>
    </div>
  );
};

export default CMS;
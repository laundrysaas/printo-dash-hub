import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Save, 
  Search,
  Languages,
  CheckCircle,
  AlertCircle,
  Globe,
  FileText,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

interface TranslationItem {
  id: string;
  key: string;
  section: string;
  english: string;
  arabic: string;
  isTranslated: boolean;
}

interface LanguageStats {
  code: string;
  name: string;
  flag: string;
  progress: number;
  isDefault: boolean;
  isActive: boolean;
}

const MultilingualContent = () => {
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [languages, setLanguages] = useState<LanguageStats[]>([
    { code: "en", name: "English", flag: "🇬🇧", progress: 100, isDefault: true, isActive: true },
    { code: "ar", name: "Arabic", flag: "🇰🇼", progress: 85, isDefault: false, isActive: true },
  ]);

  const [translations, setTranslations] = useState<TranslationItem[]>([
    // Navigation
    { id: "t-1", key: "nav.home", section: "Navigation", english: "Home", arabic: "الرئيسية", isTranslated: true },
    { id: "t-2", key: "nav.products", section: "Navigation", english: "Products", arabic: "المنتجات", isTranslated: true },
    { id: "t-3", key: "nav.services", section: "Navigation", english: "Services", arabic: "الخدمات", isTranslated: true },
    { id: "t-4", key: "nav.about", section: "Navigation", english: "About Us", arabic: "من نحن", isTranslated: true },
    { id: "t-5", key: "nav.contact", section: "Navigation", english: "Contact", arabic: "اتصل بنا", isTranslated: true },
    
    // Hero Section
    { id: "t-6", key: "hero.title", section: "Hero", english: "PRINTO Collection", arabic: "مجموعة برينتو", isTranslated: true },
    { id: "t-7", key: "hero.subtitle", section: "Hero", english: "Premium Printing Solutions", arabic: "حلول طباعة متميزة", isTranslated: true },
    { id: "t-8", key: "hero.cta", section: "Hero", english: "Shop Now", arabic: "تسوق الآن", isTranslated: true },
    
    // Products
    { id: "t-9", key: "products.tshirts", section: "Products", english: "Custom T-Shirts", arabic: "تيشيرتات مخصصة", isTranslated: true },
    { id: "t-10", key: "products.mugs", section: "Products", english: "Ceramic Mugs", arabic: "أكواب سيراميك", isTranslated: true },
    { id: "t-11", key: "products.hoodies", section: "Products", english: "Hoodies", arabic: "هوديز", isTranslated: true },
    { id: "t-12", key: "products.caps", section: "Products", english: "Caps", arabic: "قبعات", isTranslated: true },
    
    // Common UI
    { id: "t-13", key: "ui.addToCart", section: "UI Elements", english: "Add to Cart", arabic: "أضف إلى السلة", isTranslated: true },
    { id: "t-14", key: "ui.checkout", section: "UI Elements", english: "Checkout", arabic: "الدفع", isTranslated: true },
    { id: "t-15", key: "ui.search", section: "UI Elements", english: "Search", arabic: "بحث", isTranslated: true },
    { id: "t-16", key: "ui.filter", section: "UI Elements", english: "Filter", arabic: "تصفية", isTranslated: true },
    
    // Footer
    { id: "t-17", key: "footer.privacy", section: "Footer", english: "Privacy Policy", arabic: "سياسة الخصوصية", isTranslated: true },
    { id: "t-18", key: "footer.terms", section: "Footer", english: "Terms of Service", arabic: "شروط الخدمة", isTranslated: true },
    { id: "t-19", key: "footer.refund", section: "Footer", english: "Refund Policy", arabic: "", isTranslated: false },
    { id: "t-20", key: "footer.faq", section: "Footer", english: "FAQ", arabic: "", isTranslated: false },
    
    // Messages
    { id: "t-21", key: "msg.orderSuccess", section: "Messages", english: "Your order has been placed successfully!", arabic: "تم تقديم طلبك بنجاح!", isTranslated: true },
    { id: "t-22", key: "msg.addedToCart", section: "Messages", english: "Item added to cart", arabic: "تمت إضافة العنصر إلى السلة", isTranslated: true },
    { id: "t-23", key: "msg.outOfStock", section: "Messages", english: "This item is out of stock", arabic: "", isTranslated: false },
  ]);

  const sections = ["all", ...Array.from(new Set(translations.map(t => t.section)))];

  const handleSave = () => {
    // Recalculate Arabic progress
    const translatedCount = translations.filter(t => t.isTranslated).length;
    const progress = Math.round((translatedCount / translations.length) * 100);
    setLanguages(prev => prev.map(l => l.code === "ar" ? { ...l, progress } : l));
    
    toast.success("Translations saved successfully");
    setHasChanges(false);
  };

  const handleUpdateTranslation = (id: string, arabic: string) => {
    setTranslations(prev => prev.map(t => 
      t.id === id ? { ...t, arabic, isTranslated: arabic.trim().length > 0 } : t
    ));
    setHasChanges(true);
  };

  const filteredTranslations = translations.filter(t => {
    const matchesSearch = t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.arabic.includes(searchQuery);
    const matchesSection = selectedSection === "all" || t.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  const untranslatedCount = translations.filter(t => !t.isTranslated).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/cms")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Multilingual Content</h1>
              <Badge>Active</Badge>
            </div>
            <p className="text-muted-foreground">Manage translations for English and Arabic</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Language Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        {languages.map((lang) => (
          <Card key={lang.code}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {lang.name}
                      {lang.isDefault && <Badge variant="secondary">Default</Badge>}
                    </CardTitle>
                    <CardDescription>
                      {lang.progress}% translated
                    </CardDescription>
                  </div>
                </div>
                <Switch 
                  checked={lang.isActive}
                  disabled={lang.isDefault}
                  onCheckedChange={() => {
                    setLanguages(prev => prev.map(l => 
                      l.code === lang.code ? { ...l, isActive: !l.isActive } : l
                    ));
                    setHasChanges(true);
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={lang.progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{translations.filter(t => t.isTranslated || lang.isDefault).length} translated</span>
                {!lang.isDefault && <span>{untranslatedCount} remaining</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="translations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="missing" className="flex items-center gap-2">
            Missing
            {untranslatedCount > 0 && (
              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                {untranslatedCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="translations" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search translations..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {sections.map((section) => (
                <Button
                  key={section}
                  variant={selectedSection === section ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSection(section)}
                >
                  {section === "all" ? "All" : section}
                </Button>
              ))}
            </div>
          </div>

          {/* Translation Table */}
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                  <div className="col-span-3">Key</div>
                  <div className="col-span-4">English</div>
                  <div className="col-span-4">Arabic</div>
                  <div className="col-span-1">Status</div>
                </div>
                {filteredTranslations.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30">
                    <div className="col-span-3">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{item.key}</code>
                      <p className="text-xs text-muted-foreground mt-1">{item.section}</p>
                    </div>
                    <div className="col-span-4 text-sm">{item.english}</div>
                    <div className="col-span-4">
                      {editingId === item.id ? (
                        <Input
                          value={item.arabic}
                          onChange={(e) => handleUpdateTranslation(item.id, e.target.value)}
                          onBlur={() => setEditingId(null)}
                          onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
                          autoFocus
                          dir="rtl"
                          className="text-right"
                        />
                      ) : (
                        <div 
                          className={`text-sm cursor-pointer p-2 rounded hover:bg-muted ${!item.arabic ? "text-muted-foreground italic" : ""}`}
                          dir="rtl"
                          onClick={() => setEditingId(item.id)}
                        >
                          {item.arabic || "Click to translate..."}
                        </div>
                      )}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {item.isTranslated ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Missing Translations ({untranslatedCount})
              </CardTitle>
              <CardDescription>
                These items need Arabic translations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {translations.filter(t => !t.isTranslated).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{item.key}</code>
                      <p className="mt-2 font-medium">{item.english}</p>
                      <p className="text-sm text-muted-foreground">{item.section}</p>
                    </div>
                    <div className="flex-1">
                      <Input
                        value={item.arabic}
                        onChange={(e) => handleUpdateTranslation(item.id, e.target.value)}
                        placeholder="Enter Arabic translation..."
                        dir="rtl"
                        className="text-right"
                      />
                    </div>
                  </div>
                ))}
                {untranslatedCount === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <p>All content has been translated!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>Configure language preferences and defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Auto-detect browser language</p>
                      <p className="text-sm text-muted-foreground">Automatically show content in user's preferred language</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Show language switcher</p>
                      <p className="text-sm text-muted-foreground">Display language toggle on the website</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">RTL Support for Arabic</p>
                      <p className="text-sm text-muted-foreground">Enable right-to-left text direction for Arabic content</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultilingualContent;
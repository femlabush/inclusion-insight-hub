import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download,
  Filter,
  Calendar,
  Users,
  Smartphone,
  MapPin,
  Activity
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('12m');
  const [selectedMetric, setSelectedMetric] = useState('inclusion');

  const metrics = [
    { id: 'inclusion', label: 'Financial Inclusion Rate', value: '73.2%', change: '+5.3%', trend: 'up' },
    { id: 'mobile', label: 'Mobile Money Adoption', value: '68.5%', change: '+12.1%', trend: 'up' },
    { id: 'rural', label: 'Rural Access Rate', value: '45.8%', change: '+3.2%', trend: 'up' },
    { id: 'accounts', label: 'Active Accounts', value: '1.8M', change: '+8.7%', trend: 'up' }
  ];

  const charts = [
    {
      title: 'Financial Inclusion by Region',
      type: 'bar',
      description: 'Regional distribution of financial inclusion rates',
      icon: BarChart3
    },
    {
      title: 'Service Usage Distribution',
      type: 'pie',
      description: 'Breakdown of financial service usage',
      icon: PieChart
    },
    {
      title: 'Adoption Trends Over Time',
      type: 'line',
      description: 'Historical trends in financial service adoption',
      icon: TrendingUp
    },
    {
      title: 'Demographics Analysis',
      type: 'stacked',
      description: 'Financial inclusion by age and gender groups',
      icon: Users
    }
  ];

  const exportOptions = [
    { format: 'PNG', description: 'High-resolution image' },
    { format: 'PDF', description: 'Print-ready document' },
    { format: 'CSV', description: 'Raw data export' },
    { format: 'Excel', description: 'Formatted spreadsheet' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interactive Analytics</h1>
          <p className="text-muted-foreground">
            Explore financial inclusion data with interactive visualizations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analysis Controls</CardTitle>
          <CardDescription>
            Customize your view with filters and date ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="urban">Urban Areas</SelectItem>
                  <SelectItem value="rural">Rural Areas</SelectItem>
                  <SelectItem value="north">Northern Region</SelectItem>
                  <SelectItem value="south">Southern Region</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="12m">Last 12 Months</SelectItem>
                  <SelectItem value="24m">Last 24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Primary Metric</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inclusion">Financial Inclusion</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="banking">Traditional Banking</SelectItem>
                  <SelectItem value="credit">Credit Access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Age Group</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="18-25">18-25 years</SelectItem>
                  <SelectItem value="26-35">26-35 years</SelectItem>
                  <SelectItem value="36-50">36-50 years</SelectItem>
                  <SelectItem value="50+">50+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>All Regions</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Last 12 Months</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>Financial Inclusion</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={metric.id} className={selectedMetric === metric.id ? 'ring-2 ring-primary' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-accent flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </p>
                </div>
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {metric.id === 'inclusion' && <TrendingUp className="h-4 w-4 text-primary" />}
                  {metric.id === 'mobile' && <Smartphone className="h-4 w-4 text-primary" />}
                  {metric.id === 'rural' && <MapPin className="h-4 w-4 text-primary" />}
                  {metric.id === 'accounts' && <Users className="h-4 w-4 text-primary" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <chart.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{chart.title}</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{chart.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                <div className="text-center">
                  <chart.icon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-sm">
                    {chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} Chart
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Interactive visualization will appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Export Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>
            Download charts and data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {exportOptions.map((option, index) => (
              <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Download className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{option.format}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
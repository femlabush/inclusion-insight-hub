import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Smartphone,
  Download,
  Filter,
  Calendar,
  PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnalystDashboard: React.FC = () => {
  const keyMetrics = [
    {
      title: 'Financial Inclusion Rate',
      value: '73.2%',
      change: '+5.3% from last quarter',
      icon: TrendingUp,
      color: 'text-accent',
      trend: 'up'
    },
    {
      title: 'Mobile Money Users',
      value: '2.4M',
      change: '+12% month over month',
      icon: Smartphone,
      color: 'text-primary',
      trend: 'up'
    },
    {
      title: 'Rural Coverage',
      value: '67%',
      change: '+3.2% from last month',
      icon: Users,
      color: 'text-analytics-secondary',
      trend: 'up'
    },
    {
      title: 'Active Accounts',
      value: '1.8M',
      change: '+8.7% growth rate',
      icon: BarChart3,
      color: 'text-analytics-tertiary',
      trend: 'up'
    }
  ];

  const recentReports = [
    {
      title: 'Q4 2024 Financial Inclusion Report',
      date: '2024-12-15',
      type: 'Quarterly Report',
      status: 'Completed'
    },
    {
      title: 'Mobile Banking Usage Analysis',
      date: '2024-12-10',
      type: 'Usage Analysis',
      status: 'Completed'
    },
    {
      title: 'Rural Demographics Study',
      date: '2024-12-08',
      type: 'Demographic Analysis',
      status: 'In Progress'
    }
  ];

  const quickInsights = [
    {
      insight: 'Rural mobile money adoption increased by 15% in the last quarter',
      category: 'Growth Trend',
      priority: 'high'
    },
    {
      insight: 'Young adults (18-25) show highest engagement with digital banking',
      category: 'Demographics',
      priority: 'medium'
    },
    {
      insight: 'Weekend transaction volumes are 23% higher than weekdays',
      category: 'Usage Pattern',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-accent';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-primary';
      default: return 'border-l-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Explore financial inclusion data and generate insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-accent mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Tools</CardTitle>
            <CardDescription>
              Access visualization and reporting tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link to="/analyst/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Interactive Analytics
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/analyst/reports">
                <Download className="mr-2 h-4 w-4" />
                Generate Reports
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/data-sources">
                <Filter className="mr-2 h-4 w-4" />
                Data Sources
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/analyst/analytics?view=charts">
                <PieChart className="mr-2 h-4 w-4" />
                Custom Charts
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Your latest analysis and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium text-sm text-foreground mb-1">
                    {report.title}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {report.date}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      report.status === 'Completed' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              Latest data-driven discoveries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickInsights.map((item, index) => (
                <div key={index} className={`border-l-4 pl-3 py-2 ${getPriorityColor(item.priority)}`}>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {item.insight}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sample Chart Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Inclusion Trends</CardTitle>
          <CardDescription>
            Overview of key metrics over the past 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Interactive charts available in Analytics section</p>
              <Button asChild variant="outline">
                <Link to="/analyst/analytics">
                  View Full Analytics
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
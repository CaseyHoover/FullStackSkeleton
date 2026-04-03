export interface Document {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

export interface VisitorDataPoint {
  date: string;
  desktop: number;
  mobile: number;
}

export interface SummaryCard {
  title: string;
  value: string;
  badge: string;
  trend: "up" | "down";
  footerText: string;
  footerSub: string;
}

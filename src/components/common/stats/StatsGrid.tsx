import { Anchor, DollarSign, Ship, Wrench } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { StatsCardProps } from "./types";

interface StatsGridProps {
  occupancyRate: number;
  occupiedSlips: number;
  totalSlips: number;
  activeBoats: number;
  monthlyRevenue: number;
  pendingMaintenance: number;
}

export function StatsGrid({
  occupancyRate,
  occupiedSlips,
  totalSlips,
  activeBoats,
  monthlyRevenue,
  pendingMaintenance
}: StatsGridProps) {
  const statsCards: StatsCardProps[] = [
    {
      title: "Total Customers",
      value: totalSlips,
      icon: Anchor,
      trend: {
        value: "5%",
        isPositive: true,
        comparedTo: "compared to last month"
      },
      breakdown: [
        { label: "Active", value: occupiedSlips, percentage: Math.round((occupiedSlips/totalSlips) * 100) },
        { label: "Total", value: totalSlips }
      ]
    },
    {
      title: "Monthly Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      trend: {
        value: "12%",
        isPositive: true,
        comparedTo: "compared to last month"
      },
      breakdown: [
        { label: "Renewals", value: "$20,000", percentage: 44 },
        { label: "New Customers", value: "$15,000", percentage: 33 },
        { label: "Services", value: "$10,231", percentage: 23 }
      ]
    },
    {
      title: "New This Month",
      value: activeBoats,
      icon: Ship,
      trend: {
        value: "3 customers",
        isPositive: true,
        comparedTo: "compared to last month"
      },
      breakdown: [
        { label: "Direct", value: "12", percentage: 80 },
        { label: "Referral", value: "3", percentage: 20 }
      ]
    },
    {
      title: "Pending Actions",
      value: pendingMaintenance,
      icon: Wrench,
      trend: {
        value: "2 tasks",
        isPositive: true,
        comparedTo: "compared to last week"
      },
      breakdown: [
        { label: "Follow-ups", value: "3", percentage: 38 },
        { label: "Reviews", value: "5", percentage: 62 }
      ]
    }
  ];

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((cardProps, index) => (
        <StatsCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
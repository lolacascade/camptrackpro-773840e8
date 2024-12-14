import { format, subMonths, addMonths } from "date-fns";

export const generateMonthlyData = () => {
  const data = [];
  for (let i = -12; i <= 2; i++) {
    const date = i === 0 ? new Date() : (i < 0 ? subMonths(new Date(), Math.abs(i)) : addMonths(new Date(), i));
    const isProjected = i > 0;
    
    // Random data for demonstration
    let newCustomers = Math.floor(Math.random() * 15) + 5;
    let websiteAcquisitions = Math.floor(newCustomers * 0.6);
    let referralAcquisitions = newCustomers - websiteAcquisitions;
    
    if (isProjected) {
      // Projected values show slight growth
      newCustomers = Math.floor(newCustomers * 1.1);
      websiteAcquisitions = Math.floor(newCustomers * 0.65);
      referralAcquisitions = newCustomers - websiteAcquisitions;
    }
    
    data.push({
      date,
      month: format(date, 'MMM'),
      year: format(date, 'yyyy'),
      newCustomers,
      websiteAcquisitions,
      referralAcquisitions,
      isProjected
    });
  }
  return data;
};
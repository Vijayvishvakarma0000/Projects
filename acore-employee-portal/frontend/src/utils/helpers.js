export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const calculateNetSalary = (salaryData) => {
  const grossSalary = salaryData.basic + salaryData.hra + salaryData.da + salaryData.transport + salaryData.special;
  const totalDeductions = salaryData.pf + salaryData.professionalTax + salaryData.incomeTax + salaryData.esi;
  const netSalary = grossSalary - totalDeductions;
  
  return { grossSalary, totalDeductions, netSalary };
};

export const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  const calendarDays = [];
  
  // Add empty days for padding
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ type: 'empty' });
  }
  
  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === today.toDateString();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    calendarDays.push({
      type: 'day',
      value: day,
      isToday,
      isWeekend,
      date: date.toISOString().split('T')[0]
    });
  }
  
  return calendarDays;
};

export const getInitials = (name) => {
  return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
};
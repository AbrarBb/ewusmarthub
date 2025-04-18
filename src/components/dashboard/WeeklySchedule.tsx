
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScheduleItem {
  id: string;
  course: string;
  courseCode: string;
  time: string;
  location: string;
  colorClass: string;
}

interface DailySchedule {
  day: string;
  shortDay: string;
  items: ScheduleItem[];
}

const WeeklySchedule = () => {
  const schedule: DailySchedule[] = [
    {
      day: 'Monday',
      shortDay: 'Mon',
      items: [
        {
          id: '1',
          course: 'Database Systems',
          courseCode: 'CSE303',
          time: '10:00 AM - 11:30 AM',
          location: 'Room 205',
          colorClass: 'bg-blue-100 border-blue-500',
        },
        {
          id: '2',
          course: 'Software Engineering',
          courseCode: 'CSE327',
          time: '2:00 PM - 3:30 PM',
          location: 'Room 301',
          colorClass: 'bg-purple-100 border-purple-500',
        },
      ],
    },
    {
      day: 'Tuesday',
      shortDay: 'Tue',
      items: [
        {
          id: '3',
          course: 'Calculus II',
          courseCode: 'MAT121',
          time: '9:00 AM - 10:30 AM',
          location: 'Room 103',
          colorClass: 'bg-green-100 border-green-500',
        },
      ],
    },
    {
      day: 'Wednesday',
      shortDay: 'Wed',
      items: [
        {
          id: '4',
          course: 'Database Systems',
          courseCode: 'CSE303',
          time: '10:00 AM - 11:30 AM',
          location: 'Room 205',
          colorClass: 'bg-blue-100 border-blue-500',
        },
        {
          id: '5',
          course: 'Physics Lab',
          courseCode: 'PHY103',
          time: '1:00 PM - 3:00 PM',
          location: 'Lab 2',
          colorClass: 'bg-yellow-100 border-yellow-500',
        },
      ],
    },
    {
      day: 'Thursday',
      shortDay: 'Thu',
      items: [
        {
          id: '6',
          course: 'Calculus II',
          courseCode: 'MAT121',
          time: '9:00 AM - 10:30 AM',
          location: 'Room 103',
          colorClass: 'bg-green-100 border-green-500',
        },
        {
          id: '7',
          course: 'Software Engineering',
          courseCode: 'CSE327',
          time: '2:00 PM - 3:30 PM',
          location: 'Room 301',
          colorClass: 'bg-purple-100 border-purple-500',
        },
      ],
    },
    {
      day: 'Friday',
      shortDay: 'Fri',
      items: [],
    },
  ];

  // Determine current day for highlighting
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {schedule.map((day) => (
            <div 
              key={day.day} 
              className={`flex flex-col ${day.day === today ? 'bg-muted/50 rounded-md' : ''}`}
            >
              <div className="text-center py-2">
                <p className="text-xs font-medium text-muted-foreground">{day.shortDay}</p>
                <p className={`text-sm ${day.day === today ? 'font-bold text-primary' : ''}`}>
                  {day.day === today ? 'Today' : day.shortDay}
                </p>
              </div>
              
              <div className="flex-1 space-y-2 px-1 pb-2">
                {day.items.length > 0 ? (
                  day.items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`text-xs p-2 rounded border-l-2 ${item.colorClass}`}
                    >
                      <p className="font-medium">{item.course}</p>
                      <p className="text-muted-foreground">{item.time}</p>
                      <p className="text-muted-foreground">{item.location}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-center text-muted-foreground py-4">
                    No classes
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklySchedule;

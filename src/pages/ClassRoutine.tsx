
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  PlusCircle, 
  Calendar as CalendarIcon
} from 'lucide-react';

type ViewMode = 'day' | 'week' | 'month';

const ClassRoutine = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Format the current date based on the view mode
  const getFormattedDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', options);
    } else if (viewMode === 'week') {
      // Get start of week (Monday)
      const startOfWeek = new Date(currentDate);
      const day = currentDate.getDay();
      const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      
      // Get end of week (Sunday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'long' });
      const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'long' });
      
      if (startMonth === endMonth) {
        return `${startMonth} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
      } else {
        return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };
  
  // Navigate to previous period
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  // Navigate to next period
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Sample classes for the current week
  const classes = [
    {
      id: '1',
      course: 'Database Systems',
      courseCode: 'CSE303',
      day: 'Monday',
      startTime: '10:00',
      endTime: '11:30',
      location: 'Room 205',
      colorClass: 'border-blue-400 bg-blue-50',
      instructor: 'Dr. Rahman',
    },
    {
      id: '2',
      course: 'Software Engineering',
      courseCode: 'CSE327',
      day: 'Monday',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Room 301',
      colorClass: 'border-purple-400 bg-purple-50',
      instructor: 'Prof. Ahmed',
    },
    {
      id: '3',
      course: 'Calculus II',
      courseCode: 'MAT121',
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Room 103',
      colorClass: 'border-green-400 bg-green-50',
      instructor: 'Dr. Chowdhury',
    },
    {
      id: '4',
      course: 'Database Systems',
      courseCode: 'CSE303',
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '11:30',
      location: 'Room 205',
      colorClass: 'border-blue-400 bg-blue-50',
      instructor: 'Dr. Rahman',
    },
    {
      id: '5',
      course: 'Physics Lab',
      courseCode: 'PHY103',
      day: 'Wednesday',
      startTime: '13:00',
      endTime: '15:00',
      location: 'Lab 2',
      colorClass: 'border-yellow-400 bg-yellow-50',
      instructor: 'Dr. Hossain',
    },
    {
      id: '6',
      course: 'Calculus II',
      courseCode: 'MAT121',
      day: 'Thursday',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Room 103',
      colorClass: 'border-green-400 bg-green-50',
      instructor: 'Dr. Chowdhury',
    },
    {
      id: '7',
      course: 'Software Engineering',
      courseCode: 'CSE327',
      day: 'Thursday',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Room 301',
      colorClass: 'border-purple-400 bg-purple-50',
      instructor: 'Prof. Ahmed',
    },
  ];
  
  // Days of the week for rendering
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Time slots for the day view
  const timeSlots = Array.from({ length: 12 }, (_, i) => ({
    hour: i + 8, // 8 AM to 7 PM
    label: `${i + 8 > 12 ? i + 8 - 12 : i + 8}:00 ${i + 8 >= 12 ? 'PM' : 'AM'}`,
  }));
  
  // Get classes for a specific day
  const getClassesForDay = (day: string) => {
    return classes.filter(c => c.day === day);
  };
  
  // Calculate the position and height of a class in the day view
  const getClassPosition = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startDecimal = startHour + startMinute / 60;
    const endDecimal = endHour + endMinute / 60;
    
    // Calculate top position and height based on time (assuming 8 AM is 0%)
    const top = (startDecimal - 8) * 100 / 12; // 12 hours total (8 AM to 8 PM)
    const height = (endDecimal - startDecimal) * 100 / 12;
    
    return { top: `${top}%`, height: `${height}%` };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Class Routine</h1>
        <p className="text-muted-foreground">Manage your weekly schedule and never miss a class</p>
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <CardTitle className="text-lg">{getFormattedDateRange()}</CardTitle>
            </div>
            
            <div className="flex gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {viewMode === 'week' && (
            <div className="grid grid-cols-7 gap-2 h-96 overflow-y-auto">
              {weekDays.map((day) => (
                <div key={day} className="flex flex-col h-full">
                  <div className="text-center py-2 border-b sticky top-0 bg-background">
                    <p className="text-sm font-medium">{day}</p>
                  </div>
                  
                  <div className="flex-1 p-1 space-y-2 relative">
                    {getClassesForDay(day).length > 0 ? (
                      getClassesForDay(day).map((cls) => (
                        <div 
                          key={cls.id} 
                          className={`p-2 rounded border-l-2 ${cls.colorClass} text-xs`}
                        >
                          <p className="font-medium">{cls.course}</p>
                          <p className="text-muted-foreground">{cls.courseCode}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{cls.startTime} - {cls.endTime}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{cls.location}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-center text-muted-foreground pt-4">
                        No classes
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {viewMode === 'day' && (
            <div className="relative h-[600px] overflow-y-auto border rounded-md">
              {timeSlots.map((slot) => (
                <div key={slot.hour} className="flex border-t h-20">
                  <div className="w-20 flex-shrink-0 border-r p-1 text-xs text-muted-foreground">
                    {slot.label}
                  </div>
                  <div className="flex-1 relative">
                    {/* Draw a light horizontal line at the hour mark */}
                    <div className="absolute left-0 right-0 border-t border-dashed border-muted"></div>
                  </div>
                </div>
              ))}
              
              {/* Overlay classes on the time grid */}
              {getClassesForDay(weekDays[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1]).map((cls) => {
                const { top, height } = getClassPosition(cls.startTime, cls.endTime);
                return (
                  <div 
                    key={cls.id}
                    className={`absolute left-20 right-2 ${cls.colorClass} rounded p-2 border overflow-hidden`}
                    style={{ top, height, zIndex: 10 }}
                  >
                    <p className="font-medium">{cls.course}</p>
                    <p className="text-xs text-muted-foreground">{cls.courseCode}</p>
                    <div className="flex items-center text-xs mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{cls.startTime} - {cls.endTime}</span>
                    </div>
                    <div className="flex items-center text-xs mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{cls.location}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {viewMode === 'month' && (
            <div className="text-center py-12">
              <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Month View Coming Soon</h3>
              <p className="text-muted-foreground mt-2">We're working on a monthly calendar view for better planning.</p>
              <Button variant="outline" className="mt-4" onClick={() => setViewMode('week')}>
                Switch to Week View
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Import Your Class Schedule</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You can upload your official class schedule PDF or connect to the university portal to automatically import your classes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassRoutine;

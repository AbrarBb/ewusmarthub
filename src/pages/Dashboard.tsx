
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import CourseCard from '@/components/dashboard/CourseCard';
import WeeklySchedule from '@/components/dashboard/WeeklySchedule';
import { BookOpen, GraduationCap, Clock, Award } from 'lucide-react';

const Dashboard = () => {
  // Sample current courses data
  const currentCourses = [
    {
      id: '1',
      courseCode: 'CSE303',
      title: 'Database Systems',
      instructor: 'Dr. Rahman',
      progress: 65,
      nextClass: 'Wednesday, 10:00 AM',
      nextTask: {
        title: 'Assignment 3: SQL Queries',
        dueDate: 'Apr 25, 2025',
      },
    },
    {
      id: '2',
      courseCode: 'CSE327',
      title: 'Software Engineering',
      instructor: 'Prof. Ahmed',
      progress: 45,
      nextClass: 'Thursday, 2:00 PM',
      nextTask: {
        title: 'Project Milestone 1',
        dueDate: 'Apr 30, 2025',
      },
    },
    {
      id: '3',
      courseCode: 'MAT121',
      title: 'Calculus II',
      instructor: 'Dr. Chowdhury',
      progress: 80,
      nextClass: 'Tuesday, 9:00 AM',
      nextTask: {
        title: 'Quiz 4',
        dueDate: 'Apr 23, 2025',
      },
    },
    {
      id: '4',
      courseCode: 'PHY103',
      title: 'Physics for Engineers',
      instructor: 'Dr. Hossain',
      progress: 55,
      nextClass: 'Wednesday, 1:00 PM',
      nextTask: {
        title: 'Lab Report',
        dueDate: 'Apr 22, 2025',
      },
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Spring Semester 2025</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Current CGPA" 
          value="3.45" 
          icon={Award}
          trend={{ value: 2.5, positive: true }}
        />
        <StatCard 
          title="Credits Completed" 
          value="75" 
          icon={GraduationCap}
        />
        <StatCard 
          title="Current Courses" 
          value="4" 
          icon={BookOpen}
        />
        <StatCard 
          title="Upcoming Tasks" 
          value="6" 
          icon={Clock}
        />
      </div>
      
      <h2 className="text-xl font-semibold mt-8">Current Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      
      <div className="mt-8">
        <WeeklySchedule />
      </div>
    </div>
  );
};

export default Dashboard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressCircle } from './ProgressCircle';

interface CourseCardProps {
  courseCode: string;
  title: string;
  instructor: string;
  progress: number;
  nextClass?: string;
  nextTask?: {
    title: string;
    dueDate: string;
  };
}

const CourseCard = ({ 
  courseCode, 
  title, 
  instructor, 
  progress, 
  nextClass, 
  nextTask 
}: CourseCardProps) => {
  return (
    <Card className="shadow-sm card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{courseCode}</p>
            <CardTitle className="text-base font-semibold mt-1">{title}</CardTitle>
          </div>
          <ProgressCircle percentage={progress} size={40} strokeWidth={4} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Instructor:</span> {instructor}
        </p>
        
        {nextClass && (
          <div className="mt-3">
            <p className="text-xs font-medium text-muted-foreground">NEXT CLASS</p>
            <p className="text-sm font-medium">{nextClass}</p>
          </div>
        )}
        
        {nextTask && (
          <div className="mt-3">
            <p className="text-xs font-medium text-muted-foreground">UPCOMING</p>
            <p className="text-sm font-medium">{nextTask.title}</p>
            <p className="text-xs text-muted-foreground">Due: {nextTask.dueDate}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;

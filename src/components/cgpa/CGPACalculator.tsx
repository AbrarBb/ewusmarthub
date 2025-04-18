
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const gradePoints: Record<string, number> = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

const CGPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', grade: 'A', credits: 3 },
    { id: '2', name: 'Course 2', grade: 'B+', credits: 3 },
  ]);
  
  const [targetCGPA, setTargetCGPA] = useState<number>(3.5);

  const addCourse = () => {
    const newId = Date.now().toString();
    setCourses([...courses, { id: newId, name: `Course ${courses.length + 1}`, grade: 'A', credits: 3 }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateCGPA = () => {
    if (courses.length === 0) return 0;
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const cgpa = calculateCGPA();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>CGPA Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 items-center font-medium text-sm">
            <div className="col-span-5">Course Name</div>
            <div className="col-span-3">Grade</div>
            <div className="col-span-3">Credits</div>
            <div className="col-span-1"></div>
          </div>
          
          {courses.map(course => (
            <div key={course.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5">
                <Input
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder="Course name"
                />
              </div>
              <div className="col-span-3">
                <Select
                  value={course.grade}
                  onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradePoints).map(grade => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <Select
                  value={course.credits.toString()}
                  onValueChange={(value) => updateCourse(course.id, 'credits', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Credits" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(credits => (
                      <SelectItem key={credits} value={credits.toString()}>
                        {credits}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" onClick={addCourse} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Your CGPA:</span>
              <span className="text-xl font-bold">{cgpa}</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target CGPA</label>
              <Input
                type="number"
                min="0"
                max="4"
                step="0.1"
                value={targetCGPA}
                onChange={(e) => setTargetCGPA(parseFloat(e.target.value))}
              />
              
              <div className="bg-muted p-3 rounded-md mt-2">
                <p className="text-sm">
                  To achieve a CGPA of <strong>{targetCGPA}</strong>, you'll need to maintain an average grade of{' '}
                  <strong>{
                    parseFloat(cgpa) < targetCGPA ? 'higher than' : 
                    parseFloat(cgpa) > targetCGPA ? 'lower than' : 
                    'equal to'
                  } your current performance</strong> in future courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CGPACalculator;

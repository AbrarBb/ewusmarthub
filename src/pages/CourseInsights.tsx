
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

const CourseInsights = () => {
  const courseReviews = [
    {
      id: '1',
      courseCode: 'CSE303',
      courseName: 'Database Systems',
      instructor: 'Dr. Rahman',
      rating: 4.5,
      difficulty: 'Moderate',
      workload: 'Heavy',
      review: 'Great course! The professor explains complex concepts clearly. The assignments are challenging but very helpful for learning SQL and database design principles.',
      author: 'Student, CSE Dept',
      date: 'March 15, 2025',
      likes: 24,
      dislikes: 2,
      comments: 5,
    },
    {
      id: '2',
      courseCode: 'CSE311',
      courseName: 'Computer Architecture',
      instructor: 'Prof. Khan',
      rating: 3.8,
      difficulty: 'Hard',
      workload: 'Very Heavy',
      review: 'This course covers essential computer architecture concepts, but the pace is quite fast. The instructor is knowledgeable but sometimes assumes prior knowledge. Lab assignments are particularly challenging.',
      author: 'Anonymous',
      date: 'February 28, 2025',
      likes: 15,
      dislikes: 6,
      comments: 3,
    },
    {
      id: '3',
      courseCode: 'CSE327',
      courseName: 'Software Engineering',
      instructor: 'Prof. Ahmed',
      rating: 4.2,
      difficulty: 'Moderate',
      workload: 'Moderate',
      review: 'Highly practical course with focus on real-world software development. The group project is time-consuming but provides valuable experience. Professor is responsive and helpful.',
      author: 'Final Year Student',
      date: 'April 2, 2025',
      likes: 32,
      dislikes: 4,
      comments: 7,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Course & Faculty Insights</h1>
        <p className="text-muted-foreground">Explore reviews and insights to make informed decisions</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          className="pl-10" 
          placeholder="Search for courses, instructors, or departments..." 
        />
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Course Reviews</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Reviews</TabsTrigger>
          <TabsTrigger value="resources">Study Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">All Departments</Button>
            <Button variant="outline" size="sm">Computer Science</Button>
            <Button variant="outline" size="sm">Electrical Engineering</Button>
            <Button variant="outline" size="sm">Business</Button>
            <Button variant="outline" size="sm">Mathematics</Button>
          </div>
          
          {courseReviews.map((review) => (
            <Card key={review.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{review.courseCode}</p>
                    <CardTitle className="text-base">{review.courseName}</CardTitle>
                    <CardDescription>Instructor: {review.instructor}</CardDescription>
                  </div>
                  <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{review.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-2">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">
                    Difficulty: {review.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">
                    Workload: {review.workload}
                  </span>
                </div>
                
                <p className="text-sm">{review.review}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {review.author} • {review.date}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-xs">{review.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <span className="text-xs">{review.dislikes}</span>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <span className="text-xs">{review.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="faculty" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Reviews</CardTitle>
              <CardDescription>Coming soon! This feature is under development.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">We'll soon be adding a comprehensive faculty review system so you can make informed decisions about your professors.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Resources</CardTitle>
              <CardDescription>Coming soon! This feature is under development.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">We're building a repository of past exams, study guides, and other resources to help you succeed in your courses.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseInsights;

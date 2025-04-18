
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star, ThumbsUp, ThumbsDown, MessageSquare, Plus, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CourseReview {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  rating: number;
  difficulty: string;
  workload: string;
  review: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
  comments: number;
  userLiked?: boolean;
  userDisliked?: boolean;
}

const CourseInsights = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [reviewContent, setReviewContent] = useState('');
  const [newReview, setNewReview] = useState({
    courseCode: '',
    courseName: '',
    instructor: '',
    rating: 5,
    difficulty: 'Moderate',
    workload: 'Moderate',
  });
  
  const [courseReviews, setCourseReviews] = useState<CourseReview[]>([
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
  ]);

  const handleNewReviewSubmit = () => {
    if (!newReview.courseCode || !newReview.courseName || !newReview.instructor || !reviewContent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const review: CourseReview = {
      id: Date.now().toString(),
      courseCode: newReview.courseCode,
      courseName: newReview.courseName,
      instructor: newReview.instructor,
      rating: newReview.rating,
      difficulty: newReview.difficulty,
      workload: newReview.workload,
      review: reviewContent,
      author: "You",
      date: dateString,
      likes: 0,
      dislikes: 0,
      comments: 0,
    };
    
    setCourseReviews([review, ...courseReviews]);
    
    // Reset form
    setNewReview({
      courseCode: '',
      courseName: '',
      instructor: '',
      rating: 5,
      difficulty: 'Moderate',
      workload: 'Moderate',
    });
    setReviewContent('');
    
    toast({
      title: "Review Submitted",
      description: "Your course review has been published successfully.",
    });
  };

  const handleLike = (id: string) => {
    setCourseReviews(courseReviews.map(review => {
      if (review.id === id) {
        // If already liked, remove like
        if (review.userLiked) {
          toast({
            title: "Like Removed",
            description: "You've removed your like from this review.",
          });
          return { 
            ...review, 
            likes: review.likes - 1, 
            userLiked: false 
          };
        }
        
        // If disliked, remove dislike and add like
        if (review.userDisliked) {
          toast({
            title: "Changed to Like",
            description: "You now like this review.",
          });
          return { 
            ...review, 
            likes: review.likes + 1, 
            dislikes: review.dislikes - 1, 
            userLiked: true, 
            userDisliked: false 
          };
        }
        
        // Regular like
        toast({
          title: "Review Liked",
          description: "You've liked this review.",
        });
        return { 
          ...review, 
          likes: review.likes + 1,
          userLiked: true 
        };
      }
      return review;
    }));
  };

  const handleDislike = (id: string) => {
    setCourseReviews(courseReviews.map(review => {
      if (review.id === id) {
        // If already disliked, remove dislike
        if (review.userDisliked) {
          toast({
            title: "Dislike Removed",
            description: "You've removed your dislike from this review.",
          });
          return { 
            ...review, 
            dislikes: review.dislikes - 1, 
            userDisliked: false 
          };
        }
        
        // If liked, remove like and add dislike
        if (review.userLiked) {
          toast({
            title: "Changed to Dislike",
            description: "You now dislike this review.",
          });
          return { 
            ...review, 
            likes: review.likes - 1, 
            dislikes: review.dislikes + 1, 
            userLiked: false, 
            userDisliked: true 
          };
        }
        
        // Regular dislike
        toast({
          title: "Review Disliked",
          description: "You've disliked this review.",
        });
        return { 
          ...review, 
          dislikes: review.dislikes + 1,
          userDisliked: true 
        };
      }
      return review;
    }));
  };

  const handleComment = (id: string) => {
    toast({
      title: "Comments Feature",
      description: "Comments functionality will be available soon!",
    });
  };

  const handleDepartmentSelection = (department: string) => {
    setSelectedDepartment(department === selectedDepartment ? null : department);
    toast({
      title: department === selectedDepartment ? "Filter Removed" : "Department Filtered",
      description: department === selectedDepartment 
        ? "Showing reviews from all departments." 
        : `Showing reviews from ${department} department.`,
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      toast({
        title: "Searching",
        description: `Searching for "${value}"...`,
      });
    }
  };

  const filteredReviews = courseReviews.filter(review => {
    const matchesSearch = searchTerm.length < 3 || 
      review.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = !selectedDepartment || 
      review.courseCode.startsWith(selectedDepartment.split(' ')[0]);
      
    return matchesSearch && matchesDepartment;
  });

  const handleLoadMore = () => {
    toast({
      title: "Load More",
      description: "Loading more reviews...",
    });
    // In a real app, this would fetch more reviews from an API
  };

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
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Course Reviews</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Reviews</TabsTrigger>
          <TabsTrigger value="resources">Study Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedDepartment === null ? "default" : "outline"} 
                size="sm"
                onClick={() => handleDepartmentSelection('All Departments')}
              >
                All Departments
              </Button>
              <Button 
                variant={selectedDepartment === "CSE Computer Science" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleDepartmentSelection('CSE Computer Science')}
              >
                Computer Science
              </Button>
              <Button 
                variant={selectedDepartment === "EEE Electrical Engineering" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleDepartmentSelection('EEE Electrical Engineering')}
              >
                Electrical Engineering
              </Button>
              <Button 
                variant={selectedDepartment === "BBA Business" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleDepartmentSelection('BBA Business')}
              >
                Business
              </Button>
              <Button 
                variant={selectedDepartment === "MAT Mathematics" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleDepartmentSelection('MAT Mathematics')}
              >
                Mathematics
              </Button>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Course Review</DialogTitle>
                  <DialogDescription>
                    Share your experience to help other students make informed decisions.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="courseCode" className="text-sm font-medium">Course Code*</label>
                      <Input 
                        id="courseCode" 
                        placeholder="e.g., CSE303" 
                        value={newReview.courseCode}
                        onChange={(e) => setNewReview({...newReview, courseCode: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="courseName" className="text-sm font-medium">Course Name*</label>
                      <Input 
                        id="courseName" 
                        placeholder="e.g., Database Systems" 
                        value={newReview.courseName}
                        onChange={(e) => setNewReview({...newReview, courseName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="instructor" className="text-sm font-medium">Instructor*</label>
                    <Input 
                      id="instructor" 
                      placeholder="e.g., Dr. Rahman" 
                      value={newReview.instructor}
                      onChange={(e) => setNewReview({...newReview, instructor: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="rating" className="text-sm font-medium">Rating</label>
                      <Select 
                        value={String(newReview.rating)} 
                        onValueChange={(val) => setNewReview({...newReview, rating: parseFloat(val)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map(rating => (
                            <SelectItem key={rating} value={String(rating)}>
                              {rating}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="difficulty" className="text-sm font-medium">Difficulty</label>
                      <Select 
                        value={newReview.difficulty} 
                        onValueChange={(val) => setNewReview({...newReview, difficulty: val})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Easy', 'Moderate', 'Hard', 'Very Hard'].map(difficulty => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="workload" className="text-sm font-medium">Workload</label>
                      <Select 
                        value={newReview.workload} 
                        onValueChange={(val) => setNewReview({...newReview, workload: val})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Workload" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Light', 'Moderate', 'Heavy', 'Very Heavy'].map(workload => (
                            <SelectItem key={workload} value={workload}>
                              {workload}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="review" className="text-sm font-medium">Your Review*</label>
                    <Textarea 
                      id="review" 
                      placeholder="Share your experience with this course and instructor..." 
                      rows={4}
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" onClick={handleNewReviewSubmit}>Submit Review</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {filteredReviews.length === 0 && (
            <Card className="shadow-sm">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No reviews found. Try adjusting your filters or add the first review!</p>
              </CardContent>
            </Card>
          )}
          
          {filteredReviews.map((review) => (
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 ${review.userLiked ? "text-primary" : ""}`}
                        onClick={() => handleLike(review.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-xs">{review.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 ${review.userDisliked ? "text-primary" : ""}`}
                        onClick={() => handleDislike(review.id)}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <span className="text-xs">{review.dislikes}</span>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleComment(review.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <span className="text-xs">{review.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredReviews.length > 0 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={handleLoadMore}>Load More Reviews</Button>
            </div>
          )}
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

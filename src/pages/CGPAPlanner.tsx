
import React from 'react';
import CGPACalculator from '@/components/cgpa/CGPACalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CGPAPlanner = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">CGPA Planner</h1>
        <p className="text-muted-foreground">Calculate, track, and improve your CGPA</p>
      </div>

      <Tabs defaultValue="calculator">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="calculator">CGPA Calculator</TabsTrigger>
          <TabsTrigger value="retake">Retake Suggestions</TabsTrigger>
          <TabsTrigger value="projections">CGPA Projections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <CGPACalculator />
        </TabsContent>
        
        <TabsContent value="retake">
          <Card>
            <CardHeader>
              <CardTitle>Retake Recommendations</CardTitle>
              <CardDescription>Courses you might consider retaking to improve your CGPA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Upload your grade sheet or enter your courses in the calculator to get personalized retake suggestions.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>CGPA Projections</CardTitle>
              <CardDescription>See how future grades will affect your overall CGPA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">Calculate your current CGPA first to see projections based on expected future performance.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Pro Tip: Plan Ahead</h3>
              <p className="text-sm text-muted-foreground mt-1">
                To maximize your CGPA, balance difficult courses with easier ones each semester. This helps maintain a manageable workload.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CGPAPlanner;

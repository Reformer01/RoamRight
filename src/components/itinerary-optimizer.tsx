"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  type OptimizeTravelRoutesOutput,
} from "@/ai/flows/optimize-travel-routes";
import { Bot, Sparkles } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { optimizeItineraryAction } from "@/app/actions";

const formSchema = z.object({
  itinerary: z
    .string()
    .min(50, "Please provide a detailed itinerary of at least 50 characters."),
  realTimeConditions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ItineraryOptimizer() {
  const [result, setResult] = useState<OptimizeTravelRoutesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itinerary: "",
      realTimeConditions: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormData) => {
    setResult(null);
    const { data: resultData, error } = await optimizeItineraryAction(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: error,
      });
    } else {
      setResult(resultData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-primary" />
          <span>Optimize Your Trip</span>
        </CardTitle>
        <CardDescription>
          Paste your itinerary and any real-time conditions to get the most
          efficient travel plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="itinerary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Itinerary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Day 1: Arrive at JFK, check into hotel in Manhattan. Day 2: Visit Statue of Liberty in the morning, then Empire State Building..."
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="realTimeConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Real-time Conditions (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Heavy rain expected, subway line 4 is down..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Optimizing..." : "Optimize My Trip"}
            </Button>
          </form>
        </Form>
        {(isSubmitting || result) && <Separator className="my-6" />}
        {isSubmitting && <LoadingResult />}
        {result && <OptimizationResult result={result} />}
      </CardContent>
    </Card>
  );
}

function LoadingResult() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Bot /> <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-64" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    </div>
  );
}

function OptimizationResult({ result }: { result: OptimizeTravelRoutesOutput }) {
  return (
    <div className="space-y-6">
      <Card className="bg-primary/10 border-primary/50">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-primary">
            <Bot /> AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{result.summary}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Optimized Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{result.optimizedItinerary}</p>
        </CardContent>
      </Card>
    </div>
  );
}

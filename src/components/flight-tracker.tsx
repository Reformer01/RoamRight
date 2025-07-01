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
import { useToast } from "@/hooks/use-toast";
import {
  type GetFlightUpdatesOutput,
} from "@/ai/flows/get-flight-updates";
import { Bot, Plane, Send } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { getFlightUpdatesAction } from "@/app/actions";

const formSchema = z.object({
    flightNumber: z.string().min(4, "Please enter a valid flight number (e.g., UA123).").regex(/^[A-Z0-9]{2,3}\d{1,4}$/, "Invalid flight number format."),
});

type FormData = z.infer<typeof formSchema>;

export function FlightTracker() {
  const [result, setResult] = useState<GetFlightUpdatesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormData) => {
    setResult(null);
    const { data: resultData, error } = await getFlightUpdatesAction({
        flightNumber: data.flightNumber.toUpperCase(),
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Flight Tracker Error",
        description: error,
      });
    } else {
      setResult(resultData);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Plane className="text-primary" />
          <span>Flight Tracker</span>
        </CardTitle>
        <CardDescription>
            Enter a flight number to get the latest status update from our AI assistant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="flightNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Flight Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="e.g., BA2490"
                        {...field}
                      />
                       <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isSubmitting}>
                         <Send className="h-4 w-4" />
                       </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {(isSubmitting || result) && <Separator className="my-6" />}
        {isSubmitting && <LoadingResult />}
        {result && <FlightResult result={result} />}
      </CardContent>
    </Card>
  );
}

function LoadingResult() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6 text-primary" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="pl-8 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

function FlightResult({ result }: { result: GetFlightUpdatesOutput }) {
  return (
    <div className="space-y-4">
       <div className="flex items-start gap-3">
            <Bot className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="rounded-lg bg-primary/10 p-3 text-sm">
                <p className="whitespace-pre-wrap leading-relaxed">{result.update}</p>
            </div>
        </div>
    </div>
  );
}

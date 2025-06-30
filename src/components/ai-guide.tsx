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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  type GenerateDestinationDetailsOutput,
} from "@/ai/flows/generate-destination-details";
import { Bot, Sparkles } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { generateDestinationDetailsAction } from "@/app/actions";

const formSchema = z.object({
  query: z
    .string()
    .min(10, "Please ask a more detailed question (at least 10 characters)."),
});

type FormData = z.infer<typeof formSchema>;

export function AIGuide({ destinationName }: { destinationName: string }) {
  const [result, setResult] = useState<GenerateDestinationDetailsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormData) => {
    setResult(null);
    const { data: resultData, error } = await generateDestinationDetailsAction({
        destination: destinationName,
        query: data.query,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "AI Guide Error",
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
          <span>Ask the AI Guide</span>
        </CardTitle>
        <CardDescription>
          Have a question about {destinationName}? Get instant, detailed answers from our AI travel expert.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'What are some hidden gems only locals know about?' or 'Is it easy to use public transport?'"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Thinking..." : "Ask AI Guide"}
            </Button>
          </form>
        </Form>
        {(isSubmitting || result) && <Separator className="my-6" />}
        {isSubmitting && <LoadingResult />}
        {result && <GuideResult result={result} />}
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
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

function GuideResult({ result }: { result: GenerateDestinationDetailsOutput }) {
  return (
    <div className="space-y-4">
       <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <h3 className="font-headline text-lg font-semibold text-primary">AI Guide Response</h3>
        </div>
      <div className="pl-8">
        <p className="whitespace-pre-wrap leading-relaxed">{result.details}</p>
      </div>
    </div>
  );
}

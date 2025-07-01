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
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">AI Guide</CardTitle>
                <CardDescription>
                Ask our AI travel expert about {destinationName}.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'What are some hidden gems only locals know about?'"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
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
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="pl-13 space-y-2">
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
       <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Bot className="h-6 w-6" />
            </div>
            <div className="pt-1">
                <h3 className="font-headline text-lg font-semibold text-primary">AI Guide Response</h3>
                <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{result.details}</p>
            </div>
        </div>
    </div>
  );
}

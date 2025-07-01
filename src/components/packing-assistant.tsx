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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  type GeneratePackingListOutput,
} from "@/ai/flows/generate-packing-list";
import { generatePackingListAction } from "@/app/actions";
import { Suitcase, Sparkles, Bot, Check, Info } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  tripLength: z.coerce.number().min(1, "Trip must be at least 1 day long."),
  activities: z
    .string()
    .min(10, "Please describe your activities (at least 10 characters)."),
});

type FormData = z.infer<typeof formSchema>;

export function PackingAssistant({ destinationName }: { destinationName: string }) {
  const [result, setResult] = useState<GeneratePackingListOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripLength: 7,
      activities: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormData) => {
    setResult(null);
    const { data: resultData, error } = await generatePackingListAction({
        destination: destinationName,
        ...data
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Packing Assistant Error",
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
            <Suitcase className="text-primary" />
            <span>Smart Packing Assistant</span>
        </CardTitle>
        <CardDescription>
        Get a personalized packing list for your trip to {destinationName} based on your plans and the weather.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="tripLength"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Trip Length (days)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="activities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planned Activities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Sightseeing, hiking in the mountains, beach days, and a few nice dinners.'"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                <Sparkles className="mr-2" />
                {isSubmitting ? "Generating List..." : "Generate Packing List"}
            </Button>
          </form>
        </Form>
        
        {isSubmitting && <LoadingResult />}
        {result && <PackingResult result={result} />}
      </CardContent>
    </Card>
  );
}

function LoadingResult() {
  return (
    <div className="mt-6 space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

function PackingResult({ result }: { result: GeneratePackingListOutput }) {
  const defaultOpen = result.packingList.length > 0 ? result.packingList[0].category : "";
  return (
    <div className="mt-6 space-y-6">
        <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Bot className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-headline">Your Personalized Packing List</h3>
        </div>
      <Accordion type="single" collapsible className="w-full space-y-2" defaultValue={defaultOpen}>
        {result.packingList.map((category) => (
          <AccordionItem value={category.category} key={category.category} className="bg-card rounded-xl border">
            <AccordionTrigger className="p-4 font-bold text-left hover:no-underline">
              {category.category}
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
                <ul className="space-y-3">
                    {category.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-muted-foreground">
                            <Checkbox id={`${category.category}-${index}`} />
                            <label htmlFor={`${category.category}-${index}`} className="flex-grow">
                                {item.item}
                            </label>
                            <span className="text-sm font-medium bg-secondary text-secondary-foreground rounded-md px-2 py-0.5">{`x ${item.quantity}`}</span>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {result.notes && (
         <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Helpful Notes</AlertTitle>
            <AlertDescription>
              {result.notes}
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

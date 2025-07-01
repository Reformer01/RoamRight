'use client';

import { useEffect, useState } from 'react';
import {
  Sun,
  Cloud,
  Cloudy,
  CloudRain,
  CloudSun,
  CloudSnow,
  CloudLightning,
  Wind,
  Thermometer,
  type LucideProps,
} from 'lucide-react';
import { getWeatherForecastAction } from '@/app/actions';
import { type GetWeatherForecastOutput } from '@/ai/flows/get-weather-forecast';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Separator } from './ui/separator';

const iconMap: { [key: string]: React.FC<LucideProps> } = {
  Sun,
  Cloud,
  Cloudy,
  CloudRain,
  CloudSun,
  CloudSnow,
  CloudLightning,
  Wind,
  Thermometer,
};

function WeatherIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name] || Thermometer;
  return <Icon {...props} />;
}

export function WeatherForecast({ destinationName }: { destinationName: string }) {
  const [forecast, setForecast] = useState<GetWeatherForecastOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      const { data, error } = await getWeatherForecastAction({ destination: destinationName });
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Weather Forecast Error',
          description: error,
        });
      } else {
        setForecast(data);
      }
      setIsLoading(false);
    };

    fetchWeather();
  }, [destinationName, toast]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!forecast) {
    return null;
  }

  const today = forecast.forecast[0];
  const upcoming = forecast.forecast.slice(1);

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Weather in {destinationName}</CardTitle>
            <CardDescription>
                10-day forecast starting {today.date}.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {/* Today's Forecast */}
            <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:items-start md:justify-between md:text-left p-6 rounded-2xl bg-secondary/50">
                <div className="flex-1">
                    <p className="font-bold text-muted-foreground">{today.day}, {today.date}</p>
                    <p className="text-7xl font-bold text-primary">{today.high}°C</p>
                    <p className="text-xl font-semibold">{today.condition}</p>
                    <p className="text-sm text-muted-foreground">High: {today.high}°C / Low: {today.low}°C</p>
                </div>
                 <WeatherIcon name={today.icon} className="h-32 w-32 text-primary" />
            </div>

            <Separator className="my-6" />

            {/* Upcoming Forecast */}
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
                {upcoming.map((day, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all hover:bg-secondary/50">
                        <p className="font-bold text-sm">{day.day.substring(0, 3)}</p>
                        <WeatherIcon name={day.icon} className="h-8 w-8 text-primary" />
                        <div className="flex items-baseline gap-1">
                            <p className="font-bold text-lg">{day.high}°</p>
                            <p className="text-sm text-muted-foreground">{day.low}°</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
    return (
        <Card>
             <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:items-start md:justify-between md:text-left p-6 rounded-2xl bg-secondary/50">
                     <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-20 w-32" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <Skeleton className="h-32 w-32 rounded-full" />
                </div>
                <Separator className="my-6" />
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 rounded-xl border p-3 text-center">
                            <Skeleton className="h-5 w-10" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Current Weather</CardTitle>
           <CardDescription>
            Weather conditions for {today.day}, {today.date} in {destinationName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-start md:text-left">
          <WeatherIcon name={today.icon} className="h-24 w-24 text-primary" />
          <div className="flex-1">
            <p className="text-6xl font-bold">{today.high}°C</p>
            <p className="text-lg text-muted-foreground">{today.condition}</p>
            <p className="text-sm text-muted-foreground">High: {today.high}°C / Low: {today.low}°C</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">10-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {upcoming.map((day, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                        <p className="font-semibold">{day.day.substring(0, 3)}</p>
                        <WeatherIcon name={day.icon} className="h-8 w-8 text-primary" />
                        <p className="font-semibold">{day.high}°</p>
                        <p className="text-sm text-muted-foreground">{day.low}°</p>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-start md:text-left">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex-1 space-y-2">
                         <Skeleton className="h-16 w-32" />
                         <Skeleton className="h-6 w-40" />
                         <Skeleton className="h-4 w-48" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <Skeleton className="h-8 w-48" />
                </CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                        {Array.from({ length: 9 }).map((_, index) => (
                             <div key={index} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                                <Skeleton className="h-6 w-10" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-6 w-8" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

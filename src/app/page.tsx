import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/constants/landing-page";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  //wIP: setup billing card
  return (
   <main>
      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4">
          <span className="text-orange-600 bg-orange-400/20 px-4 py-2 rounded-full text-sm">
                An AI powered sales assistant chatbot
          </span>
          <Image 
            src={'/images/corinna-ai-logo.png'}
            height={100}
            width={500}
            alt="Logo"
            className="md:max-w-lg max-w-[400px] object-contain"
          />
          <p className="text-center md:max-w-[500px] max-w-[350px]  ">
            Your AI powered sales assistant! Embed Corinna AI into any website
            with just snippet of code!
          </p>
          <Button className="bg-orange-400 font-bold text-white px-4 hover:bg-orange-500">
            Start for Free
          </Button>
          <Image 
            src={'/images/iphonecorinna.png'}
            alt="iphone"
            width={400}
            height={100}
            className="max-w-lg object-contain"

          />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
          <h2 className="text-4xl text-center">Choose what fits you right</h2>
          <p className="text-center md:max-w-lg max-w-[400px] text-muted-foreground">
              Our straightforward pricing plans are tailored to meet your needs. If
              {" you're "} nor ready to commit you can get started for free.
          </p>
      </section>
      <div className="flex justify-center gap-4 flex-wrap mt-6 mb-6">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={cn("w-[300px] flex flex-col justify-between",{
                'border-2 border-primary': card.title === 'Ultimate'
              })}
            >
                <CardHeader>
                  <CardTitle className="text-orange-400">
                    {card.title}
                  </CardTitle>
                  <CardDescription>
                    {pricingCards.find((c) => c.title === card.title)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold" >{card.price}</span>
                  <span className="text-muted-foreground">
                      <span>/ month</span>
                  </span>
                </CardContent>
                <CardFooter className="flex flex-wrap items-start gap-4">
                    <div>
                      {card.features.map((feature) => (
                        <div key={feature} className="flex gap-2">
                            <Check />
                            <p>{feature}</p>
                        </div>
                      ))
                      
                      }
                    </div>
                    <Link 
                      href={`/dashboard?plan=${card.title}`}
                      className="bg-orange-400/40 border-orange-500 border-2 p-2 w-full text-center font-bold rounded-sm"
                    >
                      Get Started
                    </Link>
                </CardFooter>
            </Card>
          ))}
      </div>
   </main>
  );
}

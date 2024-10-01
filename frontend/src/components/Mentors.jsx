import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function MyMentors() {
  return (
    <>
    <section className="p-4 h-max rounded-md w-full max-w-md border border-solid border-[#add8ff]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Mentors</h2>
        <a href="#" className="text-sm">
          See All
        </a>
      </div>
      <div className="space-y-4">
        {[
          {
            name: "Steven Summer",
            time: "02 Minutes Ago",
            amount: "+ $52.00",
            img: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Jordan Maizee",
            time: "02 Minutes Ago",
            amount: "+ $83.00",
            img: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Jessica Alba",
            time: "05 Minutes Ago",
            amount: "+ $61.60",
            img: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Anna Armas",
            time: "05 Minutes Ago",
            amount: "+ $2351.00",
            img: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Angelina Boo",
            time: "10 Minutes Ago",
            amount: "+ $152.00",
            img: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Anastasia Koss",
            time: "10 Minutes Ago",
            amount: "+ $542.00",
            img: "/placeholder.svg?height=40&width=40",
          },
        ].map((sale, index) => (
          <div key={index} className="flex items-center p-2 bg-[white] rounded-2xl shadow-sm">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt={sale.name} />
              <AvatarFallback>{sale.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium">{sale.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <div className="h-48 border border-solid mt-4 rounded-lg border-[#add8ff] w-full p-4">
        <div className="text-xl font-semibold mb-2" >Virtual Practice Interview</div>
        <div>Boost your confidence and ace your next job interview with Virtual Practice Interview—your personal, real-time interview simulator!</div>
        <Link to="http://127.0.0.1:5002" >
          <Button className="bg-[#0d1a42] mt-3" >Step Up Your Interview Game!</Button>
        </Link>
    </div>
    </>
  )
}
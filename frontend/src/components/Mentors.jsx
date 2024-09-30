import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function MyMentors() {
  return (
    <section className="p-4 h-[95vh] rounded-md w-full max-w-md border border-solid border-[#e5e5e5]">
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
          <div key={index} className="flex items-center p-2 bg-[#f8f7f1] rounded-2xl shadow-sm">
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
  )
}
import { CircleUser } from "lucide-react"

function Review() {
  return (
    <article>
        <div className="py-3 flex gap-2 items-center">
            <div>
            <CircleUser size={40}/>
            </div>
            <p>Patricia Kanini</p>
          </div>
          <div className="flex items-center gap-2">
          <div>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} style={{ color: 'gold', fontSize: '22px' }}>
            ★
          </span>
        ))}
      </div>
      <span>March 2024</span>
          </div>
          <p>We had a very good time at Pauls place. We loved the staff and the house, it is a house full of character and it&apos;s quiet even though it&apos;s in a busy area.</p>
    </article>
  )
}

export default Review
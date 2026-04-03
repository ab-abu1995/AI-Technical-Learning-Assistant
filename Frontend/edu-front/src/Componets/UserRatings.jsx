
import "../Css/UserRatings.css";

const ratingsData = [
  {
    id: 1,
    name: "Abiy T.",
    avatar: "AB",
    stars: 5,
    review:
      "The AI assistant helped me understand complex topics offline. Truly amazing!",
  },
  {
    id: 2,
    name: "Melat L.",
    avatar: "ML",
    stars: 4,
    review:
      "The platform is easy to use, and the quizzes really help me practice and learn faster.",
  },
  {
    id: 3,
    name: "Ezra Z.",
    avatar: "EZ",
    stars: 5,
    review:
      "I love the offline feature! I can study anywhere without worrying about internet.",
  },
];

function UserRatings() {
  return (
    <section className="ratings-section">
      <div className="ratings-title">
        <h2>
          User <span>Ratings</span>
        </h2>
        <p>What students say about our AI-powered learning platform</p>
      </div>

      <div className="ratings-grid">
        {ratingsData.map((rating) => (
          <div key={rating.id} className="rating-card">
            <div className="user-avatar">{rating.avatar}</div>
            <h3>{rating.name}</h3>
            <div className="stars">
              {"★".repeat(rating.stars) + "☆".repeat(5 - rating.stars)}
            </div>
            <p>{rating.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserRatings;
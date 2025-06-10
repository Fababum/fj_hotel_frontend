import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.css'

const slides = [
  { id: 1, label: 'Slide 1' },
  { id: 2, label: 'Slide 2' },
  { id: 3, label: 'Slide 3' }
]

export default function Homepage() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handleBookNow = () => {
    navigate('/room-booking')
  }

  // Erweiterung: Zusatzinfos, Features, Call-to-Action
  return (
    <div className="homepage-container">
      <h1>FJ Hotel</h1>
      <p className="homepage-intro">
        Willkommen im FJ Hotel! Entdecken Sie Komfort, Stil und erstklassigen Service im Herzen der Stadt.
      </p>
      <div className="slideshow">
        <button className="arrow left" onClick={prevSlide}>&lt;</button>
        <div className="slide-placeholder">{slides[current].label}</div>
        <button className="arrow right" onClick={nextSlide}>&gt;</button>
      </div>
      <section className="homepage-features">
        <h2>Unsere Highlights</h2>
        <ul>
          <li>✔️ Moderne Zimmer & Suiten</li>
          <li>✔️ Meeting- & Konferenzräume</li>
          <li>✔️ Wellness & Fitnessbereich</li>
          <li>✔️ Zentrale Lage & Parkmöglichkeiten</li>
        </ul>
      </section>
      <section className="homepage-cta">
        <h3>Jetzt Zimmer sichern und den Aufenthalt genießen!</h3>
        <button className="book-now-btn" onClick={handleBookNow}>Jetzt buchen</button>
      </section>
    </div>
  )
}
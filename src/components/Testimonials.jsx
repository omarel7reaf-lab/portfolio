import { testimonials } from '../data/portfolioData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">What People Say</span>
          <h2 className="section__title">Testimonials</h2>
          <p className="section__subtitle">
            Feedback from colleagues and clients I've worked with.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="card testimonial-card fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="testimonial-card__quote">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
              </div>

              <p className="testimonial-card__text">
                "{testimonial.comment}"
              </p>

              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {testimonial.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="testimonial-card__name">{testimonial.name}</div>
                  <div className="testimonial-card__role">
                    {testimonial.position} @ {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

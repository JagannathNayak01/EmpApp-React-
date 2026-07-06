import React from "react";
import Appbar from "./Appbar";
import Footer from "./Footer";
import "../About.css";

export default function About() {
  return (
    <>
      <div>
        <Appbar />
        <section className="team-section pt-1">
          <div>
            <h3 data-aos="fade-up">Meet Our Team</h3>
          </div>
          <div className="team-row">
            {/* <!-- Jagannath --> */}
            <div className="team-card" data-aos="zoom-in">
              <div className="card-inner">
                <div className="card-front">
                  <img src="Jaga1.jpg" alt="Jagannath Nayak" />
                  <h4>Jagannath Nayak</h4>
                  <p>Backend & Database Lead</p>
                </div>
                <div className="card-back">
                  <p>Co-operative & Positive</p>
                  <h4>Skills</h4>
                  <p>Spring-Boot, Java, SQL</p>
                  <h4>Contact</h4>
                  <p>jagannath@gmail.com</p>
                  <div className="social-icons">
                    <a
                      href="https://www.instagram.com/jagannath_01_?igsh=MWN2bzk2ZW5iZThieQ=="
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://x.com/Jagannathnayak0?t=ZQ8oDbug0XVbrNI8dvwohQ&s=09"
                      target="_blank"
                    >
                      <i className="fab fa-x-twitter"></i>
                    </a>
                    <a
                      href="www.linkedin.com/in/jagannath-nayak-36a499311"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Samikshya --> */}
            <div className="team-card" data-aos="zoom-in">
              <div className="card-inner">
                <div className="card-front">
                  <img src="Samik.jpg" alt="Samikshya Das" />
                  <h4>Samikshya Das</h4>
                  <p>Frontend & UI/UX</p>
                </div>
                <div className="card-back">
                  <h4>Skills</h4>
                  <p>HTML, Tailwind, UX Design</p>
                  <h4>Contact</h4>
                  <p>samikshya@gmail.com</p>
                  <div className="social-icons">
                    <a
                      href="https://www.instagram.com/ssssamikshya?igsh=MTV1ZGFqbjdhMGY5Yw=="
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://x.com/SamikshyaDas11?t=AHPqXViA7h3anmLmEUnFwg&s=09"
                      target="_blank"
                    >
                      <i className="fab fa-x-twitter"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/samikshya-das-52b750267"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Suhana --> */}
            <div className="team-card" data-aos="zoom-in">
              <div className="card-inner">
                <div className="card-front">
                  <img src="suhana.jpg" alt="Suhana Parween" />
                  <h4>Suhana Parween</h4>
                  <p>Testing, Debugging & Documentation</p>
                </div>
                <div className="card-back">
                  <h4>Skills</h4>
                  <p>Jest, Cypress, DevTools</p>
                  <h4>Contact</h4>
                  <p>suhana@gmail.com</p>
                  <div className="social-icons">
                    <a
                      href="https://www.instagram.com/_suha._29?igsh=bG96NDF2ZjE0NWc4"
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                      <i className="fab fa-x-twitter"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/suhana-parween"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="crud-project-wrapper">
          <div className="crud-image" data-aos="fade-right">
            <img src="./images.jpg" alt="Spring Boot Project" />
          </div>
          <div className="project-card" data-aos="fade-left">
            <h5>💼 Spring Boot CRUD App</h5>
            <p>
              A full-stack web application built using{" "}
              <strong>Spring Boot</strong> that performs
              <strong>Create, Read, Update, and Delete (CRUD)</strong>{" "}
              operations on user data stored in a relational database (
              <strong>MySQL/PostgreSQL</strong>).
              <br />
              <br />
              The project follows <strong>RESTful architecture</strong> and
              demonstrates clean code practices, layered architecture, and
              integration with front-end technologies or API testing tools like{" "}
              <strong>Postman</strong>.
            </p>
            <span className="tag">#Java #SpringBoot #SQL</span>
          </div>
        </div>
        {/* <!-- Map --> */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.6627441759956!2d85.81352597508629!3d20.35554658113059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19091813dab8d5%3A0xa033051ccddbbcbc!2sKalinga%20Institute%20of%20Industrial%20Technology!5e0!3m2!1sen!2sus!4v1744310656185!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
}
